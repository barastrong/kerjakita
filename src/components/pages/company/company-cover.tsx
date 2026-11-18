import type { CSSProperties } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button";
import type { CompanyDetail } from "@/lib/data/companies";
import { CompanyStars } from "./company-stars";
import { FollowButton } from "./follow-button";
import styles from "./company-page.module.css";

type CompanyCoverProps = {
  company: CompanyDetail;
};

export function CompanyCover({ company }: CompanyCoverProps) {
  return (
    <section
      className={styles.cover}
      style={{ "--company-color": company.color } as CSSProperties}
    >
      <span className={styles.coverWatermark} aria-hidden="true">
        {company.initials}
      </span>

      <div className={styles.coverInner}>
        <nav className={styles.crumb} aria-label="Remah roti">
          <Link href="/perusahaan" className={styles.crumbLink}>
            Perusahaan
          </Link>
          <span className={styles.crumbSep} aria-hidden="true">
            /
          </span>
          <span>{company.industry}</span>
        </nav>

        <div className={styles.coverRow}>
          <Avatar
            initials={company.initials}
            color={company.color}
            size="lg"
            className={styles.coverAvatar}
          />

          <div className={styles.coverInfo}>
            <h1 className={styles.coverName}>{company.name}</h1>
            <p className={styles.coverMeta}>
              <span>{company.industry}</span>
              <span>{company.employees}</span>
              <span>{company.locations}</span>
            </p>
            <p className={styles.coverRating}>
              <CompanyStars rating={company.rating} />
              <span className={styles.ratingScore}>{company.rating}</span>
              <span>{company.reviewCount} ulasan karyawan</span>
            </p>
          </div>

          <div className={styles.coverActions}>
            <FollowButton slug={company.slug} />
            <ButtonLink href={`/lowongan?perusahaan=${company.slug}`}>
              Lihat {company.openJobCount} lowongan
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
