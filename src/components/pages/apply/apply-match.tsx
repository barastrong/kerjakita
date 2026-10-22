import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ApplicationJob } from "@/lib/data/apply";
import styles from "./apply-page.module.css";

type ApplyMatchProps = {
  job: ApplicationJob;
};

export function ApplyMatch({ job }: ApplyMatchProps) {
  return (
    <Card className={styles.sideCard}>
      <div className={styles.matchScore}>
        <span className={styles.matchNumber}>{job.score}%</span>
        <span className={styles.matchText}>cocok dengan profilmu</span>
      </div>
      <div className={styles.matchList}>
        {job.skills.map((skill) => (
          <div key={skill.label} className={styles.matchRow}>
            <span className={styles.matchLabel}>{skill.label}</span>
            <Progress value={skill.value} tone={skill.tone} />
            <span className={styles.matchLevel}>{skill.level}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
