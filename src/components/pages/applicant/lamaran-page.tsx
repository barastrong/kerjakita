"use client";

import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button/button";
import { SearchIcon } from "@/components/ui/icons/icons";
import dashboardStyles from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import {
  ApplicantHeading,
  ApplicationStatus,
  CompanyMark,
} from "./applicant-parts";
import { APPLICATIONS } from "./lamaran-data";
import styles from "./applicant.module.css";

const TABS = [
  { label: "Semua", count: 7 },
  { label: "Aktif", count: 4 },
  { label: "Wawancara", count: 1 },
  { label: "Selesai", count: 3 },
];

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
                <th>Detail</th>
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
                    <ApplicationStatus
                      status={application.status}
                      tone={application.tone}
                    />
                  </td>
                  <td>
                    <Link
                      href={`/pelamar/lamaran/${application.id}`}
                      className={styles.detailLink}
                      aria-label={`Lihat detail ${application.role} di ${application.company}`}
                    >
                      Lihat detail
                    </Link>
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
