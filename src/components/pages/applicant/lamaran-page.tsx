"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button/button";
import { SearchIcon } from "@/components/ui/icons/icons";
import dashboardStyles from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import { ApplicantHeading, CompanyMark } from "./applicant-parts";
import styles from "./applicant.module.css";

type Tone = "muted" | "mint" | "yellow";
type Group = "Aktif" | "Wawancara" | "Selesai";

type Application = {
  id: string;
  initials: string;
  color: string;
  role: string;
  company: string;
  sent: string;
  status: string;
  tone: Tone;
  group: Group;
  match: number;
};

const APPLICATIONS: Application[] = [
  {
    id: "tokoloka",
    initials: "TL",
    color: "#3d3bf3",
    role: "Senior Product Designer",
    company: "Tokoloka",
    sent: "Hari ini",
    status: "Terkirim",
    tone: "muted",
    group: "Aktif",
    match: 92,
  },
  {
    id: "bayarpintar",
    initials: "BP",
    color: "#0b7a62",
    role: "Product Designer, Pembayaran",
    company: "Bayarpintar",
    sent: "11 Okt",
    status: "Terkirim",
    tone: "muted",
    group: "Aktif",
    match: 86,
  },
  {
    id: "kopi-sinar",
    initials: "KS",
    color: "#b45309",
    role: "UI/UX Designer",
    company: "Kopi Sinar Digital",
    sent: "9 Okt",
    status: "Dilihat perekrut",
    tone: "mint",
    group: "Aktif",
    match: 81,
  },
  {
    id: "nawasehat",
    initials: "NW",
    color: "#6d28d9",
    role: "Lead Designer",
    company: "Nawasehat",
    sent: "5 Okt",
    status: "Wawancara 15 Okt",
    tone: "yellow",
    group: "Wawancara",
    match: 74,
  },
  {
    id: "garuda-retail",
    initials: "GR",
    color: "#1f2937",
    role: "Product Designer (Kontrak)",
    company: "Garuda Retail Tech",
    sent: "28 Sep",
    status: "Tidak lanjut",
    tone: "muted",
    group: "Selesai",
    match: 71,
  },
  {
    id: "dagangin",
    initials: "DG",
    color: "#0b7a62",
    role: "UX Designer",
    company: "Dagangin",
    sent: "20 Sep",
    status: "Tidak lanjut",
    tone: "muted",
    group: "Selesai",
    match: 68,
  },
  {
    id: "pintarta",
    initials: "PT",
    color: "#6d28d9",
    role: "Design Researcher",
    company: "Pintarta",
    sent: "14 Sep",
    status: "Ditarik",
    tone: "muted",
    group: "Selesai",
    match: 66,
  },
];

const TABS = [
  { label: "Semua", count: 7 },
  { label: "Aktif", count: 4 },
  { label: "Wawancara", count: 1 },
  { label: "Selesai", count: 3 },
];

function toneClass(tone: Tone) {
  if (tone === "mint") return styles.statusBadgeMint;
  if (tone === "yellow") return styles.statusBadgeYellow;
  return styles.statusBadgeMuted;
}

export function LamaranPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [query, setQuery] = useState("");

  const filtered = APPLICATIONS.filter((application) => {
    const matchesTab =
      activeTab === "Semua" ||
      application.group === activeTab ||
      (activeTab === "Aktif" && application.group === "Wawancara");
    const needle = query.trim().toLowerCase();
    const matchesQuery =
      !needle ||
      application.role.toLowerCase().includes(needle) ||
      application.company.toLowerCase().includes(needle);

    return matchesTab && matchesQuery;
  });

  return (
    <div className={dashboardStyles.mainInner}>
      <ApplicantHeading
        title="Lamaran saya"
        subtitle="7 lamaran sejak September 2026."
        action={
          <ButtonLink href="/lowongan" size="sm" className={styles.headerButton}>
            Cari lowongan baru
          </ButtonLink>
        }
      />

      <div className={styles.toolbar}>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={`${styles.tab} ${
                activeTab === tab.label ? styles.tabActive : ""
              }`}
              aria-pressed={activeTab === tab.label}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
              <span className={styles.tabCount}>{tab.count}</span>
            </button>
          ))}
        </div>

        <label className={styles.searchBox}>
          <SearchIcon size={16} />
          <span className={styles.srOnly}>Cari lamaran</span>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Cari posisi atau perusahaan"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <section className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Posisi</th>
                <th>Dikirim</th>
                <th>Status</th>
                <th>Kecocokan</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((application) => (
                <tr key={application.id}>
                  <td>
                    <div className={styles.positionCell}>
                      <CompanyMark
                        initials={application.initials}
                        color={application.color}
                        size="sm"
                      />
                      <div className={styles.positionText}>
                        <p className={styles.positionTitle}>
                          {application.role}
                        </p>
                        <p className={styles.positionCompany}>
                          {application.company}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableDate}>{application.sent}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${toneClass(
                        application.tone,
                      )}`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td>
                    <span className={styles.matchText}>
                      {application.match}%
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className={styles.emptyState}>
                      Tidak ada lamaran yang cocok dengan pencarianmu.
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
