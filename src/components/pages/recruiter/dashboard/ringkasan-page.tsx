"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Avatar, PageHeading } from "./dashboard-parts";
import styles from "./dashboard.module.css";

type QueueCandidate = {
  name: string;
  initials: string;
  color: string;
  role: string;
  years: string;
  location: string;
  match: number;
};

const QUEUE: QueueCandidate[] = [
  {
    name: "Rani Ayu P.",
    initials: "RA",
    color: "#3d3bf3",
    role: "Senior Product Designer",
    years: "4 tahun",
    location: "Surabaya",
    match: 92,
  },
  {
    name: "Dimas Pratama",
    initials: "DP",
    color: "#0b7a62",
    role: "Senior Product Designer",
    years: "6 tahun",
    location: "Jakarta",
    match: 89,
  },
  {
    name: "Salsa Nuraini",
    initials: "SN",
    color: "#7c3aed",
    role: "Product Designer",
    years: "5 tahun",
    location: "Remote",
    match: 85,
  },
  {
    name: "Bagas Wicaksono",
    initials: "BW",
    color: "#c2410c",
    role: "UX Researcher",
    years: "3 tahun",
    location: "Bandung",
    match: 81,
  },
];

const FUNNEL = [
  { label: "Pelamar", value: 412 },
  { label: "Ditinjau", value: 268 },
  { label: "Wawancara", value: 74 },
  { label: "Penawaran", value: 18 },
  { label: "Diterima", value: 11 },
];

const STATS = [
  { value: 6, label: "Lowongan aktif", note: "2 hampir ditutup" },
  { value: 34, label: "Pelamar baru hari ini", note: "8 lebih banyak dari kemarin" },
  { value: 12, label: "Menunggu tinjauan", note: "4 sudah lebih dari 3 hari" },
  { value: 5, label: "Wawancara minggu ini", note: "2 di antaranya hari ini" },
];

const SCHEDULE = [
  { time: "10.00", name: "Fajar Nugroho" },
  { time: "14.00", name: "Maya Kusuma" },
];

const ATTENTION = [
  { name: "Data Analyst", note: "Belum ada pelamar dalam 7 hari" },
  { name: "Design System Lead", note: "Ditutup 3 hari lagi" },
  { name: "UX Researcher", note: "18 pelamar belum ditinjau" },
];

export function RingkasanPage() {
  const [queue, setQueue] = useState(QUEUE);

  function dismiss(name: string) {
    setQueue((current) => current.filter((candidate) => candidate.name !== name));
  }

  return (
    <div className={styles.mainInner}>
      <PageHeading
        title="Halo, tim Tokoloka"
        subtitle="12 pelamar menunggu tinjauan dan 2 wawancara hari ini."
      />

      <div className={styles.stats}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statNote}>{stat.note}</p>
          </div>
        ))}
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.leftColumn}>
          <section className={`${styles.card} ${styles.queueCard}`}>
            <h2 className={styles.cardTitle}>Perlu tindakan</h2>
            <p className={styles.cardSub}>
              Pelamar dengan kecocokan tertinggi yang belum diputuskan.
            </p>

            {queue.map((candidate) => (
              <div key={candidate.name} className={styles.queueRow}>
                <Avatar
                  initials={candidate.initials}
                  color={candidate.color}
                />
                <div className={styles.candidateText}>
                  <p className={styles.candidateName}>{candidate.name}</p>
                  <p className={styles.candidateMeta}>
                    {candidate.role} · {candidate.years} · {candidate.location}
                  </p>
                </div>
                <span className={styles.queueSpacer} />
                <span className={styles.match}>{candidate.match}%</span>
                <div className={styles.queueActions}>
                  <Button
                    type="button"
                    className={styles.buttonSm}
                    aria-label={`Setujui ${candidate.name}`}
                    onClick={() => dismiss(candidate.name)}
                  >
                    Setujui
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={styles.buttonSm}
                    aria-label={`Tolak ${candidate.name}`}
                    onClick={() => dismiss(candidate.name)}
                  >
                    Tolak
                  </Button>
                </div>
              </div>
            ))}

            {queue.length === 0 ? (
              <p className={styles.empty}>Semua pelamar sudah ditinjau.</p>
            ) : null}
          </section>

          <section className={`${styles.card} ${styles.funnelCard}`}>
            <h2 className={styles.cardTitle}>Corong rekrutmen 30 hari</h2>
            {FUNNEL.map((step) => (
              <div key={step.label} className={styles.funnelRow}>
                <span className={styles.funnelLabel}>{step.label}</span>
                <span className={styles.funnelTrack}>
                  <span
                    className={styles.funnelFill}
                    style={{ width: `${(step.value / FUNNEL[0].value) * 100}%`, display: "block" }}
                  />
                </span>
                <span className={styles.funnelValue}>{step.value}</span>
              </div>
            ))}
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={`${styles.card} ${styles.sideCard}`}>
            <h2 className={styles.cardTitle}>Wawancara hari ini</h2>
            {SCHEDULE.map((item) => (
              <div key={item.name} className={styles.scheduleRow}>
                <span className={styles.timeTag}>{item.time}</span>
                <span className={styles.scheduleText}>
                  <span className={styles.scheduleName}>{item.name}</span>
                  <span className={styles.scheduleMeta}>
                    Senior Product Designer · Zoom
                  </span>
                </span>
              </div>
            ))}
          </section>

          <section className={`${styles.card} ${styles.sideCard}`}>
            <h2 className={styles.cardTitle}>Lowongan perlu perhatian</h2>
            <div className={styles.attentionList}>
              {ATTENTION.map((item) => (
                <div key={item.name} className={styles.attentionItem}>
                  <span className={styles.attentionName}>{item.name}</span>
                  <span className={styles.attentionMeta}>{item.note}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
