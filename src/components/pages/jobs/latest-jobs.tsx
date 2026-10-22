import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { BookmarkIcon } from "@/components/ui/icons/icons";
import { latestJobs } from "@/lib/data/jobs";
import styles from "./jobs-page.module.css";

export function LatestJobs() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <h2 className={styles.sectionTitle}>Lowongan terbaru</h2>
        <p className={styles.sectionSubtitle}>
          Diposting dalam 24 jam terakhir.
        </p>
      </div>

      <div className={styles.jobsGrid}>
        {latestJobs.map((job) => (
          <article key={job.slug} className={styles.jobCard}>
            <div className={styles.jobTop}>
              <Avatar
                initials={job.initials}
                color={job.color}
                size="md"
                label={job.company}
              />
              <div className={styles.jobBadges}>
                <Badge tone="mint">Baru</Badge>
                <button
                  type="button"
                  className={styles.bookmarkButton}
                  aria-label={`Simpan lowongan ${job.title}`}
                >
                  <BookmarkIcon size={18} />
                </button>
              </div>
            </div>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <p className={styles.jobMeta}>{job.meta}</p>
            <p className={styles.jobSalary}>{job.salaryShort}</p>
            <div className={styles.jobTags}>
              {job.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
            <p className={styles.jobPosted}>Diposting {job.posted}</p>
          </article>
        ))}
      </div>

      <div className={styles.centeredAction}>
        <ButtonLink
          href="/lowongan"
          variant="outline"
          size="sm"
          className={styles.allJobsButton}
        >
          Lihat semua lowongan
        </ButtonLink>
      </div>
    </section>
  );
}
