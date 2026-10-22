import { SectionHeading } from "@/components/ui/section-heading";
import type { Step } from "@/lib/data/home";
import styles from "./home-page.module.css";

type HowItWorksProps = {
  steps: Step[];
};

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <section className={styles.section}>
      <SectionHeading title="Tiga langkah menuju wawancara" />
      <div className={styles.stepsGrid}>
        {steps.map((step) => (
          <div key={step.number} className={styles.stepCard}>
            <span className={styles.stepNumber} aria-hidden="true">
              {step.number}
            </span>
            <div className={styles.stepBody}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
