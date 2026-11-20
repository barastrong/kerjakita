import type { ReactNode } from "react";
import Link from "next/link";
import { CheckIcon, ChevronLeftIcon } from "@/components/ui/icons/icons";
import styles from "./company-flow.module.css";

const STEPS = ["Data perusahaan", "Dokumen", "Verifikasi"] as const;

type StepState = "done" | "active" | "todo";

function stepState(number: number, step: number, complete: boolean): StepState {
  if (complete || number < step) return "done";
  return number === step ? "active" : "todo";
}

export function CompanyFlowShell({
  step,
  complete = false,
  aside,
  narrow = false,
  children,
}: {
  step: 1 | 2 | 3;
  complete?: boolean;
  aside?: ReactNode;
  narrow?: boolean;
  children: ReactNode;
}) {
  return (
    <main className={styles.screen}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.logo} aria-label="Kerjakita — beranda">
          <span className={styles.logoMark} aria-hidden="true" />
          <span className={styles.logoText}>kerjakita</span>
        </Link>
        <ol className={styles.stepper} aria-label="Langkah pendaftaran">
          {STEPS.map((label, index) => {
            const number = index + 1;
            const state = stepState(number, step, complete);
            return (
              <li
                key={label}
                className={styles.step}
                data-state={state}
                aria-current={state === "active" ? "step" : undefined}
              >
                <span className={styles.stepDot} aria-hidden="true">
                  {state === "done" ? <CheckIcon size={13} /> : number}
                </span>
                <span className={styles.stepLabel}>{label}</span>
                {number < STEPS.length ? (
                  <span
                    className={styles.stepLine}
                    data-state={
                      complete || number < step ? "done" : "todo"
                    }
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
        <Link href="/" className={styles.back}>
          <ChevronLeftIcon size={16} />
          <span className={styles.backText}>Kembali ke dashboard</span>
        </Link>
      </header>
      <div className={`${styles.body} ${narrow ? styles.bodyNarrow : ""}`}>
        <div className={styles.main}>{children}</div>
        {aside ? <aside className={styles.aside}>{aside}</aside> : null}
      </div>
    </main>
  );
}

export function FlowHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={styles.head}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{description}</p>
    </div>
  );
}

export function SideCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.sideCard}>
      <h2 className={styles.sideTitle}>{title}</h2>
      {children}
    </section>
  );
}

export function CheckList({
  items,
  icon = "check",
}: {
  items: string[];
  icon?: "check" | "file";
}) {
  return (
    <ul className={styles.sideList}>
      {items.map((item) => (
        <li key={item} className={styles.sideItem}>
          <span
            className={icon === "file" ? styles.sideDoc : styles.sideCheck}
            aria-hidden="true"
          >
            {icon === "file" ? <DocIcon /> : <CheckIcon size={11} />}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function DocIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 1.5h5l3 3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M9 1.5v3.5h3.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function ClockIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M18 10v8l5 3"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AlertIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 5 33 31H3L18 5Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M18 14v7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="18" cy="26" r="1.6" fill="currentColor" />
    </svg>
  );
}
