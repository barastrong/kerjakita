import { Footer } from "@/components/layout/footer";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import styles from "./salary-page.module.css";

const distribution = [27, 45, 72, 105, 150, 129, 87, 54, 33, 18];

const citySalaries = [
  { label: "Jakarta", value: "Rp 17,5 jt", width: 100 },
  { label: "Remote", value: "Rp 16,8 jt", width: 96 },
  { label: "Surabaya", value: "Rp 14,0 jt", width: 80 },
  { label: "Bandung", value: "Rp 13,2 jt", width: 75 },
  { label: "Yogyakarta", value: "Rp 11,5 jt", width: 66 },
];

const experiences = [
  { label: "Kurang dari 1 tahun", value: "Rp 7,5 jt" },
  { label: "1 – 3 tahun", value: "Rp 11,0 jt" },
  { label: "3 – 5 tahun", value: "Rp 17,5 jt", active: true },
  { label: "5 – 8 tahun", value: "Rp 24,0 jt" },
  { label: "Lebih dari 8 tahun", value: "Rp 32,0 jt" },
];

const topCompanies = [
  {
    name: "Bayarpintar",
    initials: "BP",
    color: "#0b7a62",
    salary: "Rp 22 jt",
  },
  {
    name: "Tokoloka",
    initials: "TL",
    color: "#3d3bf3",
    salary: "Rp 21 jt",
  },
  {
    name: "Lokalkarya",
    initials: "LK",
    color: "#b45309",
    salary: "Rp 19 jt",
  },
];

function CompanyMark({
  initials,
  color,
}: {
  initials: string;
  color: string;
}) {
  return (
    <span
      className={styles.companyMark}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function SalaryPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Berapa gaji yang pantas untuk perannya?
        </h1>
        <p className={styles.heroText}>
          Bandingkan gaji berdasarkan posisi, kota, dan pengalaman dari laporan
          karyawan. Data pada layar ini hanya contoh.
        </p>

        <div className={styles.searchBox}>
          <div className={`${styles.searchField} ${styles.fieldWide}`}>
            <span className={styles.fieldLabel}>Posisi</span>
            <span className={styles.fieldValue}>Product Designer</span>
          </div>
          <div className={`${styles.searchField} ${styles.fieldMedium}`}>
            <span className={styles.fieldLabel}>Kota</span>
            <span className={styles.fieldValue}>Jakarta</span>
          </div>
          <div className={`${styles.searchField} ${styles.fieldShort}`}>
            <span className={styles.fieldLabel}>Pengalaman</span>
            <span className={styles.fieldValue}>3 – 5 tahun</span>
          </div>
          <ButtonLink href="#rincian" size="lg" className={styles.searchButton}>
            Cek gaji
          </ButtonLink>
        </div>
      </section>

      <main id="rincian" className={styles.content}>
        <div className={styles.main}>
          <Card className={styles.medianCard}>
            <p className={styles.medianMeta}>
              Product Designer · Jakarta · 3 – 5 tahun
            </p>
            <div className={styles.medianRow}>
              <p className={styles.medianValue}>Rp 17,5 juta</p>
              <p className={styles.medianNote}>
                median per bulan
                <br />
                dari 1.284 laporan
              </p>
            </div>

            <div className={styles.factGrid}>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Rendah (25%)</span>
                <span className={styles.factValue}>Rp 14 juta</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Median</span>
                <span className={styles.factValue}>Rp 17,5 juta</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Tinggi (75%)</span>
                <span className={styles.factValue}>Rp 22 juta</span>
              </div>
            </div>

            <h2 className={styles.chartTitle}>Sebaran gaji laporan</h2>
            <div
              className={styles.chart}
              role="img"
              aria-label="Sebaran gaji dari Rp 8 juta sampai Rp 28 juta per bulan, dengan puncak di sekitar Rp 17,5 juta."
            >
              {distribution.map((height, index) => (
                <span
                  key={index}
                  className={`${styles.bar} ${
                    index >= 3 && index <= 6 ? styles.barActive : ""
                  }`}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
            <div className={styles.axis}>
              <span>Rp 8 jt</span>
              <span>Rp 28 jt</span>
            </div>
          </Card>

          <Card className={styles.cityCard}>
            <h2 className={styles.cardTitle}>Berdasarkan kota</h2>
            <div className={styles.cityList}>
              {citySalaries.map((city) => (
                <div key={city.label} className={styles.cityRow}>
                  <span className={styles.cityLabel}>{city.label}</span>
                  <div
                    className={styles.cityTrack}
                    role="img"
                    aria-label={`${city.label}: ${city.value}`}
                  >
                    <span
                      className={styles.cityFill}
                      style={{ width: `${city.width}%` }}
                    />
                  </div>
                  <span className={styles.cityValue}>{city.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside className={styles.sidebar}>
          <Card className={styles.sideCard}>
            <h2 className={styles.cardTitle}>Berdasarkan pengalaman</h2>
            <div className={styles.expList}>
              {experiences.map((item) => (
                <div
                  key={item.label}
                  className={`${styles.expRow} ${
                    item.active ? styles.expRowActive : ""
                  }`}
                >
                  <span className={styles.expLabel}>{item.label}</span>
                  <span className={styles.expValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.sideCard}>
            <h2 className={styles.cardTitle}>Gaji tertinggi untuk peran ini</h2>
            <div className={styles.companyList}>
              {topCompanies.map((company) => (
                <div key={company.name} className={styles.companyRow}>
                  <CompanyMark
                    initials={company.initials}
                    color={company.color}
                  />
                  <span className={styles.companyName}>{company.name}</span>
                  <span className={styles.companySalary}>{company.salary}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.shareCard}>
            <h2 className={styles.shareTitle}>
              Bantu orang lain dengan membagikan gajimu secara anonim.
            </h2>
            <ButtonLink href="/masuk?next=/gaji" size="sm">
              Bagikan gaji
            </ButtonLink>
          </Card>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
