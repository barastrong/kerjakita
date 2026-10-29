import { Button } from "@/components/ui/button/button";
import { CheckIcon } from "@/components/ui/icons/icons";
import dashboardStyles from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import { ApplicantHeading, CompanyMark } from "./applicant-parts";
import styles from "./applicant.module.css";

const SKILLS = [
  "Figma · Ahli",
  "Design system · Kuat",
  "Prototyping · Kuat",
  "UX research · Baik",
  "Data analitik · Pemula",
];

const EXPERIENCES = [
  {
    initials: "KS",
    color: "#b45309",
    role: "Product Designer · Kopi Sinar Digital",
    period: "Jan 2024 – sekarang · 2 tahun 9 bulan",
    description:
      "Merancang aplikasi pemesanan untuk 120 gerai dan memimpin migrasi design system.",
  },
  {
    initials: "SL",
    color: "#1f2937",
    role: "UI Designer · Studio Lokal",
    period: "Jun 2022 – Des 2023 · 1 tahun 7 bulan",
    description: "Mengerjakan identitas digital dan situs untuk klien UMKM.",
  },
];

const SUGGESTIONS = [
  { label: "Foto profil", done: true },
  { label: "CV diunggah", done: true },
  { label: "Minimal 5 keahlian", done: true },
  { label: "Tambahkan sertifikat", done: false },
  { label: "Tautan LinkedIn", done: false },
];

const CVS = [
  { name: "CV_Rani_2026.pdf", meta: "Utama · 3 Okt 2026" },
  { name: "CV_Rani_Desain.pdf", meta: "12 Agu 2026" },
];

export function ProfilPage() {
  return (
    <div className={dashboardStyles.mainInner}>
      <ApplicantHeading
        title="Profil dan CV"
        subtitle="Perekrut melihat profil ini saat kamu melamar."
        action={
          <Button type="button" size="sm" className={styles.headerButton}>
            Pratinjau profil
          </Button>
        }
      />

      <div className={styles.profileGrid}>
        <div className={styles.profileMain}>
          <section className={styles.profileCard}>
            <span className={styles.profileAvatar} aria-hidden="true">
              R
            </span>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>Rani Ayu Pratama</h2>
              <p className={styles.profileMeta}>
                Product Designer · Surabaya · 4 tahun pengalaman
              </p>
              <div className={styles.profileTags}>
                <span className={`${styles.profileTag} ${styles.profileTagOpen}`}>
                  Terbuka untuk pekerjaan
                </span>
                <span className={styles.profileTag}>Hybrid atau remote</span>
              </div>
            </div>
            <div className={styles.profileActions}>
              <Button type="button" variant="outline" size="sm">
                Edit profil
              </Button>
            </div>
          </section>

          <section className={styles.skillCard}>
            <h2 className={styles.cardTitle}>Keahlian</h2>
            <div className={styles.skillTags}>
              {SKILLS.map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={styles.skillButton}
            >
              Tambah keahlian
            </Button>
          </section>

          <section className={styles.experienceCard}>
            <h2 className={styles.cardTitle}>Pengalaman kerja</h2>
            <div className={styles.experienceList}>
              {EXPERIENCES.map((experience) => (
                <div key={experience.role} className={styles.experienceRow}>
                  <CompanyMark
                    initials={experience.initials}
                    color={experience.color}
                  />
                  <div className={styles.expText}>
                    <p className={styles.expTitle}>{experience.role}</p>
                    <p className={styles.expMeta}>{experience.period}</p>
                    <p className={styles.expDesc}>{experience.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.educationCard}>
            <h2 className={styles.cardTitle}>Pendidikan</h2>
            <p className={styles.eduTitle}>
              S1 Desain Komunikasi Visual · Universitas Surya Nusa
            </p>
            <p className={styles.eduMeta}>2018 – 2022 · IPK 3,64</p>
          </section>
        </div>

        <div className={styles.profileSide}>
          <section className={styles.sideCard}>
            <h2 className={styles.sideTitle}>Saran untuk naik ke 90%</h2>
            <div className={styles.suggestionList}>
              {SUGGESTIONS.map((suggestion) => (
                <div key={suggestion.label} className={styles.suggestionItem}>
                  <span
                    className={`${styles.checkCircle} ${
                      suggestion.done ? styles.checkCircleDone : ""
                    }`}
                  >
                    {suggestion.done ? <CheckIcon size={12} /> : null}
                  </span>
                  <span className={suggestion.done ? styles.suggestionDone : ""}>
                    {suggestion.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.sideCard}>
            <h2 className={styles.sideTitle}>CV saya</h2>
            <div className={styles.cvList}>
              {CVS.map((cv) => (
                <div key={cv.name} className={styles.cvItem}>
                  <div>
                    <p className={styles.cvName}>{cv.name}</p>
                    <p className={styles.cvMeta}>{cv.meta}</p>
                  </div>
                  <span className={styles.cvLink}>Lihat</span>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={styles.cvButton}
            >
              Unggah CV baru
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
