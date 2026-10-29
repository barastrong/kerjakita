"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons/icons";
import { Avatar, PageHeading } from "./dashboard-parts";
import styles from "./dashboard.module.css";

type InterviewEvent = {
  time: string;
  name: string;
  role: string;
  tone?: "lavender" | "yellow";
  note?: string;
};

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAY_LABELS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const WEEK_START = new Date(2026, 9, 12);

const EVENTS: Record<string, InterviewEvent[]> = {
  "2026-10-12": [
    {
      time: "09.30",
      name: "Intan Maharani",
      role: "Product Designer",
    },
  ],
  "2026-10-14": [
    {
      time: "10.00",
      name: "Fajar Nugroho",
      role: "Senior Product Designer",
    },
    {
      time: "14.00",
      name: "Maya Kusuma",
      role: "Senior Product Designer",
    },
  ],
  "2026-10-15": [
    {
      time: "10.00",
      name: "Rani Ayu P.",
      role: "Senior Product Designer",
      tone: "yellow",
      note: "Belum dikirim",
    },
    {
      time: "13.00",
      name: "Yoga Pranata",
      role: "Senior Product Designer",
    },
  ],
  "2026-10-16": [
    {
      time: "11.00",
      name: "Nadia Putri",
      role: "UX Researcher",
    },
  ],
};

const WAITING = [
  {
    name: "Yoga Pranata",
    initials: "YP",
    color: "#be185d",
    note: "Undangan dikirim 12 Okt",
  },
  {
    name: "Nadia Putri",
    initials: "NP",
    color: "#0b7a62",
    note: "Undangan dikirim 13 Okt",
  },
];

const LOAD = [
  { name: "Dina P.", sessions: 3, width: 100 },
  { name: "Raka A.", sessions: 2, width: 67 },
  { name: "Rina K.", sessions: 1, width: 34 },
];

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function weekLabel(start: Date) {
  const end = addDays(start, 6);

  if (start.getMonth() === end.getMonth()) {
    return `Minggu ${start.getDate()} – ${end.getDate()} ${MONTHS[start.getMonth()]} ${start.getFullYear()}`;
  }

  return `Minggu ${start.getDate()} ${MONTHS[start.getMonth()]} – ${end.getDate()} ${MONTHS[end.getMonth()]} ${end.getFullYear()}`;
}

export function WawancaraPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeKey, setActiveKey] = useState("2026-10-14");
  const [allJobs, setAllJobs] = useState(true);
  const [asInterviewer, setAsInterviewer] = useState(false);
  const [reminded, setReminded] = useState<string[]>([]);

  const start = addDays(WEEK_START, weekOffset * 7);
  const days = DAY_LABELS.map((label, index) => {
    const date = addDays(start, index);
    return { label, date, key: dateKey(date) };
  });

  function moveWeek(delta: number) {
    const next = weekOffset + delta;
    setWeekOffset(next);
    setActiveKey(dateKey(addDays(WEEK_START, next * 7 + 2)));
  }

  function goToday() {
    setWeekOffset(0);
    setActiveKey("2026-10-14");
  }

  function remind(name: string) {
    setReminded((current) => [...current, name]);
  }

  return (
    <div className={styles.mainInner}>
      <PageHeading title="Wawancara" subtitle={weekLabel(start)} />

      <div className={styles.weekToolbar}>
        <button type="button" className={styles.weekPill} onClick={goToday}>
          Hari ini
        </button>
        <div className={`${styles.weekPill} ${styles.weekPillActive}`}>
          <button
            type="button"
            className={styles.weekArrow}
            aria-label="Minggu sebelumnya"
            onClick={() => moveWeek(-1)}
          >
            <ChevronLeftIcon size={14} />
          </button>
          <span>Minggu ini</span>
          <button
            type="button"
            className={styles.weekArrow}
            aria-label="Minggu berikutnya"
            onClick={() => moveWeek(1)}
          >
            <ChevronRightIcon size={14} />
          </button>
        </div>
        <button
          type="button"
          className={styles.weekPill}
          aria-pressed={allJobs}
          onClick={() => setAllJobs((value) => !value)}
        >
          Semua lowongan
        </button>
        <button
          type="button"
          className={styles.weekPill}
          aria-pressed={asInterviewer}
          onClick={() => setAsInterviewer((value) => !value)}
        >
          Saya sebagai pewawancara
        </button>
      </div>

      <div className={styles.weekBoard}>
        {days.map((day) => {
          const active = day.key === activeKey;
          const events = EVENTS[day.key] ?? [];

          return (
            <section
              key={day.key}
              className={`${styles.dayColumn} ${active ? styles.dayColumnActive : ""}`}
            >
              <button
                type="button"
                className={`${styles.dayHead} ${active ? styles.dayHeadActive : ""}`}
                aria-pressed={active}
                aria-label={`${day.label} ${day.date.getDate()} ${MONTHS[day.date.getMonth()]}`}
                onClick={() => setActiveKey(day.key)}
              >
                <span className={styles.dayName}>{day.label}</span>
                <span className={styles.dayDate}>{day.date.getDate()}</span>
              </button>

              <div className={styles.dayEvents}>
                {events.length > 0 ? (
                  events.map((event) => (
                    <div
                      key={`${event.time}-${event.name}`}
                      className={`${styles.eventCard} ${
                        event.tone === "yellow" ? styles.eventYellow : ""
                      }`}
                    >
                      <span className={styles.eventTime}>{event.time}</span>
                      <span className={styles.eventName}>{event.name}</span>
                      <span className={styles.eventRole}>{event.role}</span>
                      {event.note ? (
                        <span className={styles.eventNote}>{event.note}</span>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p className={styles.dayEmpty}>Tidak ada jadwal</p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <div className={styles.weekBottom}>
        <section className={`${styles.card} ${styles.queueCard}`}>
          <h2 className={styles.cardTitle}>Menunggu konfirmasi kandidat</h2>
          {WAITING.map((item) => {
            const sent = reminded.includes(item.name);

            return (
              <div key={item.name} className={styles.queueRow}>
                <Avatar initials={item.initials} color={item.color} />
                <div className={styles.candidateText}>
                  <p className={styles.candidateName}>{item.name}</p>
                  <p className={styles.candidateMeta}>{item.note}</p>
                </div>
                <span className={styles.queueSpacer} />
                <Button
                  type="button"
                  variant="outline"
                  className={styles.buttonSm}
                  disabled={sent}
                  onClick={() => remind(item.name)}
                >
                  {sent ? "Pengingat terkirim" : "Kirim pengingat"}
                </Button>
              </div>
            );
          })}
        </section>

        <section className={`${styles.card} ${styles.queueCard}`}>
          <h2 className={styles.cardTitle}>Beban pewawancara minggu ini</h2>
          <div className={styles.loadList}>
            {LOAD.map((item) => (
              <div key={item.name} className={styles.loadRow}>
                <span className={styles.loadLabel}>{item.name}</span>
                <span className={styles.loadTrack}>
                  <span
                    className={styles.loadFill}
                    style={{ width: `${item.width}%` }}
                  />
                </span>
                <span className={styles.loadValue}>{item.sessions} sesi</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
