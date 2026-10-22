import { Button } from "@/components/ui/button";
import styles from "./companies-page.module.css";

const QUICK_FILTERS = [
  { label: "Semua", active: true },
  { label: "Teknologi" },
  { label: "E-commerce" },
  { label: "Fintech" },
  { label: "Kesehatan" },
  { label: "Ritel" },
  { label: "Makanan & minuman" },
];

export function CompaniesHero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>Temukan tempat kerja berikutnya</h1>
      <p className={styles.heroSubtitle}>
        Baca rating karyawan, lihat gaji, dan cek lowongan yang sedang dibuka di
        satu tempat.
      </p>

      <form className={styles.searchBar} action="/perusahaan" role="search">
        <label className={`${styles.field} ${styles.fieldName}`}>
          <span className={styles.fieldLabel}>Nama perusahaan</span>
          <input name="company" placeholder="Cari perusahaan" />
        </label>
        <label className={`${styles.field} ${styles.fieldIndustry}`}>
          <span className={styles.fieldLabel}>Industri</span>
          <input name="industry" placeholder="Semua industri" />
        </label>
        <label className={`${styles.field} ${styles.fieldCity}`}>
          <span className={styles.fieldLabel}>Kota</span>
          <input name="city" placeholder="Semua kota" />
        </label>
        <Button type="submit" className={styles.searchButton}>
          Cari
        </Button>
      </form>

      <div className={styles.quickFilters}>
        {QUICK_FILTERS.map((filter) => (
          <button
            key={filter.label}
            type="button"
            className={`${styles.quickFilter} ${
              filter.active ? styles.quickFilterActive : ""
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </section>
  );
}
