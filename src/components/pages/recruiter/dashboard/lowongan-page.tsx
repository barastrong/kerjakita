"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchIcon } from "@/components/ui/icons/icons";
import { PageHeading } from "./dashboard-parts";
import styles from "./dashboard.module.css";

type Status = "aktif" | "draf";

type Job = {
  title: string;
  location: string;
  mode: string;
  status: Status;
  applicants: number | null;
  views: number | null;
  closed: string;
};

const JOBS: Job[] = [
  {
    title: "Senior Product Designer",
    location: "Jakarta Selatan",
    mode: "Hybrid",
    status: "aktif",
    applicants: 112,
    views: 2140,
    closed: "30 Okt",
  },
  {
    title: "Product Designer",
    location: "Remote",
    mode: "Indonesia",
    status: "aktif",
    applicants: 86,
    views: 1560,
    closed: "2 Nov",
  },
  {
    title: "UX Researcher",
    location: "Jakarta Selatan",
    mode: "Hybrid",
    status: "aktif",
    applicants: 47,
    views: 980,
    closed: "8 Nov",
  },
  {
    title: "Design System Lead",
    location: "Surabaya",
    mode: "Onsite",
    status: "aktif",
    applicants: 29,
    views: 720,
    closed: "17 Okt",
  },
  {
    title: "Data Analyst",
    location: "Jakarta Selatan",
    mode: "Hybrid",
    status: "aktif",
    applicants: 0,
    views: 64,
    closed: "12 Nov",
  },
  {
    title: "Frontend Engineer",
    location: "Remote",
    mode: "Indonesia",
    status: "aktif",
    applicants: 91,
    views: 1870,
    closed: "5 Nov",
  },
  {
    title: "Content Designer",
    location: "Jakarta Selatan",
    mode: "Hybrid",
    status: "draf",
    applicants: null,
    views: null,
    closed: "-",
  },
  {
    title: "Brand Designer",
    location: "Surabaya",
    mode: "Onsite",
    status: "draf",
    applicants: null,
    views: null,
    closed: "-",
  },
];

const TABS = [
  { key: "aktif", label: "Aktif 6" },
  { key: "draf", label: "Draf 2" },
  { key: "ditutup", label: "Ditutup 3" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function formatCount(value: number | null) {
  return value === null ? "-" : value.toLocaleString("id-ID");
}

export function LowonganPage() {
  const [tab, setTab] = useState<TabKey>("aktif");
  const [query, setQuery] = useState("");

  const jobs = JOBS.filter(
    (job) =>
      job.status === tab &&
      job.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className={styles.mainInner}>
      <PageHeading title="Lowongan" subtitle="6 aktif, 2 draf, 3 ditutup." />

      <div className={styles.toolbar}>
        <div className={styles.tabs} role="group" aria-label="Filter status lowongan">
          {TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`${styles.tab} ${tab === item.key ? styles.tabActive : ""}`}
              aria-pressed={tab === item.key}
              onClick={() => setTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className={styles.search}>
          <SearchIcon size={16} className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Cari judul lowongan"
            aria-label="Cari judul lowongan"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <colgroup>
              <col className={styles.colJob} />
              <col className={styles.colStatus} />
              <col className={styles.colApplicants} />
              <col className={styles.colViews} />
              <col className={styles.colClosed} />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Lowongan</th>
                <th scope="col">Status</th>
                <th scope="col">Pelamar</th>
                <th scope="col">Dilihat</th>
                <th scope="col">Ditutup</th>
                <th scope="col" aria-label="Kelola" />
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.title}>
                  <td>
                    <div className={styles.jobCell}>
                      <span className={styles.jobTitle}>{job.title}</span>
                      <span className={styles.jobMeta}>
                        {job.location} · {job.mode}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${styles.tag} ${
                        job.status === "aktif" ? styles.tagMint : styles.tagMuted
                      }`}
                    >
                      {job.status === "aktif" ? "Aktif" : "Draf"}
                    </span>
                  </td>
                  <td>
                    <span className={styles.countValue}>
                      {formatCount(job.applicants)}
                    </span>
                  </td>
                  <td>{formatCount(job.views)}</td>
                  <td>{job.closed}</td>
                  <td>
                    <Link
                      href="/perekrut/pasang-lowongan"
                      className={styles.manage}
                      aria-label={`Kelola lowongan ${job.title}`}
                    >
                      Kelola
                    </Link>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyCell}>
                    Belum ada lowongan pada filter ini.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
