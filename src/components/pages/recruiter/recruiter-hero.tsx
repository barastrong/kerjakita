import { ButtonLink } from "@/components/ui/button";
import styles from "./recruiter-page.module.css";

const CANDIDATES = [
  {
    initials: "RA",
    name: "Rani Ayu P.",
    meta: "4 tahun · Surabaya",
    score: "92%",
    tone: "avatarAccent",
  },
  {
    initials: "DP",
    name: "Dimas P.",
    meta: "6 tahun · Jakarta",
    score: "89%",
    tone: "avatarMint",
  },
  {
    initials: "SN",
    name: "Salsa N.",
    meta: "5 tahun · Remote",
    score: "85%",
    tone: "avatarPurple",
  },
] as const;

export function RecruiterHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Temukan kandidat yang cocok lebih cepat.
        </h1>
        <p className={styles.heroSubtitle}>
          Pasang lowongan, biarkan pencocokan otomatis menyusun kandidat terbaik,
          lalu jadwalkan wawancara dari satu dashboard.
        </p>
        <div className={styles.heroActions}>
          <ButtonLink href="/masuk" size="lg">
            Pasang lowongan
          </ButtonLink>
          <ButtonLink href="/masuk" variant="outline" size="lg">
            Jadwalkan demo
          </ButtonLink>
        </div>
      </div>

      <aside className={styles.candidateCard} aria-label="Contoh kandidat teratas">
        <p className={styles.candidateTitle}>
          Kandidat teratas · Senior Product Designer
        </p>
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
              </span>
              <span className={styles.candidateScore}>{candidate.score}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
