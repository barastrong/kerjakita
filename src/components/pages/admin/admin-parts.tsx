import type { ButtonHTMLAttributes, ReactNode } from "react";
import dashboard from "../recruiter/dashboard/dashboard.module.css";
import styles from "./admin.module.css";

type ChipTone = "neutral" | "ok" | "warn" | "bad";

const CHIP_TONE: Record<ChipTone, string> = {
  neutral: styles.chipNeutral,
  ok: styles.chipOk,
  warn: styles.chipWarn,
  bad: styles.chipBad,
};

export function Chip({
  tone = "neutral",
  children,
}: {
  tone?: ChipTone;
  children: ReactNode;
}) {
  return (
    <span className={`${styles.chip} ${CHIP_TONE[tone]}`}>{children}</span>
  );
}

export function DemoTag() {
  return <span className={`${styles.chip} ${styles.chipDemo}`}>Contoh data</span>;
}

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className={dashboard.stats}>{children}</div>;
}

export function Stat({
  value,
  label,
  note,
}: {
  value: ReactNode;
  label: string;
  note: string;
}) {
  return (
    <div className={dashboard.statCard}>
      <p className={dashboard.statValue}>{value}</p>
      <p className={dashboard.statLabel}>{label}</p>
      <p className={dashboard.statNote}>{note}</p>
    </div>
  );
}

export function Panel({
  title,
  note,
  action,
  children,
}: {
  title: string;
  note?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={`${dashboard.card} ${styles.panel}`}>
      <div className={styles.panelHead}>
        <div>
          <h2 className={dashboard.cardTitle}>{title}</h2>
          {note ? <p className={dashboard.cardSub}>{note}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function DataTable({
  caption,
  head,
  children,
}: {
  caption: string;
  head: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.tableCard}>
      <table className={styles.table}>
        <caption className={styles.srOnly}>{caption}</caption>
        <thead>
          <tr>{head}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function ActionButton({
  tone = "default",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "default" | "primary" | "danger";
}) {
  const toneClass =
    tone === "primary"
      ? styles.actionPrimary
      : tone === "danger"
        ? styles.actionDanger
        : "";

  return (
    <button
      {...props}
      type={props.type ?? "submit"}
      className={`${styles.action} ${toneClass} ${className ?? ""}`.trim()}
    />
  );
}

export function BarList({
  items,
}: {
  items: { label: string; value: number }[];
}) {
  const max = Math.max(1, ...items.map((item) => item.value));

  return (
    <ul className={styles.bars}>
      {items.map((item) => (
        <li key={item.label} className={styles.barRow}>
          <span className={styles.barLabel}>{item.label}</span>
          <span className={styles.barTrack} aria-hidden="true">
            <span
              className={styles.barFill}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </span>
          <span className={styles.barValue}>{item.value}</span>
        </li>
      ))}
    </ul>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className={styles.empty}>
      <p className={styles.emptyTitle}>{title}</p>
      <p className={styles.emptyBody}>{body}</p>
      {action}
    </div>
  );
}
