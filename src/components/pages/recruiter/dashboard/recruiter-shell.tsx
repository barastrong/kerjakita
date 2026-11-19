import type { ReactNode } from "react";
import type { RecruiterRole } from "@/lib/data/team";
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

const ADMIN_ONLY_PAGES = ["/perekrut/profil-perusahaan", "/perekrut/tim"];

export function RecruiterShell({
  role,
  memberName,
  companyName,
  companyInitials,
  children,
}: {
  role: RecruiterRole;
  memberName: string;
  companyName: string;
  companyInitials: string;
  children: ReactNode;
}) {
  const navGroups =
    role === "Admin"
      ? NAV_GROUPS
      : NAV_GROUPS.map((group) => ({
          ...group,
          items: group.items.filter(
            (item) => !ADMIN_ONLY_PAGES.includes(item.href),
          ),
        })).filter((group) => group.items.length > 0);

  return (
    <DashboardShell
      brandHref="/perekrut/ringkasan"
      sidebarLabel="Navigasi dashboard perekrut"
      logoutSession="company"
      topCard={{
        initials: companyInitials,
        name: companyName,
        role: `Portal perekrut · ${role}`,
      }}
      navGroups={navGroups}
      footer={
        <>
          <div className={styles.roleCard}>
            <span className={styles.roleLabel}>Masuk sebagai</span>
            <span className={styles.roleValue}>{memberName}</span>
            <p className={styles.roleNote}>
              Peran: {role}. Diatur Admin di halaman Tim, tidak bisa diubah
              sendiri.
            </p>
          </div>
          <div className={styles.planCard}>
            <p className={styles.planTitle}>Paket Pro</p>
            <div className={styles.planTrack} aria-hidden="true">
              <div className={styles.planFill} />
            </div>
            <p className={styles.planNote}>6 dari 10 lowongan aktif terpakai</p>
          </div>
        </>
      }
    >
      {children}
    </DashboardShell>
  );
}
