import { Fragment } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { ApplicationStep } from "@/lib/data/apply";
import styles from "./apply-page.module.css";

type ApplyStepperProps = {
  steps: ApplicationStep[];
};

export function ApplyStepper({ steps }: ApplyStepperProps) {
  return (
    <Card className={styles.stepperCard}>
      <nav className={styles.stepper} aria-label="Langkah lamaran">
        {steps.map((step, index) => (
          <Fragment key={step.label}>
            <div className={styles.step}>
              <span
                className={`${styles.circle} ${styles[step.status]}`}
                aria-hidden="true"
              >
                {step.status === "done" ? (
                  <Image
                    src="/icons/check.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={`${styles.stepLabel} ${
                  step.status !== "todo" ? styles.stepLabelActive : ""
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span
                className={`${styles.connector} ${
                  step.status === "done" ? styles.connectorDone : ""
                }`}
                aria-hidden="true"
              />
            )}
          </Fragment>
        ))}
      </nav>
    </Card>
  );
}
