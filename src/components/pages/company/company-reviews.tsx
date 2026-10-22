import { Card } from "@/components/ui/card";
import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanyReviewsProps = {
  company: CompanyDetail;
};

export function CompanyReviews({ company }: CompanyReviewsProps) {
  return (
    <Card className={styles.card}>
      <h2 className={styles.cardTitle}>Ulasan terbaru</h2>
      <div className={styles.reviewList}>
        {company.reviews.map((review) => (
          <article key={review.title} className={styles.review}>
            <div className={styles.reviewHead}>
              <h3 className={styles.reviewTitle}>{review.title}</h3>
              <span className={styles.reviewStars} aria-hidden="true">
                {review.stars}
              </span>
            </div>
            <p className={styles.reviewMeta}>{review.meta}</p>
            <p className={styles.reviewBody}>{review.body}</p>
          </article>
        ))}
      </div>
    </Card>
  );
}
