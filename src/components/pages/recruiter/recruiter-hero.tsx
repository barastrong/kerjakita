import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import styles from "./recruiter-page.module.css";

const CANDIDATES = [
  {
    initials: "RA",
    name: "Rani Ayu P.",
    meta: "4 tahun · Surabaya",
    focus: "Design system",
    score: 92,
    tone: "avatarAccent",
  },
  {
    initials: "DP",
    name: "Dimas P.",
    meta: "6 tahun · Jakarta",
    focus: "Riset pengguna",
    score: 89,
    tone: "avatarMint",
  },
  {
    initials: "SN",
    name: "Salsa N.",
    meta: "5 tahun · Remote",
    focus: "Prototyping",
    score: 85,
    tone: "avatarInk",
  },
] as const;

const PIPELINE = [
  { value: "24", label: "Terkirim" },
  { value: "18", label: "Dilihat" },
  { value: "6", label: "Wawancara" },
] as const;

export function RecruiterHero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/perekrut-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <p className={`${styles.kicker} ${styles.kickerOnDark}`}>
            Untuk tim rekrutmen
          </p>
          <h1 className={styles.heroTitle}>
            Temukan kandidat yang cocok lebih cepat.
          </h1>
          <p className={styles.heroSubtitle}>
            Pasang lowongan, biarkan pencocokan otomatis menyusun kandidat
            terbaik, lalu jadwalkan wawancara dari satu dashboard.
          </p>
          <div className={styles.heroActions}>
            <ButtonLink href="/masuk" size="lg">
              Pasang lowongan
            </ButtonLink>
            <ButtonLink href="#harga" variant="outline" size="lg">
              Lihat harga
            </ButtonLink>
          </div>
          <p className={styles.heroNote}>
            Lowongan pertama gratis. Tanpa kartu kredit.
          </p>
        </div>

        <aside
          className={styles.candidateCard}
          aria-label="Contoh kandidat teratas"
        >
          <div className={styles.candidateHead}>
            <div>
              <p className={styles.candidateLabel}>Kandidat teratas</p>
              <p className={styles.candidateRole}>Senior Product Designer</p>
            </div>
            <span className={styles.exampleTag}>Contoh data</span>
          </div>

          <ul className={styles.candidateList}>
            {CANDIDATES.map((candidate) => (
              <li key={candidate.name} className={styles.candidate}>
                <span
                  className={`${styles.candidateAvatar} ${
                    styles[candidate.tone]
                  }`}
                  aria-hidden="true"
                >
                  {candidate.initials}
                </span>
                <span className={styles.candidateInfo}>
                  <span className={styles.candidateName}>{candidate.name}</span>
                  <span className={styles.candidateMeta}>{candidate.meta}</span>
                  <span className={styles.candidateSkill}>
                    {candidate.focus}
                  </span>
                </span>
                <span className={styles.candidateScoreWrap}>
                  <span className={styles.candidateScore}>
                    {candidate.score}%
                  </span>
                  <span className={styles.candidateBar} aria-hidden="true">
                    <i style={{ width: `${candidate.score}%` }} />
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.candidateFoot}>
            <p className={styles.candidateFootLabel}>Pipeline saat ini</p>
            <div className={styles.candidateFootStats}>
              {PIPELINE.map((item) => (
                <span key={item.label} className={styles.pipelineStat}>
                  <b>{item.value}</b>
                  <span>{item.label}</span>
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
