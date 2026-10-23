import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanyRatingProps = {
  company: CompanyDetail;
};

export function CompanyRating({ company }: CompanyRatingProps) {
  return (
    <Card className={styles.card}>
      <h2 className={styles.cardTitle}>Rating karyawan</h2>
      <div className={styles.ratingRow}>
        <div className={styles.ratingBig}>
          <span className={styles.ratingBigScore}>{company.rating}</span>
          <span className={styles.stars} aria-hidden="true">
            ★★★★☆
          </span>
          <span className={styles.ratingCount}>
            dari {company.reviewCount} ulasan
          </span>
        </div>

        <div className={styles.breakdown}>
          {company.ratings.map((rating) => (
            <div key={rating.label} className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>{rating.label}</span>
              <Progress
                value={rating.value}
                label={rating.label}
                className={styles.breakdownTrack}
              />
              <span className={styles.breakdownScore}>{rating.score}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
