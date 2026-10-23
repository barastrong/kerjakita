import styles from "./recruiter-page.module.css";

const STATS = [
  { value: "2,4 juta", label: "pencari kerja terdaftar" },
  { value: "14 hari", label: "rata-rata waktu mengisi posisi" },
  { value: "3 klik", label: "dari lowongan ke jadwal wawancara" },
] as const;

export function RecruiterStats() {
  return (
    <ul className={styles.stats} aria-label="Statistik Kerjakita">
      {STATS.map((stat) => (
        <li key={stat.value} className={styles.stat}>
          <span className={styles.statValue}>{stat.value}</span>
          <span className={styles.statLabel}>{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}
