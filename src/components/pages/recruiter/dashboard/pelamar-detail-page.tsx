"use client";

import { useState, type FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/button/button";
import { CheckIcon } from "@/components/ui/icons/icons";
import { Avatar, Breadcrumbs } from "./dashboard-parts";
import { getCandidate } from "./pelamar-data";
import styles from "./dashboard.module.css";

const SKILLS = [
  { label: "Figma", level: "Ahli", width: 100, tone: "green" },
  { label: "Design system", level: "Kuat", width: 89, tone: "green" },
  { label: "UX research", level: "Baik", width: 73, tone: "green" },
  { label: "Data analitik", level: "Kurang", width: 40, tone: "yellow" },
];

const EXPERIENCE = [
  {
    logo: "KS",
    color: "#c2410c",
    role: "Product Designer",
    company: "Kopi Sinar Digital",
    period: "Jan 2024 – sekarang",
    description:
      "Merancang aplikasi pemesanan untuk 120 gerai dan memimpin migrasi design system.",
  },
  {
    logo: "SL",
    color: "#101a3a",
    role: "UI Designer",
    company: "Studio Lokal",
    period: "Jun 2022 – Des 2023",
    description: "Mengerjakan identitas digital dan situs untuk klien UMKM.",
  },
];

const QUESTIONS = [
  {
    question: "Berapa tahun pengalamanmu dengan design system?",
    answer: "3 – 5 tahun",
  },
  {
    question: "Bersediakah bekerja hybrid 3 hari per minggu?",
    answer: "Ya, bersedia",
  },
  {
    question: "Ceritakan proyek desain yang paling kamu banggakan.",
    answer:
      "Memimpin migrasi design system untuk 120 gerai. Waktu rilis fitur turun dari 3 minggu menjadi 1 minggu.",
  },
];

const NOTES = [
  {
    author: "Dina · Head of Design",
    body: "Studi kasus design system sangat kuat.",
  },
  {
    author: "Rina · HR",
    body: "Ekspektasi gaji Rp 20 jt masih dalam rentang.",
  },
];

export function PelamarDetailPage({ slug }: { slug: string }) {
  const candidate = getCandidate(slug);
  const [decision, setDecision] = useState<"Baru" | "Ditolak">("Baru");
  const [notes, setNotes] = useState(NOTES);
  const [note, setNote] = useState("");
  const firstName = candidate.fullName.split(" ")[0];

  function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = note.trim();

    if (!value) return;

    setNotes((current) => [...current, { author: "Dewi · Admin", body: value }]);
    setNote("");
  }

  return (
    <div className={styles.mainInner}>
      <Breadcrumbs
        items={[
          { label: "Pelamar", href: "/perekrut/pelamar" },
          { label: "Senior Product Designer" },
          { label: candidate.name },
        ]}
      />

      <div className={styles.contentGrid}>
        <div className={styles.leftColumn}>
          <section className={`${styles.card} ${styles.applicantCard}`}>
            <div className={styles.applicantProfile}>
              <Avatar
                initials={candidate.initials}
                color={candidate.color}
                size="lg"
              />
              <div className={styles.applicantIdentity}>
                <h1 className={styles.applicantName}>{candidate.fullName}</h1>
                <p className={styles.applicantMeta}>
                  {candidate.role} · {candidate.location} · {candidate.years}{" "}
                  pengalaman
                </p>
                <div className={styles.applicantTags}>
                  <span className={`${styles.tag} ${styles.tagMint}`}>
                    Terbuka untuk pekerjaan
                  </span>
                  <span className={`${styles.tag} ${styles.tagMuted}`}>
                    Hybrid atau remote
                  </span>
                </div>
              </div>
              <div className={styles.applicantMatch}>
                <span className={styles.matchBig}>{candidate.match}%</span>
                <span className={styles.matchBigLabel}>kecocokan</span>
              </div>
            </div>
          </section>

          <section className={`${styles.card} ${styles.detailCard}`}>
            <h2 className={styles.cardTitle}>Kecocokan dengan lowongan</h2>
            <div className={styles.skillList}>
              {SKILLS.map((skill) => (
                <div key={skill.label} className={styles.skillRow}>
                  <span className={styles.skillLabel}>{skill.label}</span>
                  <span className={styles.skillTrack}>
                    <span
                      className={`${styles.skillFill} ${
                        skill.tone === "yellow" ? styles.skillFillYellow : ""
                      }`}
                      style={{ width: `${skill.width}%` }}
                    />
                  </span>
                  <span className={styles.skillValue}>{skill.level}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={`${styles.card} ${styles.detailCard}`}>
            <h2 className={styles.cardTitle}>Pengalaman</h2>
            <div className={styles.experienceList}>
              {EXPERIENCE.map((item) => (
                <div key={item.company} className={styles.experienceItem}>
                  <span
                    className={styles.experienceLogo}
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  >
                    {item.logo}
                  </span>
                  <div className={styles.experienceText}>
                    <p className={styles.experienceRole}>
                      {item.role} · {item.company}
                    </p>
                    <p className={styles.experiencePeriod}>{item.period}</p>
                    <p className={styles.experienceDescription}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={`${styles.card} ${styles.detailCard}`}>
            <h2 className={styles.cardTitle}>Jawaban pertanyaan</h2>
            <div className={styles.answerList}>
              {QUESTIONS.map((item) => (
                <div key={item.question} className={styles.answerItem}>
                  <p className={styles.answerQuestion}>{item.question}</p>
                  <p className={styles.answerText}>{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={`${styles.card} ${styles.detailCard}`}>
            <h2 className={styles.cardTitle}>CV dan portofolio</h2>
            <div className={styles.fileList}>
              <div className={styles.fileRow}>
                <div className={styles.fileText}>
                  <span className={styles.fileName}>CV_{firstName}_2026.pdf</span>
                  <span className={styles.fileMeta}>
                    Diunggah 3 Okt 2026 · 214 KB
                  </span>
                </div>
                <button type="button" className={styles.fileAction}>
                  Unduh
                </button>
              </div>
              <div className={styles.fileRow}>
                <div className={styles.fileText}>
                  <span className={styles.fileName}>
                    behance.net/{firstName.toLowerCase()}-desain
                  </span>
                  <span className={styles.fileMeta}>Portofolio</span>
                </div>
                <button type="button" className={styles.fileAction}>
                  Buka
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={`${styles.card} ${styles.decisionCard}`}>
            <h2 className={styles.cardTitle}>Keputusan</h2>
            <div className={styles.decisionStatus}>
              <span className={styles.decisionLabel}>Status saat ini</span>
              <span
                className={`${styles.tag} ${
                  decision === "Baru" ? styles.tagYellow : styles.tagMuted
                }`}
              >
                {decision}
              </span>
            </div>

            <ButtonLink
              href={`/perekrut/pelamar/${candidate.slug}/jadwalkan-wawancara`}
              className={styles.fullButton}
            >
              Setujui dan jadwalkan wawancara
            </ButtonLink>
            <Button
              type="button"
              variant="outline"
              className={styles.fullButton}
              onClick={() => setDecision("Ditolak")}
            >
              Tolak
            </Button>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="reject-reason">
                Alasan (opsional, tidak dikirim ke pelamar)
              </label>
              <select id="reject-reason" className={styles.input} defaultValue="">
                <option value="">Pilih alasan</option>
                <option>Kualifikasi belum sesuai</option>
                <option>Pengalaman kurang</option>
                <option>Kandidat cocok untuk posisi lain</option>
              </select>
            </div>
          </section>

          <section className={`${styles.card} ${styles.historyCard}`}>
            <h2 className={styles.cardTitle}>Riwayat</h2>
            <div className={styles.historyList}>
              <div className={styles.historyItem}>
                <span className={styles.historyDone}>
                  <CheckIcon size={12} />
                </span>
                <div className={styles.historyText}>
                  <span className={styles.historyName}>Lamaran masuk</span>
                  <span className={styles.historyMeta}>14 Okt 2026 · 08.12</span>
                </div>
              </div>
              <div className={styles.historyItem}>
                <span className={styles.historyDone}>
                  <CheckIcon size={12} />
                </span>
                <div className={styles.historyText}>
                  <span className={styles.historyName}>Dilihat Rina (HR)</span>
                  <span className={styles.historyMeta}>14 Okt 2026 · 09.03</span>
                </div>
              </div>
              <div className={styles.historyItem}>
                <span className={styles.historyPending} aria-hidden="true" />
                <div className={styles.historyText}>
                  <span className={styles.historyName}>Menunggu keputusan</span>
                  <span className={styles.historyMeta}>Perlu ditinjau</span>
                </div>
              </div>
            </div>
          </section>

          <section className={`${styles.card} ${styles.notesCard}`}>
            <h2 className={styles.cardTitle}>Catatan tim</h2>
            <div className={styles.noteList}>
              {notes.map((item) => (
                <div key={`${item.author}-${item.body}`} className={styles.noteBubble}>
                  <span className={styles.noteAuthor}>{item.author}</span>
                  <p className={styles.noteBody}>{item.body}</p>
                </div>
              ))}
            </div>

            <form className={styles.noteForm} onSubmit={addNote}>
              <label className={styles.label} htmlFor="team-note">
                Tambah catatan
              </label>
              <input
                id="team-note"
                className={styles.input}
                placeholder="Tulis catatan untuk tim"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
