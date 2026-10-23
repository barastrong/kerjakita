import { CheckIcon } from "@/components/ui/icons/icons";
import styles from "./recruiter-page.module.css";

const FEATURES = [
  {
    title: "Pencocokan otomatis",
    text: "Setiap pelamar diberi skor kecocokan berdasarkan keahlian dan pengalaman yang diminta.",
  },
  {
    title: "Dashboard pelamar",
    text: "Pantau pelamar per tahap dari terkirim sampai penawaran, lengkap dengan catatan tim.",
  },
  {
    title: "Penjadwalan wawancara",
    text: "Kirim undangan, sinkronkan kalender, dan kirim pengingat otomatis ke kandidat.",
  },
] as const;

export function RecruiterFeatures() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Semua alat rekrutmen di satu tempat</h2>
      <ul className={styles.featureGrid}>
        {FEATURES.map((feature) => (
          <li key={feature.title} className={styles.featureCard}>
            <span className={styles.featureIcon} aria-hidden="true">
              <CheckIcon size={20} />
            </span>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureText}>{feature.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
