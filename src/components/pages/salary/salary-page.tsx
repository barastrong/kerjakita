import Image from "next/image";

import { Footer } from "@/components/layout/footer";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import styles from "./salary-page.module.css";

type SalaryOption = {
  slug: string;
  label: string;
  factor: number;
  share: number;
};

type SalaryRole = {
  slug: string;
  label: string;
  median: number;
  reports: number;
};

const ROLES: SalaryRole[] = [
  {
    slug: "product-designer",
    label: "Product Designer",
    median: 17.5,
    reports: 1284,
  },
  {
    slug: "ux-researcher",
    label: "UX Researcher",
    median: 15.2,
    reports: 486,
  },
  {
    slug: "ui-designer",
    label: "UI Designer",
    median: 13.8,
    reports: 732,
  },
  {
    slug: "frontend-engineer",
    label: "Frontend Engineer",
    median: 18.5,
    reports: 2140,
  },
  {
    slug: "data-analyst",
    label: "Data Analyst",
    median: 16,
    reports: 1680,
  },
  {
    slug: "design-lead",
    label: "Design Lead",
    median: 26,
    reports: 214,
  },
];

const CITIES: SalaryOption[] = [
  { slug: "jakarta", label: "Jakarta", factor: 1, share: 0.42 },
  { slug: "remote", label: "Remote", factor: 0.96, share: 0.18 },
  { slug: "surabaya", label: "Surabaya", factor: 0.8, share: 0.14 },
  { slug: "bandung", label: "Bandung", factor: 0.75, share: 0.15 },
  { slug: "yogyakarta", label: "Yogyakarta", factor: 0.66, share: 0.11 },
];

const EXPERIENCES: SalaryOption[] = [
  {
    slug: "kurang-1",
    label: "Kurang dari 1 tahun",
    factor: 0.43,
    share: 0.08,
  },
  { slug: "1-3", label: "1 – 3 tahun", factor: 0.63, share: 0.27 },
  { slug: "3-5", label: "3 – 5 tahun", factor: 1, share: 0.32 },
  { slug: "5-8", label: "5 – 8 tahun", factor: 1.37, share: 0.22 },
  { slug: "8-plus", label: "Lebih dari 8 tahun", factor: 1.83, share: 0.11 },
];

const COMPANIES = [
  {
    name: "Bayarpintar",
    initials: "BP",
    color: "var(--brand-mint)",
    factor: 1.26,
  },
  {
    name: "Tokoloka",
    initials: "TL",
    color: "var(--brand-accent)",
    factor: 1.2,
  },
  {
    name: "Lokalkarya",
    initials: "LK",
    color: "var(--brand-gold)",
    factor: 1.09,
  },
];

const DEFAULT_ROLE = ROLES[0];
const DEFAULT_CITY = CITIES[0];
const DEFAULT_EXPERIENCE = EXPERIENCES[2];

function roundHalf(value: number) {
  return Math.round(value * 2) / 2;
}

function formatJuta(value: number) {
  const rounded = roundHalf(value);
  const text = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(1).replace(".", ",");

  return `Rp ${text} jt`;
}

