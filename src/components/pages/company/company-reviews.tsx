import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanyReviewsProps = {
  company: CompanyDetail;
  showAllLink?: boolean;
};

export function CompanyReviews({
  company,
  showAllLink = false,
}: CompanyReviewsProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.cardHead}>
        <h2 className={styles.cardTitle}>Ulasan terbaru</h2>
        <Badge>{company.reviewCount} ulasan</Badge>
      </div>
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
      {showAllLink && company.reviewCount > company.reviews.length && (
        <Link
          href={`/perusahaan/${company.slug}/ulasan`}
          className={styles.cardLink}
        >
          Lihat semua ulasan →
        </Link>
      )}
    </Card>
  );
}
