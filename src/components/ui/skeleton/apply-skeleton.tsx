import { Bar, Circle, LoadingLabel } from "./skeleton-primitives";
import apply from "@/components/pages/apply/apply-page.module.css";

const range = (length: number) => Array.from({ length }, (_, index) => index);

function StepHeaderSkeleton() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <Bar width={110} height={10} />
      <Bar width="min(360px, 100%)" height={30} />
      <Bar width="min(520px, 100%)" height={12} />
    </div>
  );
}

function FieldSkeleton({ label = 90 }: { label?: number }) {
  return (
    <div className={apply.field}>
      <Bar width={label} height={10} />
      <Bar width="100%" height={44} radius={9} />
    </div>
  );
}

function ActionsSkeleton({ next = 190 }: { next?: number }) {
  return (
    <div className={apply.actions}>
      <Bar width={84} height={40} radius={9} />
      <span className={apply.actionsSpacer} />
      <Bar width={110} height={40} radius={9} />
      <Bar width={next} height={40} radius={9} tone="accent" />
    </div>
  );
}

export function ApplyDataSkeleton() {
  return (
    <div
      className={apply.formBody}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <StepHeaderSkeleton />

      <div className={apply.fieldRow}>
        <FieldSkeleton label={96} />
        <FieldSkeleton label={52} />
      </div>
      <div className={apply.fieldRow}>
        <FieldSkeleton label={92} />
        <FieldSkeleton label={100} />
      </div>
      <FieldSkeleton label={170} />

      <div
        style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}
      >
        <Bar width={18} height={18} radius={5} />
        <Bar width="min(260px, 100%)" height={10} />
      </div>

      <ActionsSkeleton next={210} />
    </div>
  );
}

export function ApplyCvSkeleton() {
  return (
    <div
      className={apply.formBody}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <StepHeaderSkeleton />

      <div style={{ display: "grid", gap: 10 }}>
        {range(2).map((option) => (
          <div key={option} className={apply.cvOption}>
            <Bar width={18} height={18} radius={50} />
            <span style={{ display: "grid", gap: 6, flex: 1 }}>
              <Bar width="min(200px, 100%)" height={12} />
              <Bar width="min(140px, 100%)" height={9} />
            </span>
            <Bar width={38} height={11} />
          </div>
        ))}
      </div>

      <div className={apply.dropzone}>
        <Circle size={28} />
        <Bar width="min(280px, 100%)" height={12} />
        <Bar width="min(180px, 100%)" height={9} />
      </div>

      <FieldSkeleton label={150} />
      <div className={apply.fieldRow}>
        <FieldSkeleton label={170} />
        <FieldSkeleton label={120} />
      </div>

      <div className={apply.field}>
        <Bar width={160} height={10} />
        <Bar width="100%" height={110} radius={9} />
      </div>
      <Bar width={110} height={9} />

      <ActionsSkeleton next={230} />
    </div>
  );
}

export function ApplyQuestionsSkeleton() {
  return (
    <div
      className={apply.formBody}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <StepHeaderSkeleton />

      {range(2).map((question) => (
        <div key={question} className={apply.question}>
          <Bar width="min(420px, 100%)" height={12} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 10,
              marginTop: 12,
            }}
          >
            {range(question === 0 ? 4 : 2).map((option) => (
              <div
                key={option}
                className={apply.option}
                style={{ display: "flex", alignItems: "center", gap: 9 }}
              >
                <Bar width={18} height={18} radius={50} />
                <Bar width="min(110px, 100%)" height={10} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={apply.field}>
        <Bar width="min(340px, 100%)" height={11} />
        <Bar width="100%" height={120} radius={9} />
      </div>
      <Bar width={110} height={9} />

      <ActionsSkeleton next={170} />
    </div>
  );
}

export function ApplyReviewSkeleton() {
  return (
    <div
      className={apply.formBody}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <StepHeaderSkeleton />

      {range(3).map((section) => (
        <section key={section} className={apply.reviewCard}>
          <div className={apply.reviewHead}>
            <Bar width={section === 2 ? 170 : 110} height={16} />
            <Bar width={44} height={11} />
          </div>
          <div className={apply.reviewRows}>
            {range(section === 0 ? 4 : 3).map((row) => (
              <div key={row} className={apply.reviewRow}>
                <Bar width={100} height={10} />
                <Bar width="min(190px, 100%)" height={10} />
              </div>
            ))}
          </div>
        </section>
      ))}

      <div
        style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}
      >
        <Bar width={18} height={18} radius={5} />
        <Bar width="min(420px, 100%)" height={10} />
      </div>

      <div className={apply.actions}>
        <Bar width={84} height={40} radius={9} />
        <span className={apply.actionsSpacer} />
        <Bar width={140} height={40} radius={9} tone="accent" />
      </div>
    </div>
  );
}
