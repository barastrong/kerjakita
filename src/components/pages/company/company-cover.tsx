import { Avatar } from "@/components/ui/avatar";
import { Button, ButtonLink } from "@/components/ui/button";
import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanyCoverProps = {
  company: CompanyDetail;
};

export function CompanyCover({ company }: CompanyCoverProps) {
  return (
    <section className={styles.cover}>
      <Avatar
        initials={company.initials}
        color={company.color}
        size="lg"
        label={company.name}
      />

      <div className={styles.coverInfo}>
        <h1 className={styles.coverName}>{company.name}</h1>
        <p className={styles.coverMeta}>
          <span>{company.industry}</span>
          <span>{company.employees}</span>
          <span>{company.locations}</span>
        </p>
        <p className={styles.coverRating}>
          <span className={styles.ratingScore}>{company.rating}</span>
          <span>dari 5 · {company.reviewCount} ulasan karyawan</span>
        </p>
      </div>

      <div className={styles.coverActions}>
        <Button type="button" variant="outline">
          Ikuti perusahaan
        </Button>
        <ButtonLink href={`/lowongan?perusahaan=${company.slug}`}>
          Lihat {company.openJobCount} lowongan
        </ButtonLink>
      </div>
    </section>
  );
}
