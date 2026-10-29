"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { CheckIcon } from "@/components/ui/icons/icons";
import dashboardStyles from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import { ApplicantHeading, CompanyMark } from "./applicant-parts";
import styles from "./applicant.module.css";

const DAYS = [
  { day: "Sen", date: 12 },
  { day: "Sel", date: 13 },
  { day: "Rab", date: 14 },
  { day: "Kam", date: 15, schedule: "1 jadwal" },
  { day: "Jum", date: 16 },
  { day: "Sab", date: 17 },
  { day: "Min", date: 18 },
];

const CHECKLIST = [
  { label: "Pelajari produk dan misi Nawasehat", done: true },
  { label: "Pilih 2 studi kasus dari portofolio", done: true },
  { label: "Siapkan pertanyaan untuk tim desain", done: false },
  { label: "Tes koneksi dan kamera Zoom", done: false },
  { label: "Siapkan jawaban gaji dan tanggal mulai", done: false },
];

export function WawancaraPage() {
  const [selectedDate, setSelectedDate] = useState(15);
  const [checklist, setChecklist] = useState(CHECKLIST);

  function toggleChecklist(index: number) {
    setChecklist((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, done: !item.done } : item,
      ),
    );
  }

  return (
    <div className={dashboardStyles.mainInner}>
      <ApplicantHeading
        title="Wawancara"
        subtitle="Satu wawancara terjadwal minggu ini."
        action={
          <Button type="button" size="sm" className={styles.headerButton}>
            Tambah ke kalender
          </Button>
        }
      />

      <section className={styles.weekCard}>
        <div className={styles.weekStrip}>
          {DAYS.map((item) => (
            <button
              key={item.date}
              type="button"
              className={`${styles.dayButton} ${
                selectedDate === item.date ? styles.dayActive : ""
              }`}
              aria-pressed={selectedDate === item.date}
              onClick={() => setSelectedDate(item.date)}
            >
              <span className={styles.dayName}>{item.day}</span>
              <span className={styles.dayNumber}>{item.date}</span>
              {item.schedule ? (
                <span className={styles.daySchedule}>{item.schedule}</span>
              ) : null}
            </button>
          ))}
        </div>
      </section>

      <div className={styles.interviewPageGrid}>
        <div className={styles.profileMain}>
          <section className={styles.interviewDetailCard}>
            {selectedDate === 15 ? (
              <>
                <h2 className={styles.interviewTitle}>
                  Lead Designer · Nawasehat
                </h2>
                <div className={styles.interviewFacts}>
                  <div className={styles.fact}>
                    <p className={styles.factLabel}>Waktu</p>
                    <p className={styles.factValue}>Kamis 15 Okt, 10.00 WIB</p>
                  </div>
                  <div className={styles.fact}>
                    <p className={styles.factLabel}>Format</p>
                    <p className={styles.factValue}>Zoom</p>
                  </div>
                  <div className={styles.fact}>
                    <p className={styles.factLabel}>Durasi</p>
                    <p className={styles.factValue}>45 menit</p>
                  </div>
                  <div className={styles.fact}>
                    <p className={styles.factLabel}>Pewawancara</p>
                    <p className={styles.factValue}>
                      Dina P., Head of Design
                    </p>
                  </div>
                </div>
                <div className={styles.interviewActions}>
                  <Button type="button" size="sm">
                    Gabung rapat
                  </Button>
                  <Button type="button" variant="outline" size="sm">
                    Jadwalkan ulang
                  </Button>
                </div>
              </>
            ) : (
              <p className={styles.statusEmpty}>
                Tidak ada wawancara pada tanggal ini.
              </p>
            )}
          </section>

          <section className={styles.prepCard}>
            <h2 className={styles.prepTitle}>Persiapan</h2>
            <div className={styles.checklist}>
              {checklist.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  className={`${styles.checklistButton} ${
                    item.done ? styles.checklistDone : ""
                  }`}
                  aria-pressed={item.done}
                  onClick={() => toggleChecklist(index)}
                >
                  <span
                    className={`${styles.checkCircle} ${
                      item.done ? styles.checkCircleDone : ""
                    }`}
                  >
                    {item.done ? <CheckIcon size={12} /> : null}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.profileSide}>
          <section className={styles.tipsCard}>
            <h2 className={styles.tipsTitle}>Tips untuk wawancara ini</h2>
            <ul className={styles.tipsList}>
              <li>
                Mereka bergerak di bidang kesehatan, jadi siapkan contoh desain
                yang melibatkan data sensitif.
              </li>
              <li>Tunjukkan proses, bukan hanya hasil akhir.</li>
              <li>Tanyakan bagaimana tim desain bekerja dengan engineer.</li>
            </ul>
          </section>

          <section className={styles.historyCard}>
            <h2 className={styles.historyTitle}>Riwayat wawancara</h2>
            <div className={styles.historyList}>
              <div className={styles.historyRow}>
                <CompanyMark initials="DG" color="#0b7a62" size="sm" />
                <div className={styles.historyText}>
                  <p className={styles.historyName}>Dagangin</p>
                  <p className={styles.historyMeta}>
                    22 Sep · Tidak lanjut
                  </p>
                </div>
              </div>
              <div className={styles.historyRow}>
                <CompanyMark initials="PT" color="#6d28d9" size="sm" />
                <div className={styles.historyText}>
                  <p className={styles.historyName}>Pintarta</p>
                  <p className={styles.historyMeta}>
                    16 Sep · Tidak lanjut
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
