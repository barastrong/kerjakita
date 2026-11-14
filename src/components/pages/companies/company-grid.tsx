import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import type { DirectoryCompany } from "@/lib/data/company-directory";
import styles from "./companies-page.module.css";

type CompanyGridProps = {
  companies: DirectoryCompany[];
  filtered: boolean;
};

export function CompanyGrid({ companies, filtered }: CompanyGridProps) {
  return (
    <main className={styles.content}>
      <div className={styles.heading}>
        <h2 className={styles.headingTitle}>
          {filtered
            ? `${companies.length} perusahaan cocok`
            : `${companies.length} perusahaan sedang merekrut`}
        </h2>
        <p className={styles.headingAside}>Urut rating tertinggi</p>
      </div>

      {companies.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Tidak ada perusahaan yang cocok</p>
          <p className={styles.emptyText}>
            Coba kata kunci lain atau lihat semua perusahaan.
          </p>
          <Link href="/perusahaan" className={styles.emptyLink}>
            Tampilkan semua perusahaan
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {companies.map((company) => (
            <Link
              key={company.slug}
              href={`/perusahaan/${company.slug}`}
              className={styles.companyCard}
            >
              <div className={styles.companyTop}>
                <Avatar
                  initials={company.initials}
                  color={company.color}
                  size="xl"
                  label={company.name}
                />
                <span className={styles.companyScore}>
                  <span className={styles.star} aria-hidden="true">
                    ★
                  </span>
                  <strong>{company.rating}</strong>
                </span>
              </div>
              <h3 className={styles.companyName}>{company.name}</h3>
              <p className={styles.companyIndustry}>{company.industry}</p>
              <p className={styles.companyMeta}>
                {company.reviewCount} ulasan, {company.openJobs} lowongan
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
