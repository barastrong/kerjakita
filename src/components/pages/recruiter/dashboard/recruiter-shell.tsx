import type { ReactNode } from "react";
import {
  DashboardShell,
  type DashboardNavGroup,
} from "./dashboard-shell";
import styles from "./dashboard.module.css";

const NAV_GROUPS: DashboardNavGroup[] = [
  {
    label: "Rekrutmen",
    ariaLabel: "Rekrutmen",
    items: [
      { label: "Ringkasan", href: "/perekrut/ringkasan", icon: "ringkasan-muted.svg" },
      {
        label: "Lowongan",
        href: "/perekrut/lowongan",
        icon: "lowongan.svg",
        count: 6,
        activeWhen: ["/perekrut/pasang-lowongan"],
      },
      { label: "Pelamar", href: "/perekrut/pelamar", icon: "pelamar.svg", count: 12 },
      { label: "Wawancara", href: "/perekrut/wawancara", icon: "wawancara.svg", count: 5 },
    ],
  },
  {
    label: "Perusahaan",
    ariaLabel: "Perusahaan",
    items: [
      { label: "Profil perusahaan", href: "/perekrut/profil-perusahaan", icon: "profil.svg" },
      { label: "Tim", href: "/perekrut/tim", icon: "tim.svg" },
    ],
  },
];

export function RecruiterShell({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      brandHref="/perekrut/ringkasan"
      sidebarLabel="Navigasi dashboard perekrut"
      topCard={{ initials: "TL", name: "Tokoloka", role: "Portal perekrut" }}
      navGroups={NAV_GROUPS}
      footer={
        <div className={styles.planCard}>
          <p className={styles.planTitle}>Paket Pro</p>
          <div className={styles.planTrack} aria-hidden="true">
            <div className={styles.planFill} />
          </div>
          <p className={styles.planNote}>6 dari 10 lowongan aktif terpakai</p>
        </div>
      }
    >
      {children}
    </DashboardShell>
  );
}
