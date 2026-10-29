"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/button/button";
import type { CompanyVerification } from "@/lib/data/company";
import { PageHeading } from "./dashboard-parts";
import styles from "./dashboard.module.css";

const SKILLS = ["Figma", "Design system", "UX research", "Prototyping"];

function toMillion(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) / 1_000_000 : null;
}

function salaryLabel(minimum: string, maximum: string) {
  const min = toMillion(minimum);
  const max = toMillion(maximum);
  const format = (value: number) =>
    value.toLocaleString("id-ID", { maximumFractionDigits: 1 });

  if (min !== null && max !== null) return `Rp ${format(min)} – ${format(max)} jt`;
  if (min !== null) return `Rp ${format(min)} jt`;
  if (max !== null) return `Rp ${format(max)} jt`;
  return "Gaji belum diisi";
}

export function PasangLowonganPage({
  verification,
}: {
  verification: CompanyVerification;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("Senior Product Designer");
  const [location, setLocation] = useState("Jakarta Selatan");
  const [workType, setWorkType] = useState("Hybrid · Penuh waktu");
  const [salaryMin, setSalaryMin] = useState("Rp 18.000.000");
  const [salaryMax, setSalaryMax] = useState("Rp 25.000.000");
  const [questions, setQuestions] = useState([
    "Berapa tahun pengalamanmu dengan design system?",
    "Bersediakah bekerja hybrid 3 hari per minggu?",
    "Ceritakan proyek desain yang paling kamu banggakan.",
  ]);

  const mode = workType.split("·")[0]?.trim() || "Hybrid";

  function updateQuestion(index: number, value: string) {
    setQuestions((current) =>
      current.map((question, position) => (position === index ? value : question)),
    );
  }

  function removeQuestion(index: number) {
    setQuestions((current) =>
      current.filter((_, position) => position !== index),
    );
  }

  return (
    <div className={styles.mainInner}>
      <PageHeading
        title="Pasang lowongan baru"
        subtitle="Isi detailnya. Pratinjau tampil di sisi kanan."
      />

      {verification !== "verified" ? (
        <section
          className={`${styles.card} ${styles.sideCard}`}
          aria-labelledby="verification-title"
        >
          <h2 id="verification-title" className={styles.cardTitle}>
            {verification === "pending"
              ? "Verifikasi sedang ditinjau"
              : "Verifikasi perusahaan dulu"}
          </h2>
          <p className={styles.cardText}>
            {verification === "pending"
              ? "Admin sedang memeriksa data perusahaan. Kamu bisa menyimpan draf, tapi belum bisa menerbitkan lowongan."
              : "Ajukan data perusahaan di halaman profil. Setelah terverifikasi, lowongan bisa diterbitkan."}
          </p>
          <div className={styles.formActions}>
            <ButtonLink
              href="/perekrut/profil-perusahaan"
              variant="outline"
            >
              {verification === "pending"
                ? "Lihat status verifikasi"
                : "Verifikasi perusahaan"}
            </ButtonLink>
          </div>
        </section>
      ) : null}

      <div className={styles.formGrid}>
        <form
          className={styles.formCard}
          onSubmit={(event) => {
            event.preventDefault();
            if (verification !== "verified") return;
            router.push("/perekrut/lowongan");
          }}
        >
          <h2 className={styles.cardTitle}>Detail lowongan</h2>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="job-title">
              Judul posisi
            </label>
            <input
              id="job-title"
              className={styles.input}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className={styles.twoCol}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="job-location">
                Lokasi
              </label>
              <input
                id="job-location"
                className={styles.input}
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="job-work-type">
                Tipe kerja
              </label>
              <input
                id="job-work-type"
                className={styles.input}
                value={workType}
                onChange={(event) => setWorkType(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.twoCol}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="job-salary-min">
                Gaji minimum per bulan
              </label>
              <input
                id="job-salary-min"
                className={styles.input}
                value={salaryMin}
                onChange={(event) => setSalaryMin(event.target.value)}
                inputMode="numeric"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="job-salary-max">
                Gaji maksimum per bulan
              </label>
              <input
                id="job-salary-max"
                className={styles.input}
                value={salaryMax}
                onChange={(event) => setSalaryMax(event.target.value)}
                inputMode="numeric"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="job-description">
              Deskripsi pekerjaan
            </label>
            <textarea
              id="job-description"
              className={styles.textarea}
              defaultValue="Kamu akan merancang alur belanja dan pembayaran untuk jutaan pengguna, memimpin design system, dan menjalankan uji coba pengguna setiap dua minggu."
            />
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Keahlian yang dibutuhkan</span>
            <div className={styles.chips}>
              {SKILLS.map((skill) => (
                <span key={skill} className={styles.chip}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Pertanyaan untuk pelamar</span>
            <div className={styles.questions}>
              {questions.map((question, index) => (
                <div key={index} className={styles.questionRow}>
                  <span className={styles.questionNumber}>{index + 1}</span>
                  <input
                    className={styles.questionInput}
                    value={question}
                    aria-label={`Pertanyaan ${index + 1}`}
                    onChange={(event) => updateQuestion(index, event.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.removeQuestion}
                    aria-label={`Hapus pertanyaan ${index + 1}`}
                    onClick={() => removeQuestion(index)}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className={styles.addQuestion}
              onClick={() =>
                setQuestions((current) => [...current, "Pertanyaan baru"])
              }
            >
              Tambah pertanyaan
            </button>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="job-closed">
              Tanggal ditutup
            </label>
            <input
              id="job-closed"
              className={styles.input}
              defaultValue="30 Oktober 2026"
            />
          </div>

          <div className={styles.formActions}>
            <ButtonLink href="/perekrut/lowongan" variant="outline">
              Batal
            </ButtonLink>
            <span className={styles.actionsSpacer} />
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/perekrut/lowongan")}
            >
              Simpan draf
            </Button>
            <Button type="submit" disabled={verification !== "verified"}>
              Terbitkan lowongan
            </Button>
          </div>
        </form>

        <div className={styles.rightColumn}>
          <section className={`${styles.card} ${styles.sideCard}`}>
            <h2 className={styles.cardTitle}>Pratinjau</h2>
            <div className={styles.previewTop}>
              <span className={styles.previewLogo} aria-hidden="true">
                TL
              </span>
              <div className={styles.previewText}>
                <span className={styles.previewTitle}>
                  {title || "Judul posisi"}
                </span>
                <span className={styles.previewMeta}>
                  Tokoloka · {location || "Lokasi"} · {mode}
                </span>
              </div>
            </div>
            <div className={styles.previewTags}>
              <span className={`${styles.tag} ${styles.tagMint}`}>
                {salaryLabel(salaryMin, salaryMax)}
              </span>
              <span className={`${styles.tag} ${styles.tagMuted}`}>Figma</span>
              <span className={`${styles.tag} ${styles.tagMuted}`}>
                Design system
              </span>
            </div>
          </section>

          <section className={`${styles.card} ${styles.sideCard}`}>
            <h2 className={styles.cardTitle}>Perkiraan jangkauan</h2>
            <p className={styles.reachValue}>1.800 pencari kerja</p>
            <p className={styles.cardText}>
              dengan profil yang cocok akan melihat lowongan ini dalam 30 hari.
            </p>
          </section>

          <section className={`${styles.card} ${styles.sideCard}`}>
            <h2 className={styles.cardTitle}>Paket Pro</h2>
            <p className={styles.price}>Rp 1.500.000 untuk 30 hari</p>
            <p className={styles.cardText}>
              Pencocokan otomatis, lowongan ditonjolkan, dan penjadwalan
              wawancara.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
