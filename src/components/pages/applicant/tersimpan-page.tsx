"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button/button";
import { BookmarkIcon } from "@/components/ui/icons/icons";
import dashboardStyles from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import { ApplicantHeading, CompanyMark } from "./applicant-parts";
import styles from "./applicant.module.css";

type SavedJob = {
  id: string;
  initials: string;
  color: string;
  role: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  closing: string;
  collections: string[];
};

const SAVED_JOBS: SavedJob[] = [
  {
    id: "kopi-sinar",
    initials: "KS",
    color: "#b45309",
    role: "UI/UX Designer",
    company: "Kopi Sinar Digital",
    location: "Surabaya",
    salary: "Rp 10 – 14 jt",
    tags: ["Mobile app", "Figma"],
    closing: "Tutup 3 hari lagi",
    collections: ["Desain", "Dekat rumah"],
  },
  {
    id: "tokoloka",
    initials: "TL",
    color: "#3d3bf3",
    role: "Senior Product Designer",
    company: "Tokoloka",
    location: "Jakarta Selatan",
    salary: "Rp 18 – 25 jt",
    tags: ["Design system", "Hybrid"],
    closing: "Tutup 16 hari lagi",
    collections: ["Desain"],
  },
  {
    id: "bayarpintar",
    initials: "BP",
    color: "#0b7a62",
    role: "Product Designer",
    company: "Bayarpintar",
    location: "Remote",
    salary: "Rp 14 – 20 jt",
    tags: ["UX research", "Remote"],
    closing: "Tutup 9 hari lagi",
    collections: ["Desain", "Remote"],
  },
  {
    id: "nawasehat",
    initials: "NW",
    color: "#6d28d9",
    role: "Lead Designer",
    company: "Nawasehat",
    location: "Jakarta Barat",
    salary: "Rp 22 – 30 jt",
    tags: ["Tim", "Onsite"],
    closing: "Tutup 21 hari lagi",
    collections: ["Desain"],
  },
  {
    id: "dagangin",
    initials: "DG",
    color: "#0b7a62",
    role: "Senior UX Designer",
    company: "Dagangin",
    location: "Remote",
    salary: "Rp 16 – 22 jt",
    tags: ["E-commerce", "Remote"],
    closing: "Tutup 12 hari lagi",
    collections: ["Desain", "Remote"],
  },
  {
    id: "lokalkarya",
    initials: "LK",
    color: "#b45309",
    role: "Product Designer",
    company: "Lokalkarya",
    location: "Jakarta Pusat",
    salary: "Rp 13 – 18 jt",
    tags: ["Fintech", "Hybrid"],
    closing: "Tutup 6 hari lagi",
    collections: ["Desain", "Dekat rumah"],
  },
];

const COLLECTIONS = [
  { label: "Semua", count: 12 },
  { label: "Desain", count: 6 },
  { label: "Remote", count: 4 },
  { label: "Dekat rumah", count: 2 },
];

export function TersimpanPage() {
  const [activeCollection, setActiveCollection] = useState("Semua");
  const [jobs, setJobs] = useState(SAVED_JOBS);

  const total = 12 - (SAVED_JOBS.length - jobs.length);
  const filtered =
    activeCollection === "Semua"
      ? jobs
      : jobs.filter((job) => job.collections.includes(activeCollection));

  function removeJob(id: string) {
    setJobs((current) => current.filter((job) => job.id !== id));
  }

  return (
    <div className={dashboardStyles.mainInner}>
      <ApplicantHeading
        title="Tersimpan"
        subtitle={`${total} lowongan yang kamu simpan.`}
      />

      <div className={styles.savedLayout}>
        <aside className={styles.collectionCard}>
          <h2 className={styles.collectionTitle}>Koleksi</h2>
          <div className={styles.collectionList}>
            {COLLECTIONS.map((collection) => (
              <button
                key={collection.label}
                type="button"
                className={`${styles.collectionButton} ${
                  activeCollection === collection.label
                    ? styles.collectionButtonActive
                    : ""
                }`}
                aria-pressed={activeCollection === collection.label}
                onClick={() => setActiveCollection(collection.label)}
              >
                {collection.label}
                <span className={styles.collectionCount}>
                  {collection.count}
                </span>
              </button>
            ))}
          </div>
          <button type="button" className={styles.newCollection}>
            Koleksi baru
          </button>
        </aside>

        <div className={styles.savedGrid}>
          {filtered.map((job) => (
            <article key={job.id} className={styles.savedCard}>
              <div className={styles.savedTop}>
                <CompanyMark initials={job.initials} color={job.color} />
                <button
                  type="button"
                  className={styles.bookmarkButton}
                  aria-label={`Hapus ${job.role} dari tersimpan`}
                  onClick={() => removeJob(job.id)}
                >
                  <BookmarkIcon size={20} fill="currentColor" />
                </button>
              </div>
              <h2 className={styles.savedTitle}>{job.role}</h2>
              <p className={styles.savedCompany}>
                {job.company} · {job.location}
              </p>
              <p className={styles.salary}>{job.salary}</p>
              <div className={styles.tags}>
                {job.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
                <span className={styles.closingTag}>{job.closing}</span>
              </div>
              <div className={styles.savedActions}>
                <ButtonLink href="/lowongan" size="sm">
                  Lamar
                </ButtonLink>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeJob(job.id)}
                >
                  Hapus
                </Button>
              </div>
            </article>
          ))}
          {filtered.length === 0 ? (
            <p className={styles.emptyState}>
              Belum ada lowongan di koleksi ini.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