function formatCount(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function findOption<T extends { slug: string }>(
  items: T[],
  slug: string | undefined,
  fallback: T,
) {
  return items.find((item) => item.slug === slug) ?? fallback;
}

type SalaryPageProps = {
  peran?: string;
  kota?: string;
  pengalaman?: string;
};

export function SalaryPage({ peran, kota, pengalaman }: SalaryPageProps) {
  const role = findOption(ROLES, peran, DEFAULT_ROLE);
  const city = findOption(CITIES, kota, DEFAULT_CITY);
  const experience = findOption(
    EXPERIENCES,
    pengalaman,
    DEFAULT_EXPERIENCE,
  );

  const baseMedian = role.median * city.factor * experience.factor;
  const median = roundHalf(baseMedian);
  const low = roundHalf(baseMedian * 0.8);
  const high = roundHalf(baseMedian * 1.26);
  const min = roundHalf(baseMedian * 0.45);
  const max = roundHalf(baseMedian * 1.6);
  const band = Math.max(1, Math.round((max - min) / 10));

  const baseShare = DEFAULT_CITY.share * DEFAULT_EXPERIENCE.share;
  const reports = Math.max(
    1,
    Math.round((role.reports * city.share * experience.share) / baseShare),
  );

  const cityValues = CITIES.map((item) => ({
    ...item,
    value: roundHalf(role.median * item.factor * experience.factor),
  }));
  const maxCityValue = Math.max(...cityValues.map((item) => item.value));

  const experienceValues = EXPERIENCES.map((item) => ({
    ...item,
    value: roundHalf(role.median * city.factor * item.factor),
  }));

  const roleValues = ROLES.map((item) => {
    const value = item.median * city.factor * experience.factor;

    return {
      ...item,
      low: roundHalf(value * 0.8),
      median: roundHalf(value),
      high: roundHalf(value * 1.26),
    };
  });

  const distribution = Array.from({ length: 10 }, (_, index) =>
    Math.round(
      24 + 126 * Math.exp(-0.5 * Math.pow((index - 4.5) / 2, 2)),
    ),
  );

  return (
    <div className={styles.page}>
      <main>
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
            <div className={styles.heroKickerRow}>
              <p className={styles.heroKicker}>Laporan gaji</p>
              <span className={styles.dataTag}>Contoh data</span>
            </div>
            <h1 className={styles.heroTitle}>
              Berapa gaji yang pantas untuk perannya?
            </h1>
            <p className={styles.heroText}>
              Bandingkan gaji berdasarkan posisi, kota, dan pengalaman dari
              laporan karyawan. Data pada layar ini hanya contoh.
            </p>

            <form
              className={styles.searchBox}
              action="/gaji#rincian"
              method="get"
              role="search"
              aria-label="Cari data gaji"
            >
              <label className={`${styles.searchField} ${styles.fieldWide}`}>
                <span className={styles.fieldLabel}>Posisi</span>
                <select
                  className={styles.fieldSelect}
                  name="peran"
                  defaultValue={role.slug}
                  aria-label="Posisi"
                >
                  {ROLES.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className={`${styles.searchField} ${styles.fieldMedium}`}>
                <span className={styles.fieldLabel}>Kota</span>
                <select
                  className={styles.fieldSelect}
                  name="kota"
                  defaultValue={city.slug}
                  aria-label="Kota"
                >
                  {CITIES.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className={`${styles.searchField} ${styles.fieldShort}`}>
                <span className={styles.fieldLabel}>Pengalaman</span>
                <select
                  className={styles.fieldSelect}
                  name="pengalaman"
                  defaultValue={experience.slug}
                  aria-label="Pengalaman"
                >
                  {EXPERIENCES.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <Button type="submit" size="lg" className={styles.searchButton}>
                Cek gaji
              </Button>
            </form>
          </div>
        </section>

        <div id="rincian" className={styles.content}>
          <div className={styles.main}>
            <Card className={styles.medianCard}>
              <p className={styles.medianMeta}>
                {role.label} · {city.label} · {experience.label}
              </p>
              <div className={styles.medianRow}>
                <p className={styles.medianValue}>{formatJuta(median)}</p>
                <p className={styles.medianNote}>
                  median per bulan
                  <br />
                  dari {formatCount(reports)} laporan contoh
                </p>
              </div>

              <div className={styles.factGrid}>
                <div className={styles.fact}>
                  <span className={styles.factLabel}>Rendah (25%)</span>
                  <span className={styles.factValue}>{formatJuta(low)}</span>
                </div>
                <div className={styles.fact}>
                  <span className={styles.factLabel}>Median</span>
                  <span className={styles.factValue}>{formatJuta(median)}</span>
                </div>
                <div className={styles.fact}>
                  <span className={styles.factLabel}>Tinggi (75%)</span>
                  <span className={styles.factValue}>{formatJuta(high)}</span>
                </div>
              </div>

              <h2 className={styles.chartTitle}>
                Bagaimana sebaran gaji {role.label}?
              </h2>
              <div
                className={styles.chart}
                role="img"
                aria-label={`Sebaran gaji ${role.label} di ${city.label} dari ${formatJuta(
                  min,
                )} sampai ${formatJuta(
                  max,
                )} per bulan, dengan puncak di sekitar ${formatJuta(median)}.`}
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
                <span>{formatJuta(min)}</span>
                <span>{formatJuta(max)}</span>
              </div>
              <p className={styles.chartNote}>
                Tiap batang mewakili rentang sekitar {formatJuta(band)}. Batang
                biru adalah rentang di sekitar median.
              </p>
            </Card>

            <Card className={styles.cityCard}>
              <div className={styles.cardHead}>
                <h2 className={styles.cardTitle}>Berdasarkan kota</h2>
                <p className={styles.cardMeta}>
                  {role.label} · {experience.label}
                </p>
              </div>
              <div className={styles.cityList}>
                {cityValues.map((item) => {
                  const active = item.slug === city.slug;

                  return (
                    <div
                      key={item.slug}
                      className={`${styles.cityRow} ${
                        active ? styles.cityRowActive : ""
                      }`}
                    >
                      <span className={styles.cityLabel}>{item.label}</span>
                      <div className={styles.cityTrack} aria-hidden="true">
                        <span
                          className={`${styles.cityFill} ${
                            active ? "" : styles.cityFillMuted
                          }`}
                          style={{
                            width: `${Math.round(
                              (item.value / maxCityValue) * 100,
                            )}%`,
                          }}
                        />
                      </div>
                      <span className={styles.cityValue}>
                        {formatJuta(item.value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className={styles.tableCard}>
              <div className={styles.cardHead}>
                <h2 id="gaji-per-peran" className={styles.cardTitle}>
                  Gaji per peran
                </h2>
                <p className={styles.cardMeta}>
                  {city.label} · {experience.label}
                </p>
              </div>
              <div className={styles.tableWrap}>
                <table
                  className={styles.roleTable}
                  aria-labelledby="gaji-per-peran"
                >
                  <thead>
                    <tr>
                      <th scope="col">Peran</th>
                      <th scope="col">Rendah</th>
                      <th scope="col">Median</th>
                      <th scope="col">Tinggi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleValues.map((item) => (
                      <tr
                        key={item.slug}
                        className={
                          item.slug === role.slug ? styles.roleRowActive : ""
                        }
                        aria-current={
                          item.slug === role.slug ? "true" : undefined
                        }
                      >
                        <td>{item.label}</td>
                        <td>
                          <span className={styles.tdLabel}>Rendah</span>
                          {formatJuta(item.low)}
                        </td>
                        <td>
                          <span className={styles.tdLabel}>Median</span>
                          {formatJuta(item.median)}
                        </td>
                        <td>
                          <span className={styles.tdLabel}>Tinggi</span>
                          {formatJuta(item.high)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.sourceNote}>
                Sumber: laporan karyawan (contoh). Angka dibulatkan ke Rp 0,5
                juta terdekat dan bukan data pasar.
              </p>
            </Card>
          </div>

          <aside className={styles.sidebar}>
            <Card className={styles.sideCard}>
              <div className={styles.cardHead}>
                <h2 className={styles.cardTitle}>Berdasarkan pengalaman</h2>
                <p className={styles.cardMeta}>
                  {role.label} · {city.label}
                </p>
              </div>
              <div className={styles.expList}>
                {experienceValues.map((item) => {
                  const active = item.slug === experience.slug;

                  return (
                    <div
                      key={item.slug}
                      className={`${styles.expRow} ${
                        active ? styles.expRowActive : ""
                      }`}
                    >
                      <span className={styles.expLabel}>{item.label}</span>
                      <span className={styles.expValue}>
                        {formatJuta(item.value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className={styles.sideCard}>
              <div className={styles.cardHead}>
                <h2 className={styles.cardTitle}>
                  Gaji tertinggi untuk peran ini
                </h2>
                <p className={styles.cardMeta}>
                  {role.label} · {city.label} · {experience.label}
                </p>
              </div>
              <div className={styles.companyList}>
                {COMPANIES.map((company) => (
                  <div key={company.name} className={styles.companyRow}>
                    <span
                      className={styles.companyMark}
                      style={{ backgroundColor: company.color }}
                      aria-hidden="true"
                    >
                      {company.initials}
                    </span>
                    <span className={styles.companyName}>{company.name}</span>
                    <span className={styles.companySalary}>
                      {formatJuta(roundHalf(baseMedian * company.factor))}
                    </span>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
