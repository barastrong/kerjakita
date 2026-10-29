import Link from "next/link";
import { ButtonLink } from "@/components/ui/button/button";
import dashboardStyles from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import { ApplicantHeading, CompanyMark } from "./applicant-parts";
import styles from "./applicant.module.css";

const STATS = [
  { value: 4, label: "Lamaran aktif" },
  { value: 1, label: "Dilihat perekrut" },
  { value: 1, label: "Wawancara terjadwal" },
  { value: 12, label: "Lowongan tersimpan" },
];

type StatusColumn = {
  title: string;
  count: number;
  jobs: {
    role: string;
    company: string;
    status: string;
    tone: "muted" | "mint" | "yellow";
  }[];
  empty?: string;
};

const STATUS_COLUMNS: StatusColumn[] = [
  {
    title: "Terkirim",
    count: 2,
    jobs: [
      {
        role: "Senior Product Designer",
        company: "Tokoloka",
        status: "Dikirim hari ini",
        tone: "muted",
      },
      {
        role: "Product Designer, Pembayaran",
        company: "Bayarpintar",
        status: "Dikirim 3 hari lalu",
        tone: "muted",
      },
    ],
  },
  {
    title: "Dilihat perekrut",
    count: 1,
    jobs: [
      {
        role: "UI/UX Designer",
        company: "Kopi Sinar Digital",
        status: "Dilihat kemarin",
        tone: "mint",
      },
    ],
  },
  {
    title: "Wawancara",
    count: 1,
    jobs: [
      {
        role: "Lead Designer",
        company: "Nawasehat",
        status: "Kamis 15 Okt, 10.00",
        tone: "yellow",
      },
    ],
  },
  {
    title: "Penawaran",
    count: 0,
    jobs: [],
    empty: "Belum ada penawaran. Lanjutkan melamar dan siapkan wawancara.",
  },
  {
    title: "Tidak lanjut",
    count: 3,
    jobs: [
      {
        role: "Product Designer (Kontrak)",
        company: "Garuda Retail Tech",
        status: "Tidak lanjut 28 Sep",
        tone: "muted",
      },
      {
        role: "UX Designer",
        company: "Dagangin",
        status: "Tidak lanjut 20 Sep",
        tone: "muted",
      },
      {
        role: "Design Researcher",
        company: "Pintarta",
        status: "Ditarik 14 Sep",
        tone: "muted",
      },
    ],
  },
];

const RECOMMENDATIONS = [
  {
    initials: "DG",
    color: "#0b7a62",
    role: "Senior UX Designer",
    company: "Dagangin · Remote",
    match: 88,
  },
  {
    initials: "LK",
    color: "#b45309",
    role: "Product Designer",
    company: "Lokalkarya · Jakarta",
    match: 84,
  },
  {
    initials: "PT",
    color: "#6d28d9",
    role: "Design Lead",
    company: "Pintarta · Surabaya",
    match: 79,
  },
];

export function RingkasanPage() {
  return (
    <div className={dashboardStyles.mainInner}>
      <ApplicantHeading
        title="Halo, Rani"
        subtitle="Kamis besok kamu punya satu wawancara. Siapkan portofolio terbaikmu."
        action={
          <ButtonLink
            href="/lowongan"
            size="sm"
            className={styles.headerButton}
          >
            Cari lowongan baru
          </ButtonLink>
        }
      />

      <section className={styles.companyBanner}>
        <span className={styles.bannerIcon} aria-hidden="true">
          <span className={styles.bannerGlyph} />
        </span>
        <div className={styles.bannerText}>
          <h2 className={styles.bannerTitle}>
            Punya perusahaan? Pasang lowongan di Kerjakita
          </h2>
          <p className={styles.bannerCopy}>
            Ajukan akun perusahaan untuk memasang lowongan dan mengelola
            pelamar. Tim kami memverifikasi dalam 1–3 hari kerja.
          </p>
        </div>
        <span className={styles.freeBadge}>Gratis diajukan</span>
        <ButtonLink
          href="/perekrut/profil-perusahaan"
          size="sm"
          className={styles.headerButton}
        >
          Daftarkan perusahaan
        </ButtonLink>
      </section>

      <div className={styles.statsGrid}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>

      <section className={styles.statusCard}>
        <h2 className={styles.cardTitle}>Status lamaran</h2>
        <div className={styles.statusBoard}>
          {STATUS_COLUMNS.map((column) => (
            <div key={column.title} className={styles.statusColumn}>
              <div className={styles.statusColumnHead}>
                <h3 className={styles.statusColumnTitle}>{column.title}</h3>
                <span className={styles.statusCount}>{column.count}</span>
              </div>
              <div className={styles.statusColumnBody}>
                {column.jobs.length === 0 ? (
                  <p className={styles.statusEmpty}>{column.empty}</p>
                ) : (
                  column.jobs.map((job) => (
                    <div key={`${job.role}-${job.company}`} className={styles.statusJob}>
                      <p className={styles.statusJobTitle}>{job.role}</p>
                      <p className={styles.statusJobCompany}>{job.company}</p>
                      <span
                        className={`${styles.statusPill} ${
                          job.tone === "mint"
                            ? styles.statusPillMint
                            : job.tone === "yellow"
                              ? styles.statusPillYellow
                              : styles.statusPillMuted
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.bottomGrid}>
        <section className={styles.interviewCard}>
          <h2 className={styles.cardTitle}>Jadwal wawancara</h2>
          <div className={styles.interviewList}>
            <div className={styles.interviewRow}>
              <span className={styles.dateTile}>
                <span className={styles.dateTileDay}>Kam</span>
                <span className={styles.dateTileNumber}>15</span>
              </span>
              <div className={styles.interviewText}>
                <p className={styles.interviewName}>
                  Lead Designer · Nawasehat
                </p>
                <p className={styles.interviewMeta}>
                  10.00 WIB · Zoom · 45 menit
                </p>
                <p className={styles.interviewMeta}>
                  Siapkan studi kasus aplikasi kesehatan.
                </p>
              </div>
              <ButtonLink
                href="/pelamar/wawancara"
                variant="outline"
                size="sm"
                className={styles.interviewAction}
              >
                Siapkan wawancara
              </ButtonLink>
            </div>
            <div className={styles.interviewRow}>
              <span className={`${styles.dateTile} ${styles.dateTileYellow}`}>
                <span className={styles.dateTileDay}>Min</span>
                <span className={styles.dateTileNumber}>18</span>
              </span>
              <div className={styles.interviewText}>
                <p className={styles.interviewName}>
                  Tes online · Bayarpintar
                </p>
                <p className={styles.interviewMeta}>
                  Batas pengerjaan 18 Okt, 23.59 WIB.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.interviewCard}>
          <h2 className={styles.cardTitle}>Rekomendasi untuk dilamar</h2>
          <div className={styles.recommendationList}>
            {RECOMMENDATIONS.map((item) => (
              <Link
                key={`${item.role}-${item.company}`}
                href="/lowongan"
                className={styles.recommendationRow}
              >
                <CompanyMark initials={item.initials} color={item.color} />
                <div className={styles.recommendationText}>
                  <p className={styles.recommendationName}>{item.role}</p>
                  <p className={styles.recommendationMeta}>{item.company}</p>
                </div>
                <span className={styles.matchValue}>{item.match}%</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
