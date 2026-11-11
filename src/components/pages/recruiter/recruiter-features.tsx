import {
  MailIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/icons/icons";
import styles from "./recruiter-page.module.css";

const FEATURES = [
  {
    icon: SearchIcon,
    title: "Pencocokan otomatis",
    text: "Setiap pelamar diberi skor kecocokan berdasarkan keahlian dan pengalaman yang diminta.",
  },
  {
    icon: UserIcon,
    title: "Dashboard pelamar",
    text: "Pantau pelamar per tahap dari terkirim sampai penawaran, lengkap dengan catatan tim.",
  },
  {
    icon: MailIcon,
    title: "Penjadwalan wawancara",
    text: "Kirim undangan, sinkronkan kalender, dan kirim pengingat otomatis ke kandidat.",
  },
] as const;

const STAGES = [
  {
    label: "Terkirim",
    count: "24",
    chips: [
      { initials: "RA", score: 92 },
      { initials: "DP", score: 89 },
      { initials: "SN", score: 85 },
    ],
    more: "+21",
  },
  {
    label: "Dilihat",
    count: "18",
    chips: [
      { initials: "RA", score: 92 },
      { initials: "DP", score: 89 },
      { initials: "SN", score: 85 },
    ],
    more: "+15",
  },
  {
    label: "Wawancara",
    count: "6",
    chips: [
      { initials: "RA", score: 92 },
      { initials: "DP", score: 89 },
    ],
    more: "+4",
  },
] as const;

export function RecruiterFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresIntro}>
        <p className={styles.kicker}>Alur kerja</p>
        <h2 className={styles.sectionTitle}>
          Semua alat rekrutmen di satu tempat
        </h2>
        <p className={styles.sectionText}>
          Dari lowongan tayang sampai keputusan akhir, tanpa pindah tab atau
          spreadsheet.
        </p>
      </div>

      <ul className={styles.featureList}>
        {FEATURES.map((feature) => {
          const Icon = feature.icon;

          return (
            <li key={feature.title} className={styles.featureRow}>
              <span className={styles.featureIcon} aria-hidden="true">
                <Icon size={20} />
              </span>
              <div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        className={styles.pipeline}
        role="img"
        aria-label="Contoh pipeline kandidat untuk Senior Product Designer"
      >
        <div className={styles.pipelineHead}>
          <p className={styles.pipelineTitle}>
            Pipeline · Senior Product Designer
          </p>
          <span className={styles.pipelineTag}>Contoh data</span>
        </div>

        <div className={styles.pipelineStages}>
          {STAGES.map((stage) => (
            <div key={stage.label} className={styles.stage}>
              <div className={styles.stageHead}>
                <span className={styles.stageLabel}>{stage.label}</span>
                <span className={styles.stageCount}>{stage.count}</span>
              </div>
              <div className={styles.stageChips} aria-hidden="true">
                {stage.chips.map((chip) => (
                  <span
                    key={`${stage.label}-${chip.initials}`}
                    className={styles.chip}
                  >
                    {chip.initials}
                    <b>{chip.score}</b>
                  </span>
                ))}
                <span className={styles.chipMore}>{stage.more}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
