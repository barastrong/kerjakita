import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRightIcon } from "@/components/ui/icons/icons";
import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanyJobsProps = {
  company: CompanyDetail;
  standalone?: boolean;
};

export function CompanyJobs({
  company,
  standalone = false,
}: CompanyJobsProps) {
  const jobsHref = `/lowongan?perusahaan=${company.slug}`;

  if (standalone) {
    return (
      <section className={styles.jobSection}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Lowongan terbuka</h2>
          <Badge tone="accent">{company.openJobCount}</Badge>
        </div>
        <div className={styles.jobCardGrid}>
          {company.openJobs.map((job) => {
            const parts = job.meta.split(" · ");
            const salary = parts.find((part) => part.startsWith("Rp"));
            const place = parts.filter((part) => part !== salary);

            return (
              <Link
                key={job.title}
                href={jobsHref}
                className={styles.jobCardLink}
              >
                <Card className={styles.jobCard}>
                  <Avatar
                    initials={company.initials}
                    color={company.color}
                    size="sm"
                    className={styles.jobCardAvatar}
                    label={company.name}
                  />
                  <div className={styles.jobCardMain}>
                    <h3 className={styles.jobCardTitle}>{job.title}</h3>
                    <p className={styles.jobCardMeta}>
                      {[company.name, ...place].join(" · ")}
                    </p>
                    {salary && (
                      <strong className={styles.jobCardSalary}>{salary}</strong>
                    )}
                  </div>
                  <ChevronRightIcon
                    className={styles.jobCardChevron}
                    size={18}
                  />
                </Card>
              </Link>
            );
          })}
        </div>
        <ButtonLink
          href={jobsHref}
          size="sm"
          className={styles.jobSectionAction}
        >
          Lihat semua lowongan
        </ButtonLink>
      </section>
    );
  }

  return (
    <Card className={styles.card}>
      <div className={styles.cardHead}>
        <h2 className={styles.cardTitle}>Lowongan terbuka</h2>
        <Badge tone="accent">{company.openJobCount}</Badge>
      </div>
      <div className={styles.jobList}>
        {company.openJobs.map((job) => (
          <div key={job.title} className={styles.jobRow}>
            <span className={styles.jobRowTitle}>{job.title}</span>
            <span className={styles.jobRowMeta}>{job.meta}</span>
          </div>
        ))}
      </div>
      <ButtonLink
        href={jobsHref}
        size="sm"
        className={styles.cardAction}
      >
        Lihat semua lowongan
      </ButtonLink>
    </Card>
  );
}
