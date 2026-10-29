"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon } from "@/components/ui/icons/icons";
import {
  applicationSteps,
  type ApplicationJob,
  type ApplicationStep,
} from "@/lib/data/apply";
import { ApplyChecklist } from "./apply-checklist";
import { ApplyJobSummary } from "./apply-job-summary";
import { ApplyMatch } from "./apply-match";
import { ApplyStepper } from "./apply-stepper";
import { INITIAL_DRAFT, type Draft } from "./apply-form-data";
import { APPLY_STEP_PATHS, applyStepHref } from "./apply-routes";
import styles from "./apply-page.module.css";

type ApplyContextValue = {
  job: ApplicationJob;
  step: number;
  draft: Draft;
  update: (key: keyof Draft, value: string) => void;
  cv: string;
  setCv: (value: string) => void;
  agreed: boolean;
  setAgreed: (value: boolean) => void;
  submit: () => void;
  goNext: () => void;
  goBack: () => void;
  goToStep: (step: number) => void;
};

const ApplyContext = createContext<ApplyContextValue | null>(null);

export function useApply() {
  const value = useContext(ApplyContext);

  if (!value) {
    throw new Error("useApply must be used within ApplyLayout");
  }

  return value;
}

export function ApplyLayout({
  job,
  children,
}: {
  job: ApplicationJob;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const basePath = `/lamar/${job.slug}`;
  const step = Math.max(
    0,
    APPLY_STEP_PATHS.findIndex((path) => pathname === `${basePath}${path}`),
  );
  const [draft, setDraft] = useState<Draft>(INITIAL_DRAFT);
  const [cv, setCv] = useState(job.documents[0]?.id ?? "");
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [maxStep, setMaxStep] = useState(step);

  const steps = applicationSteps.map((item, index) => ({
    label: item.label,
    status: (submitted || index < step
      ? "done"
      : index === step
        ? "current"
        : "todo") as ApplicationStep["status"],
  }));

  const checklist = job.checklist.map((item, index) => ({
    ...item,
    done: submitted || maxStep >= 3 ? true : maxStep >= 1 && index < 3,
  }));

  function update(key: keyof Draft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function goNext() {
    const next = Math.min(step + 1, 3);
    setMaxStep((current) => Math.max(current, next));
    router.push(applyStepHref(job.slug, next));
  }

  function goBack() {
    router.push(applyStepHref(job.slug, Math.max(0, step - 1)));
  }

  function goToStep(target: number) {
    setMaxStep((current) => Math.max(current, target));
    router.push(applyStepHref(job.slug, target));
  }

  return (
    <ApplyContext.Provider
      value={{
        job,
        step,
        draft,
        update,
        cv,
        setCv,
        agreed,
        setAgreed,
        submit: () => setSubmitted(true),
        goNext,
        goBack,
        goToStep,
      }}
    >
      <div className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Jejak navigasi">
          <Link href="/lowongan">Lowongan</Link>
          <span aria-hidden="true">›</span>
          <span>
            {job.title}, {job.company}
          </span>
          <span aria-hidden="true">›</span>
          <span>Lamar</span>
        </nav>

        <div className={styles.stepperWrap}>
          <ApplyStepper steps={steps} />
        </div>

        <main className={styles.content}>
          <Card className={styles.form}>
            {submitted ? (
              <div className={styles.success}>
                <span className={styles.successIcon} aria-hidden="true">
                  <CheckIcon size={28} />
                </span>
                <h1 className={styles.title}>Lamaran terkirim</h1>
                <p className={styles.subtitle}>
                  Lamaranmu untuk {job.title} sudah dikirim ke {job.company}.
                  Pantau statusnya di halaman Lamaran saya.
                </p>
                <div className={styles.successActions}>
                  <ButtonLink href="/pelamar/lamaran">
                    Lihat lamaran saya
                  </ButtonLink>
                  <ButtonLink href="/lowongan" variant="outline">
                    Cari lowongan lain
                  </ButtonLink>
                </div>
              </div>
            ) : (
              children
            )}
          </Card>

          <aside className={styles.sidebar}>
            <ApplyJobSummary job={job} />
            <ApplyMatch job={job} />
            <ApplyChecklist job={{ ...job, checklist }} />
          </aside>
        </main>
      </div>
    </ApplyContext.Provider>
  );
}
