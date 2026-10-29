import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import styles from "./dashboard.module.css";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label} className={styles.breadcrumbItem}>
          {index > 0 ? (
            <span className={styles.breadcrumbSep} aria-hidden="true">
              ›
            </span>
          ) : null}
          {item.href ? (
            <Link href={item.href} className={styles.breadcrumbLink}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.breadcrumbCurrent}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

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
  size?: "md" | "sm" | "lg";
}) {
  return (
    <span
      className={`${styles.avatar} ${
        size === "sm" ? styles.avatarSm : size === "lg" ? styles.avatarLg : ""
      }`}
      style={{ "--avatar-color": color } as CSSProperties}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
