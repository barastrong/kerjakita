import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons/icons";
import styles from "./jobs-page.module.css";

type BrowseGroup = {
  title: string;
  param: string;
  items: { label: string; count: string }[];
};

const GROUPS: BrowseGroup[] = [
  {
    title: "Bidang",
    param: "bidang",
    items: [
      { label: "Teknologi", count: "5.280" },
      { label: "Desain dan kreatif", count: "1.140" },
      { label: "Keuangan", count: "2.030" },
      { label: "Pemasaran", count: "1.870" },
      { label: "Kesehatan", count: "960" },
      { label: "Pendidikan", count: "1.320" },
      { label: "Logistik", count: "2.410" },
    ],
  },
  {
    title: "Kota",
    param: "kota",
    items: [
      { label: "Jakarta", count: "4.120" },
      { label: "Surabaya", count: "1.380" },
      { label: "Bandung", count: "1.050" },
      { label: "Yogyakarta", count: "640" },
      { label: "Medan", count: "520" },
      { label: "Remote", count: "2.960" },
      { label: "Bali", count: "410" },
    ],
  },
  {
    title: "Tingkat pengalaman",
    param: "pengalaman",
    items: [
      { label: "Fresh graduate", count: "1.940" },
      { label: "1 – 3 tahun", count: "4.610" },
      { label: "3 – 5 tahun", count: "3.870" },
      { label: "Lebih dari 5 tahun", count: "2.060" },
      { label: "Magang", count: "960" },
      { label: "Kontrak", count: "2.140" },
      { label: "Paruh waktu", count: "580" },
    ],
  },
];

export function BrowseGroups() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <h2 className={styles.sectionTitle}>Jelajahi berdasarkan</h2>
        <p className={styles.sectionSubtitle}>
          Pilih salah satu untuk langsung melihat lowongannya.
        </p>
      </div>

      <div className={styles.browseGrid}>
        {GROUPS.map((group) => (
          <div key={group.title} className={styles.browseCard}>
            <h3 className={styles.browseTitle}>{group.title}</h3>
            <div className={styles.browseList}>
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={`/lowongan?${group.param}=${encodeURIComponent(
                    item.label,
                  )}`}
                  className={styles.browseRow}
                >
                  <span className={styles.browseLabel}>{item.label}</span>
                  <span className={styles.browseDots} aria-hidden="true" />
                  <span className={styles.browseCount}>{item.count}</span>
                  <ChevronRightIcon
                    size={16}
                    className={styles.browseChevron}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
