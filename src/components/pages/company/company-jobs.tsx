import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanyJobsProps = {
  company: CompanyDetail;
};

export function CompanyJobs({ company }: CompanyJobsProps) {
  return (
    <Card className={styles.card}>
      <h2 className={styles.cardTitle}>
        Lowongan terbuka ({company.openJobCount})
      </h2>
      <div className={styles.jobList}>
        {company.openJobs.map((job) => (
          <div key={job.title} className={styles.jobRow}>
            <span className={styles.jobRowTitle}>{job.title}</span>
            <span className={styles.jobRowMeta}>{job.meta}</span>
          </div>
        ))}
      </div>
      <ButtonLink
        href={`/lowongan?perusahaan=${company.slug}`}
        variant="outline"
        size="sm"
        className={styles.cardAction}
      >
        Lihat semua lowongan
      </ButtonLink>
    </Card>
  );
}
