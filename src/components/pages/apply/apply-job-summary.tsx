import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ApplicationJob } from "@/lib/data/apply";
import styles from "./apply-page.module.css";

type ApplyJobSummaryProps = {
  job: ApplicationJob;
};

export function ApplyJobSummary({ job }: ApplyJobSummaryProps) {
  return (
    <Card className={styles.sideCard}>
      <div className={styles.jobSummary}>
        <Avatar
          initials={job.initials}
          color={job.color}
          size="md"
          label={job.company}
        />
        <div className={styles.jobSummaryText}>
          <span className={styles.jobSummaryTitle}>{job.title}</span>
          <span className={styles.jobSummaryMeta}>{job.meta}</span>
        </div>
      </div>
      <div className={styles.jobTags}>
        <Badge>{job.salary}</Badge>
        <Badge>{job.type}</Badge>
      </div>
    </Card>
  );
}
