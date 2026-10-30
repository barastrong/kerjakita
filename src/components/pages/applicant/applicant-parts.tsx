import type { CSSProperties, ReactNode } from "react";
import { BellIcon } from "@/components/ui/icons/icons";
import { PageHeading } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import type { ApplicationTone } from "./lamaran-data";
import styles from "./applicant.module.css";

export function ApplicantHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <PageHeading
      title={title}
      subtitle={subtitle}
      action={
        <div className={styles.headerActions}>
          {action}
          <button
            type="button"
            className={styles.bellButton}
            aria-label="Notifikasi"
          >
            <BellIcon size={20} />
            <span className={styles.bellDot} aria-hidden="true" />
          </button>
        </div>
      }
    />
  );
}

export function ApplicationStatus({
  status,
  tone,
}: {
  status: string;
  tone: ApplicationTone;
}) {
  const toneClass =
    tone === "mint"
      ? styles.statusBadgeMint
      : tone === "yellow"
        ? styles.statusBadgeYellow
        : styles.statusBadgeMuted;

  return (
    <span className={`${styles.statusBadge} ${toneClass}`}>{status}</span>
  );
}

export function CompanyMark({
  initials,
  color,
  size = "md",
}: {
  initials: string;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={`${styles.companyMark} ${
        size === "sm"
          ? styles.companyMarkSm
          : size === "lg"
            ? styles.companyMarkLg
            : ""
      }`}
      style={{ "--mark-color": color } as CSSProperties}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function ProfileProgress({ percent = 82 }: { percent?: number }) {
  return (
    <div className={styles.progressCard}>
      <p className={styles.progressTitle}>Profil {percent}% lengkap</p>
      <div className={styles.progressTrack}>
        <span
          className={styles.progressFill}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className={styles.progressNote}>
        Tambahkan sertifikat untuk naik ke 90%.
      </p>
    </div>
  );
}
