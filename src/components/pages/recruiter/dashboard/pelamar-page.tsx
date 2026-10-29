"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchIcon } from "@/components/ui/icons/icons";
import { Avatar, PageHeading } from "./dashboard-parts";
import { COLUMNS, candidateHref, type Candidate } from "./pelamar-data";
import styles from "./dashboard.module.css";

export function PelamarPage() {
  const [query, setQuery] = useState("");
  const [minMatch, setMinMatch] = useState(false);
  const [remote, setRemote] = useState(false);

  function matches(candidate: Candidate) {
    return (
      candidate.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (!minMatch || candidate.match >= 80) &&
      (!remote || candidate.location === "Remote")
    );
  }

  return (
    <div className={styles.mainInner}>
      <PageHeading
        title="Pelamar"
        subtitle="Senior Product Designer · 112 pelamar"
      />

      <div className={styles.toolbar}>
        <div className={styles.tabs} role="group" aria-label="Filter pelamar">
          <span className={`${styles.tab} ${styles.tabActive}`}>
            Lowongan: Senior Product Designer
          </span>
          <button
            type="button"
            className={`${styles.tab} ${minMatch ? styles.tabActive : ""}`}
            aria-pressed={minMatch}
            onClick={() => setMinMatch((value) => !value)}
          >
            Kecocokan 80% ke atas
          </button>
          <button
            type="button"
            className={`${styles.tab} ${remote ? styles.tabActive : ""}`}
            aria-pressed={remote}
            onClick={() => setRemote((value) => !value)}
          >
            Remote
          </button>
        </div>

        <div className={styles.search}>
          <SearchIcon size={16} className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Cari nama pelamar"
            aria-label="Cari nama pelamar"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <div className={styles.board}>
        {COLUMNS.map((column) => {
          const candidates = column.candidates.filter(matches);

          return (
            <section key={column.title} className={styles.column}>
              <div className={styles.columnHead}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <span className={styles.countTag}>{column.total}</span>
              </div>

              {candidates.map((candidate) => (
                <Link
                  key={candidate.name}
                  href={candidateHref(candidate)}
                  className={styles.candidateCard}
                >
                  <div className={styles.candidateTop}>
                    <Avatar
                      initials={candidate.initials}
                      color={candidate.color}
                      size="sm"
                    />
                    <div className={styles.candidateCardText}>
                      <span className={styles.cardName}>{candidate.name}</span>
                      <span className={styles.cardMeta}>
                        {candidate.years} · {candidate.location}
                      </span>
                    </div>
                  </div>
                  <div className={styles.candidateBottom}>
                    <span className={`${styles.tag} ${styles.tagMint}`}>
                      {candidate.match}%
                    </span>
                    <span className={styles.timeNote}>{candidate.time}</span>
                  </div>
                </Link>
              ))}

              {candidates.length === 0 ? (
                <p className={styles.columnEmpty}>Tidak ada pelamar.</p>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  );
}
