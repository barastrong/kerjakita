import Link from "next/link";
import { Button } from "@/components/ui/button";
import styles from "./jobs-page.module.css";

const QUICK_FILTERS = [
  "Remote",
  "Hybrid",
  "Fresh graduate",
  "Gaji ditampilkan",
  "Lamar cepat",
  "Kontrak",
];

const STATS = [
  { value: "12.480", label: "lowongan aktif" },
  { value: "486", label: "perusahaan merekrut" },
  { value: "1.248", label: "lowongan baru hari ini" },
];

export function JobsHero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>Temukan lowongan yang pas untukmu</h1>
      <p className={styles.heroSubtitle}>
        Cari berdasarkan posisi, lokasi, dan bidang. Atur filter gaji dan tipe
        kerja di halaman hasil.
      </p>

      <form className={styles.searchBar} action="/lowongan" role="search">
        <label className={`${styles.field} ${styles.fieldWide}`}>
          <span className={styles.fieldLabel}>Posisi atau kata kunci</span>
          <input
            className={styles.fieldInput}
            name="q"
            placeholder="Posisi atau kata kunci"
          />
        </label>
        <label className={`${styles.field} ${styles.fieldMedium}`}>
          <span className={styles.fieldLabel}>Lokasi</span>
          <input
            className={styles.fieldInput}
            name="location"
            placeholder="Jakarta, Remote"
          />
        </label>
        <label className={`${styles.field} ${styles.fieldShort}`}>
          <span className={styles.fieldLabel}>Bidang</span>
          <input
            className={styles.fieldInput}
            name="bidang"
            placeholder="Semua bidang"
          />
        </label>
        <Button type="submit" className={styles.searchButton}>
          Cari lowongan
        </Button>
      </form>

      <div className={styles.quickFilters}>
        <span className={styles.quickLabel}>Filter cepat:</span>
        {QUICK_FILTERS.map((filter) => (
          <Link
            key={filter}
            href={`/lowongan?tipe=${encodeURIComponent(filter)}`}
            className={styles.quickFilter}
          >
            {filter}
          </Link>
        ))}
      </div>

      <div className={styles.stats}>
        {STATS.map((stat) => (
          <p key={stat.label} className={styles.stat}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </p>
        ))}
      </div>
    </section>
  );
}
