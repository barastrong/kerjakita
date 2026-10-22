import Link from "next/link";
import { TrendIcon } from "@/components/ui/icons/icons";
import styles from "./jobs-page.module.css";

const POPULAR_SEARCHES = [
  "Product Designer",
  "Data Analyst",
  "Admin",
  "Customer Service",
  "Frontend Engineer",
  "Fresh graduate",
  "Remote",
  "Barista",
];

export function PopularSearches() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Pencarian populer minggu ini</h2>
      <div className={styles.popularList}>
        {POPULAR_SEARCHES.map((term) => (
          <Link
            key={term}
            href={`/lowongan?q=${encodeURIComponent(term)}`}
            className={styles.popularPill}
          >
            <TrendIcon size={16} className={styles.popularIcon} />
            <span>{term}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
