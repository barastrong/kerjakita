import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Category } from "@/lib/data/home";
import styles from "./home-page.module.css";

type BrowseFieldsProps = {
  categories: Category[];
};

export function BrowseFields({ categories }: BrowseFieldsProps) {
  return (
    <section className={styles.section}>
      <SectionHeading
        title="Jelajahi berdasarkan bidang"
        subtitle="Pilih bidang untuk melihat lowongan yang sedang dibuka."
      />
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/lowongan?bidang=${encodeURIComponent(category.name)}`}
            className={styles.categoryCard}
          >
            <span className={styles.categoryIcon} aria-hidden="true">
              <Image
                src="/icons/briefcase.svg"
                alt=""
                width={20}
                height={20}
              />
            </span>
            <span className={styles.categoryText}>
              <span className={styles.categoryName}>{category.name}</span>
              <span className={styles.categoryCount}>{category.count}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
