import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { ApplicationJob } from "@/lib/data/apply";
import styles from "./apply-page.module.css";

type ApplyChecklistProps = {
  job: ApplicationJob;
};

export function ApplyChecklist({ job }: ApplyChecklistProps) {
  return (
    <Card className={styles.sideCard}>
      <h2 className={styles.checkTitle}>Sebelum mengirim</h2>
      <ul className={styles.checkList}>
        {job.checklist.map((item) => (
          <li key={item.label} className={styles.checkRow}>
            <span
              className={
                item.done ? styles.checkIconDone : styles.checkIconTodo
              }
              aria-hidden="true"
            >
              {item.done && (
                <Image
                  src="/icons/check-small.svg"
                  alt=""
                  width={12}
                  height={12}
                />
              )}
            </span>
            {item.label}
          </li>
        ))}
      </ul>
    </Card>
  );
}
