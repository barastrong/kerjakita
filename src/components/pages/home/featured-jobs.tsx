import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import type { JobCard } from "@/lib/data/home";
import styles from "./home-page.module.css";

type FeaturedJobsProps = {
  jobs: JobCard[];
};

export function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  return (
    <section className={styles.section}>
      <SectionHeading
        title="Lowongan pilihan untukmu"
        subtitle="Diurutkan dari yang paling cocok dengan profilmu."
      />
      <div className={styles.jobsGrid}>
        {jobs.map((job) => (
          <Link
            key={job.slug}
            href="/lowongan"
            className={styles.jobCard}
          >
            <div className={styles.jobTop}>
              <Avatar
                initials={job.initials}
                color={job.color}
                size="md"
                label={job.company}
              />
              <span className={styles.jobScoreWrap}>
                <span className={styles.jobScore}>{job.match}%</span>
                <span className={styles.jobScoreLabel}>kecocokan</span>
              </span>
            </div>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <p className={styles.jobMeta}>{job.meta}</p>
            <p className={styles.jobSalary}>{job.salary}</p>
            <div className={styles.jobTags}>
              {job.tags.map((tag) => (
                <Badge key={tag.label} tone={tag.tone}>
                  {tag.label}
                </Badge>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
