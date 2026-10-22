import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { companyDirectory } from "@/lib/data/company-directory";
import styles from "./companies-page.module.css";

export function CompanyGrid() {
  return (
    <main className={styles.content}>
      <div className={styles.heading}>
        <h2 className={styles.headingTitle}>486 perusahaan sedang merekrut</h2>
        <button type="button" className={styles.sortButton}>
          Urutkan: <strong>Rating tertinggi</strong>
        </button>
      </div>

      <div className={styles.grid}>
        {companyDirectory.map((company) => (
          <article key={company.slug} className={styles.companyCard}>
            <div className={styles.companyTop}>
              <Avatar
                initials={company.initials}
                color={company.color}
                size="xl"
                label={company.name}
              />
              <Badge className={styles.companyBadge}>{company.workStyle}</Badge>
            </div>
            <h3 className={styles.companyName}>{company.name}</h3>
            <p className={styles.companyIndustry}>{company.industry}</p>
            <div className={styles.companyRating}>
              <span className={styles.star} aria-hidden="true">
                ★
              </span>
              <strong>{company.rating}</strong>
              <span>{company.reviewCount} ulasan</span>
            </div>
            <p className={styles.companyJobs}>
              {company.openJobs} lowongan dibuka
            </p>
          </article>
        ))}
      </div>

      <div className={styles.more}>
        <p>Menampilkan 12 dari 486 perusahaan</p>
        <Button variant="outline" className={styles.moreButton}>
          Lihat lebih banyak perusahaan
        </Button>
      </div>
    </main>
  );
}
