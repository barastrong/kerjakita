"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/button/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons/icons";
import { Breadcrumbs, PageHeading } from "./dashboard-parts";
import { getCandidate } from "./pelamar-data";
import styles from "./dashboard.module.css";

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
const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
const TIME_SLOTS = ["09.00", "10.00", "11.00", "13.00", "14.00", "15.30"];
const FORMATS = ["Zoom", "Onsite", "Telepon"];

function longDate(date: Date) {
  return `${DAY_NAMES[date.getDay()]}, ${date.getDate()} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
}

export function JadwalkanWawancaraPage({ slug }: { slug: string }) {
  const candidate = getCandidate(slug);
  const router = useRouter();
  const firstName = candidate.fullName.split(" ")[0];
  const [monthOffset, setMonthOffset] = useState(0);
  const [selected, setSelected] = useState(new Date(2026, 9, 15));
  const [time, setTime] = useState("10.00");
  const [format, setFormat] = useState("Zoom");
  const [message, setMessage] = useState(
    `Halo ${firstName}, kami ingin mengundangmu wawancara untuk posisi Senior Product Designer pada Kamis, 15 Oktober 2026 pukul 10.00 WIB lewat Zoom. Tautan rapat akan dikirim bersama undangan kalender.`,
  );

  const viewDate = new Date(2026, 9 + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = (viewDate.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  function selectDay(day: number) {
    setSelected(new Date(year, month, day));
  }

  return (
    <div className={styles.mainInner}>
      <Breadcrumbs
        items={[
          { label: "Pelamar", href: "/perekrut/pelamar" },
          {
            label: candidate.name,
            href: `/perekrut/pelamar/${candidate.slug}`,
          },
          { label: "Jadwalkan wawancara" },
        ]}
      />

      <PageHeading
        title="Jadwalkan wawancara"
        subtitle={`${candidate.name} · Senior Product Designer · kecocokan ${candidate.match}%`}
      />

      <div className={`${styles.contentGrid} ${styles.scheduleContent}`}>
        <div className={styles.leftColumn}>
          <section className={`${styles.card} ${styles.pickCard}`}>
            <h2 className={styles.cardTitle}>Pilih tanggal dan jam</h2>

            <div className={styles.scheduleGrid}>
              <div className={styles.calendar}>
                <div className={styles.calendarHead}>
                  <span className={styles.calendarMonth}>
                    {MONTHS[month]} {year}
                  </span>
                  <div className={styles.calendarNav}>
                    <button
                      type="button"
                      className={styles.calendarArrow}
                      aria-label="Bulan sebelumnya"
                      onClick={() => setMonthOffset((value) => value - 1)}
                    >
                      <ChevronLeftIcon size={16} />
                    </button>
                    <button
                      type="button"
                      className={styles.calendarArrow}
                      aria-label="Bulan berikutnya"
                      onClick={() => setMonthOffset((value) => value + 1)}
                    >
                      <ChevronRightIcon size={16} />
                    </button>
                  </div>
                </div>

                <div className={styles.calendarGrid}>
                  {DAY_LABELS.map((label) => (
                    <span key={label} className={styles.calendarDayName}>
                      {label}
                    </span>
                  ))}
                  {cells.map((day, index) =>
                    day ? (
                      <button
                        key={`${year}-${month}-${day}`}
                        type="button"
                        className={`${styles.calendarDay} ${
                          selected.getFullYear() === year &&
                          selected.getMonth() === month &&
                          selected.getDate() === day
                            ? styles.calendarDaySelected
                            : ""
                        }`}
                        aria-pressed={
                          selected.getFullYear() === year &&
                          selected.getMonth() === month &&
                          selected.getDate() === day
                        }
                        onClick={() => selectDay(day)}
                      >
                        {day}
                      </button>
                    ) : (
                      <span key={`blank-${index}`} aria-hidden="true" />
                    ),
                  )}
                </div>
              </div>

              <div className={styles.timeColumn}>
                <p className={styles.timeHeading}>{longDate(selected)}</p>
                <p className={styles.timeZone}>Zona waktu WIB</p>
                <div className={styles.timeSlots}>
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`${styles.timeSlot} ${
                        time === slot ? styles.timeSlotActive : ""
                      }`}
                      aria-pressed={time === slot}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className={`${styles.rightColumn} ${styles.scheduleRight}`}>
          <section className={`${styles.card} ${styles.interviewDetailCard}`}>
            <h2 className={styles.cardTitle}>Detail wawancara</h2>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="interviewer">
                Pewawancara utama
              </label>
              <input
                id="interviewer"
                className={styles.input}
                defaultValue="Dina Prameswari, Head of Design"
              />
            </div>

            <fieldset className={styles.formatField}>
              <legend className={styles.label}>Format</legend>
              <div className={styles.formatOptions}>
                {FORMATS.map((option) => (
                  <label
                    key={option}
                    className={`${styles.formatOption} ${
                      format === option ? styles.formatOptionActive : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={option}
                      checked={format === option}
                      onChange={() => setFormat(option)}
                    />
                    <span className={styles.radioDot} aria-hidden="true" />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="duration">
                Durasi
              </label>
              <input
                id="duration"
                className={styles.input}
                defaultValue="45 menit"
              />
            </div>
          </section>

          <section className={`${styles.card} ${styles.messageCard}`}>
            <h2 className={styles.cardTitle}>Pesan untuk pelamar</h2>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="interview-message">
                Isi undangan
              </label>
              <textarea
                id="interview-message"
                className={`${styles.textarea} ${styles.messageInput}`}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
          </section>
        </div>
      </div>

      <div className={styles.scheduleActions}>
        <ButtonLink
          href={`/perekrut/pelamar/${candidate.slug}`}
          variant="outline"
        >
          Batal
        </ButtonLink>
        <span className={styles.actionsSpacer} />
        <Button type="button" onClick={() => router.push("/perekrut/wawancara")}>
          Kirim undangan
        </Button>
      </div>
    </div>
  );
}
