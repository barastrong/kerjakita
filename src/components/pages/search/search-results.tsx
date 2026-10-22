"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BookmarkIcon,
  ChevronDownIcon,
  LockIcon,
} from "@/components/ui/icons/icons";
import type { Job } from "@/lib/data/jobs";
import { JobDetail } from "./job-detail";
import styles from "./search-page.module.css";

const PAGES = ["1", "2", "3", "…", "42"];

export function SearchResults({ jobs, query }: { jobs: Job[]; query: string }) {
  const [selectedSlug, setSelectedSlug] = useState(jobs[0]?.slug);
  const selectedJob =
    jobs.find((job) => job.slug === selectedSlug) ?? jobs[0];

  function select(slug: string) {
    setSelectedSlug(slug);
  }

  return (
    <>
      <section className={styles.results}>
        <div className={styles.resultsHead}>
          <div>
            <h1 className={styles.resultsTitle}>
              {jobs.length} lowongan{query ? ` ${query}` : ""}
            </h1>
            <p className={styles.resultsSubtitle}>
              Diurutkan dari yang paling relevan
            </p>
          </div>
          <button type="button" className={styles.sortButton}>
            <span>
              Urutkan: <strong>Paling relevan</strong>
            </span>
            <ChevronDownIcon size={14} />
          </button>
        </div>

        <div className={styles.guestBanner}>
          <LockIcon size={18} />
          <p>Masuk untuk melihat skor kecocokan dan menyimpan lowongan.</p>
          <a href="/masuk">Masuk</a>
        </div>

        {jobs.length === 0 ? (
          <p className={styles.emptyResults}>
            Tidak ada lowongan yang cocok. Coba kata kunci atau lokasi lain.
          </p>
        ) : (
          <div className={styles.resultList}>
            {jobs.map((job) => (
              <article
                key={job.slug}
                className={`${styles.resultCard} ${
                  job.slug === selectedJob?.slug ? styles.resultCardActive : ""
                }`}
                role="button"
                tabIndex={0}
                aria-pressed={job.slug === selectedJob?.slug}
                onClick={() => select(job.slug)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    select(job.slug);
                  }
                }}
              >
                <div className={styles.resultTop}>
                  <Avatar
                    initials={job.initials}
                    color={job.color}
                    size="xl"
                    label={job.company}
                  />
                  <div className={styles.resultTitles}>
                    <h2>{job.title}</h2>
                    <p>
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={styles.resultBookmark}
                    aria-label={`Simpan lowongan ${job.title}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <BookmarkIcon size={20} />
                  </button>
                </div>

                <div className={styles.resultSalary}>
                  <span>{job.salaryShort}</span>
                  <Badge>{job.workStyle}</Badge>
                  <Badge>{job.employmentType}</Badge>
                </div>

                <div className={styles.resultSkills}>
                  {(job.searchSkills ?? job.skills).map((skill) => (
                    <Badge key={skill} tone="mint">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div
                  className={`${styles.resultFooter} ${
                    job.quickApply ? "" : styles.resultFooterCompact
                  }`}
                >
                  <span>Diposting {job.posted}</span>
                  {job.quickApply && <Badge tone="gold">Lamar cepat</Badge>}
                </div>
              </article>
            ))}
          </div>
        )}

        <nav className={styles.pagination} aria-label="Halaman hasil pencarian">
          <button
            type="button"
            className={styles.pageButton}
            aria-label="Sebelumnya"
          >
            ‹
          </button>
          {PAGES.map((page) => (
            <button
              key={page}
              type="button"
              className={`${styles.pageButton} ${
                page === "1" ? styles.pageButtonActive : ""
              } ${page === "…" ? styles.pageEllipsis : ""}`}
              aria-current={page === "1" ? "page" : undefined}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className={styles.pageButton}
            aria-label="Berikutnya"
          >
            ›
          </button>
        </nav>
      </section>

      {selectedJob && <JobDetail job={selectedJob} />}
    </>
  );
}
