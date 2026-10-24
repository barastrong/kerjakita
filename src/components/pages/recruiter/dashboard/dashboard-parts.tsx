import type { CSSProperties, ReactNode } from "react";
import styles from "./dashboard.module.css";

export function PageHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageSubtitle}>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function Avatar({
  initials,
  color,
  size = "md",
}: {
  initials: string;
  color: string;
  size?: "md" | "sm";
}) {
  return (
    <span
      className={`${styles.avatar} ${size === "sm" ? styles.avatarSm : ""}`}
      style={{ "--avatar-color": color } as CSSProperties}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
