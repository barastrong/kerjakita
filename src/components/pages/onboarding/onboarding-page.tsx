"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";
import { Card } from "@/components/ui/card";
import { CheckIcon } from "@/components/ui/icons/icons";
import { ONBOARDED_COOKIE } from "@/lib/data/session";
import styles from "./onboarding-page.module.css";

const ROLES = [
  "Product Designer",
  "UX Designer",
  "UI/UX Designer",
  "UX Researcher",
  "Design System Lead",
];

const WORK_STYLES = [
  "Kerja di lokasi",
  "Kerja di lokasi / rumah",
  "Kerja Remote/dari rumah",
];

const EXPERIENCES = [
  "Fresh Graduate",
  "1–3 tahun",
  "3–5 tahun",
  "5–10 tahun",
  "Lebih dari 10 tahun",
];

const STEPS = [
  {
    label: "Peran",
    title: "Peran yang kamu cari",
    description:
      "Kami pakai ini untuk menyusun rekomendasi lowongan di beranda dan halaman cari.",
    options: ROLES,
  },
  {
    label: "Cara kerja",
    title: "Cara kerja yang kamu mau",
    description: "Pilih satu. Kamu tetap bisa mengubahnya kapan saja di filter.",
    options: WORK_STYLES,
  },
  {
    label: "Pengalaman",
    title: "Pengalaman kerja",
    description: "Supaya kami tidak menampilkan lowongan yang terlalu jauh di atas levelmu.",
    options: EXPERIENCES,
  },
];

export function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);

  const current = answers[step];
  const { title, description, options } = STEPS[step];

  function choose(value: string) {
    setAnswers((values) =>
      values.map((answer, index) => (index === step ? value : answer)),
    );
  }

  function goTo(index: number) {
    if (index > maxStep) return;
    setStep(index);
  }

  function finish() {
    document.cookie = `${ONBOARDED_COOKIE}=1; path=/; max-age=31536000; samesite=lax`;
    router.push("/pelamar/ringkasan");
    router.refresh();
  }

  function next() {
    if (step < STEPS.length - 1) {
      const target = step + 1;
      setStep(target);
      setMaxStep((value) => Math.max(value, target));
    } else {
      finish();
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Selamat datang di Kerjakita</p>
          <h1 className={styles.title}>Kenalan dulu, yuk</h1>
          <p className={styles.subtitle}>
            Tiga langkah singkat supaya lowongan yang muncul lebih relevan.
          </p>
        </div>
      </section>

      <main className={styles.content}>
        <Card className={styles.card}>
          <aside className={styles.rail} aria-label="Langkah onboarding">
            <p className={styles.railLabel}>Langkah</p>
            <ol className={styles.railList}>
              {STEPS.map((item, index) => {
                const done = index < step;
                const active = index === step;

                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      className={`${styles.railItem} ${active ? styles.railItemActive : ""} ${done ? styles.railItemDone : ""}`}
                      aria-current={active ? "step" : undefined}
                      disabled={index > maxStep}
                      onClick={() => goTo(index)}
                    >
                      <span className={styles.railNumber} aria-hidden="true">
                        {done ? <CheckIcon size={12} /> : index + 1}
                      </span>
                      <span className={styles.railText}>
                        <span className={styles.railTitle}>{item.label}</span>
                        <span className={styles.railMeta}>
                          {done ? "Selesai" : active ? "Sedang diisi" : "Belum diisi"}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className={styles.railHint}>
              Jawaban dipakai untuk menyusun rekomendasi. Kamu bisa ubah nanti di
              pengaturan.
            </p>
          </aside>

          <div className={styles.body}>
            <div className={styles.progress}>
              <span className={styles.progressBars} aria-hidden="true">
                {STEPS.map((item, index) => (
                  <span
                    key={item.label}
                    className={index <= step ? styles.progressFill : ""}
                  />
                ))}
              </span>
              <span className={styles.progressText}>
                Langkah {step + 1} dari {STEPS.length}
              </span>
            </div>

            <h2 className={styles.stepTitle}>{title}</h2>
            <p className={styles.stepDescription}>{description}</p>

            <div className={styles.options}>
              {options.map((option) => {
                const active = current === option;

                return (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.option} ${active ? styles.optionActive : ""}`}
                    aria-pressed={active}
                    onClick={() => choose(option)}
                  >
                    <span className={styles.optionCheck} aria-hidden="true">
                      {active && <CheckIcon size={12} />}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            <div className={styles.actions}>
              <div className={styles.actionsLeft}>
                {step > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => setStep(step - 1)}
                  >
                    Kembali
                  </Button>
                )}
                <button type="button" className={styles.skip} onClick={finish}>
                  Lewati
                </button>
              </div>
              <Button type="button" disabled={!current} onClick={next}>
                {step === STEPS.length - 1 ? "Selesai" : "Lanjut"}
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
