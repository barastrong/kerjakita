import Link from "next/link";
import { notFound } from "next/navigation";
import { applicationSteps, getApplication } from "@/lib/data/apply";
import { ApplyChecklist } from "./apply-checklist";
import { ApplyForm } from "./apply-form";
import { ApplyJobSummary } from "./apply-job-summary";
import { ApplyMatch } from "./apply-match";
import { ApplyStepper } from "./apply-stepper";
import styles from "./apply-page.module.css";

type ApplyPageProps = {
  slug: string;
};

export function ApplyPage({ slug }: ApplyPageProps) {
  const job = getApplication(slug);

  if (!job) notFound();

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Jejak navigasi">
        <Link href="/lowongan">Lowongan</Link>
        <span aria-hidden="true">›</span>
        <span>{job.title}, {job.company}</span>
        <span aria-hidden="true">›</span>
        <span>Lamar</span>
      </nav>

      <div className={styles.stepperWrap}>
        <ApplyStepper steps={applicationSteps} />
      </div>

      <main className={styles.content}>
        <ApplyForm job={job} />
        <aside className={styles.sidebar}>
          <ApplyJobSummary job={job} />
          <ApplyMatch job={job} />
          <ApplyChecklist job={job} />
        </aside>
      </main>
    </div>
  );
}
