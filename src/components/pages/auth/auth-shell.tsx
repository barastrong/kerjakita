import type { ReactNode } from "react";
import Link from "next/link";
import {
  CheckIcon,
  ChevronLeftIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons/icons";
import styles from "./auth-page.module.css";

type AuthShellProps = {
  title: ReactNode;
  description: string;
  extra: ReactNode;
  children: ReactNode;
};

export function AuthShell({
  title,
  description,
  extra,
  children,
}: AuthShellProps) {
  return (
    <main className={styles.screen}>
      <section className={styles.brand}>
        <Link href="/" className={styles.logo} aria-label="Kerjakita — beranda">
          <span className={styles.logoMark} aria-hidden="true" />
          <span className={styles.logoText}>kerjakita</span>
        </Link>

        <div className={styles.brandMessage}>
          <p className={styles.brandTitle}>{title}</p>
          <p className={styles.brandDescription}>{description}</p>
        </div>

        {extra}
      </section>

      <section className={styles.formPanel}>
        <div className={styles.topBar}>
          <Link href="/" className={styles.backLink}>
            <ChevronLeftIcon size={16} />
            Kembali ke beranda
          </Link>
        </div>
        <div className={styles.formArea}>{children}</div>
      </section>
    </main>
  );
}

export function MatchCard() {
  return (
    <div className={styles.matchCard}>
      <div className={styles.matchTop}>
        <span className={styles.matchLogo} aria-hidden="true">
          TL
        </span>
        <span className={styles.matchJob}>
          <span className={styles.matchTitle}>Senior Product Designer</span>
          <span className={styles.matchMeta}>Tokoloka · Jakarta Selatan</span>
        </span>
        <span className={styles.matchScore}>92%</span>
      </div>
      <div className={styles.matchBar}>
        <span>Figma</span>
        <span className={styles.matchTrack}>
          <span className={styles.matchFill} style={{ width: "100%" }} />
        </span>
        <strong>Ahli</strong>
      </div>
      <div className={styles.matchBar}>
        <span>Design system</span>
        <span className={styles.matchTrack}>
          <span className={styles.matchFill} style={{ width: "90%" }} />
        </span>
        <strong>Kuat</strong>
      </div>
    </div>
  );
}

export function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className={styles.benefits}>
      {items.map((item) => (
        <li key={item} className={styles.benefit}>
          <span className={styles.benefitIcon} aria-hidden="true">
            <CheckIcon size={13} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function SecurityNote({ children }: { children: ReactNode }) {
  return (
    <div className={styles.note}>
      <p className={styles.noteTitle}>
        <ShieldCheckIcon size={18} />
        Aman dan terenkripsi
      </p>
      <p className={styles.noteBody}>{children}</p>
    </div>
  );
}
