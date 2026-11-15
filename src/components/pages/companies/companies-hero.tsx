import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { companyDirectory } from "@/lib/data/company-directory";
import styles from "./companies-page.module.css";

type CompaniesHeroProps = {
  query: string;
  industry: string;
};

const INDUSTRIES = Array.from(
  companyDirectory.reduce((counts, company) => {
    counts.set(company.industry, (counts.get(company.industry) ?? 0) + 1);
    return counts;
  }, new Map<string, number>()),
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "id"))
  .map(([name]) => name);

function buildHref(query: string, industry: string) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (industry) params.set("industri", industry);
  const search = params.toString();
  return search ? `/perusahaan?${search}` : "/perusahaan";
}

export function CompaniesHero({ query, industry }: CompaniesHeroProps) {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/perusahaan-hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />
      <div className={styles.kickerRow}>
        <p className={styles.kicker}>Direktori perusahaan</p>
        <span className={styles.dataTag}>Contoh data</span>
      </div>
      <h1 className={styles.heroTitle}>Cek perusahaan sebelum melamar</h1>
      <p className={styles.heroSubtitle}>
        Rating dan ulasan karyawan, kisaran gaji, dan lowongan yang sedang
        dibuka.
      </p>

      <form
        key={`${query}|${industry}`}
        className={styles.searchBar}
        action="/perusahaan"
        role="search"
      >
        <label className={`${styles.field} ${styles.fieldName}`}>
          <span className={styles.fieldLabel}>Nama perusahaan</span>
          <input name="q" defaultValue={query} placeholder="Cari perusahaan" />
        </label>
        <label className={`${styles.field} ${styles.fieldIndustry}`}>
          <span className={styles.fieldLabel}>Industri</span>
          <select
            name="industri"
            defaultValue={industry}
            className={styles.fieldSelect}
          >
            <option value="">Semua industri</option>
            {INDUSTRIES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <Button type="submit" className={styles.searchButton}>
          Cari
        </Button>
      </form>

      <div className={styles.quickFilters}>
        <Link
          href={buildHref(query, "")}
          className={`${styles.quickFilter} ${
            industry ? "" : styles.quickFilterActive
          }`}
          aria-current={industry ? undefined : "page"}
        >
          Semua
        </Link>
        {INDUSTRIES.map((name) => (
          <Link
            key={name}
            href={buildHref(query, name)}
            className={`${styles.quickFilter} ${
              industry === name ? styles.quickFilterActive : ""
            }`}
            aria-current={industry === name ? "page" : undefined}
          >
            {name}
          </Link>
        ))}
      </div>
    </section>
  );
}
