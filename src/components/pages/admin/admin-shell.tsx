import type { ReactNode } from "react";
import {
  DashboardShell,
  type DashboardNavGroup,
} from "../recruiter/dashboard/dashboard-shell";
import { PLATFORM_ADMIN_EMAIL } from "@/lib/data/company";
import dashboard from "../recruiter/dashboard/dashboard.module.css";

export type AdminCounts = {
  verification: number;
  moderation: number;
  reports: number;
  jobs: number;
  courses: number;
};

export function AdminShell({
  counts,
  children,
}: {
  counts: AdminCounts;
  children: ReactNode;
}) {
  const navGroups: DashboardNavGroup[] = [
    {
      label: "Operasional",
      ariaLabel: "Operasional",
      items: [
        { label: "Ringkasan", href: "/admin", icon: "ringkasan.svg" },
        {
          label: "Verifikasi perusahaan",
          href: "/admin/verifikasi-perusahaan",
          icon: "verifikasi.svg",
          count: counts.verification,
        },
        {
          label: "Moderasi lowongan",
          href: "/admin/moderasi-lowongan",
          icon: "moderasi.svg",
          count: counts.moderation,
        },
        {
          label: "Laporan",
          href: "/admin/laporan",
          icon: "laporan.svg",
          count: counts.reports,
        },
      ],
    },
    {
      label: "Pengguna",
      ariaLabel: "Pengguna",
      items: [
        { label: "Pencari kerja", href: "/admin/pengguna", icon: "pengguna.svg" },
        { label: "Perusahaan", href: "/admin/perusahaan", icon: "perusahaan.svg" },
        { label: "Perekrut", href: "/admin/perekrut", icon: "perekrut.svg" },
      ],
    },
    {
      label: "Katalog",
      ariaLabel: "Katalog",
      items: [
        {
          label: "Lowongan",
          href: "/admin/lowongan",
          icon: "lowongan.svg",
          count: counts.jobs,
        },
        {
          label: "Kursus",
          href: "/admin/kursus",
          icon: "kursus.svg",
          count: counts.courses,
        },
        { label: "Kategori", href: "/admin/kategori", icon: "kategori.svg" },
      ],
    },
    {
      label: "Keuangan",
      ariaLabel: "Keuangan",
      items: [
        {
          label: "Langganan & tagihan",
          href: "/admin/langganan",
          icon: "langganan.svg",
        },
      ],
    },
    {
      label: "Sistem",
      ariaLabel: "Sistem",
      items: [
        { label: "Analitik", href: "/admin/analitik", icon: "analitik.svg" },
        {
          label: "Pengaturan",
          href: "/admin/pengaturan",
          icon: "pengaturan.svg",
        },
      ],
    },
  ];

  return (
    <DashboardShell
      brandHref="/admin"
      sidebarLabel="Navigasi admin platform"
      iconDir="/icons/admin"
      theme="dark"
      logoutSession="company"
      topCard={{
        initials: "KP",
        name: "Kerjakita",
        role: "Admin platform",
      }}
      account={{
        href: "/admin/pengaturan",
        initials: "AD",
        name: "Admin platform",
        role: PLATFORM_ADMIN_EMAIL,
      }}
      footer={
        <div className={dashboard.roleCard}>
          <span className={dashboard.roleLabel}>Mode admin</span>
          <span className={dashboard.roleValue}>Akses penuh</span>
          <p className={dashboard.roleNote}>
            Keputusan moderasi dan laporan tersimpan di browser ini.
          </p>
        </div>
      }
      navGroups={navGroups}
    >
      {children}
    </DashboardShell>
  );
}
