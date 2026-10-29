import type { ReactNode } from "react";
import {
  DashboardShell,
  type DashboardNavGroup,
} from "@/components/pages/recruiter/dashboard/dashboard-shell";
import { ProfileProgress } from "./applicant-parts";

const NAV_GROUPS: DashboardNavGroup[] = [
  {
    label: "Menu",
    ariaLabel: "Menu pelamar",
    items: [
      {
        label: "Ringkasan",
        href: "/pelamar/ringkasan",
        icon: "ringkasan-muted.svg",
      },
      {
        label: "Lamaran saya",
        href: "/pelamar/lamaran",
        icon: "lamaran.svg",
        count: 4,
      },
      {
        label: "Tersimpan",
        href: "/pelamar/tersimpan",
        icon: "tersimpan.svg",
        count: 12,
      },
      {
        label: "Wawancara",
        href: "/pelamar/wawancara",
        icon: "wawancara.svg",
        count: 1,
      },
    ],
  },
  {
    label: "Akun",
    ariaLabel: "Akun pelamar",
    items: [
      {
        label: "Profil dan CV",
        href: "/pelamar/profil",
        icon: "pelamar.svg",
      },
      {
        label: "Pengaturan",
        href: "/pelamar/pengaturan",
        icon: "pengaturan.svg",
      },
      {
        label: "Akun perusahaan",
        href: "/perekrut/profil-perusahaan",
        icon: "profil.svg",
        badge: "Baru",
      },
    ],
  },
];

export function ApplicantShell({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      brandHref="/pelamar/ringkasan"
      sidebarLabel="Navigasi dashboard pelamar"
      theme="light"
      topCard={{
        href: "/pelamar/profil",
        initials: "R",
        name: "Rani Ayu Pratama",
        role: "Pencari kerja",
      }}
      navGroups={NAV_GROUPS}
      footer={<ProfileProgress />}
    >
      {children}
    </DashboardShell>
  );
}
