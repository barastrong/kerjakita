import type { ReactNode } from "react";
import {
  CompanyFlowShell,
  SideCard,
} from "@/components/pages/auth/company-flow-shell";
import { Bar, Circle, LoadingLabel } from "./skeleton-primitives";
import flow from "@/components/pages/auth/company-flow.module.css";

const range = (length: number) => Array.from({ length }, (_, index) => index);

type CompanyFlowSkeletonProps = {
  step: 1 | 2 | 3;
  narrow?: boolean;
  variant?: "data" | "documents" | "verification";
};

function CardSkeleton({
  title,
  children,
}: {
  title: number;
  children: ReactNode;
}) {
  return (
    <section className={flow.card}>
      <div className={flow.cardHead}>
        <Bar width={title} height={16} />
      </div>
      {children}
    </section>
  );
}

function FieldSkeleton({ label = 94 }: { label?: number }) {
  return (
    <div className={flow.field}>
      <Bar width={label} height={10} />
      <Bar width="100%" height={44} radius={9} />
    </div>
  );
}

function CheckSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {range(rows).map((row) => (
        <div key={row} style={{ display: "flex", gap: 10 }}>
          <Circle size={20} />
          <Bar width={`${54 + ((row * 11) % 30)}%`} height={9} />
        </div>
      ))}
    </div>
  );
}

function AsideSkeleton() {
  return (
    <>
      <SideCard title="Memuat panduan">
        <CheckSkeleton rows={3} />
      </SideCard>
      <SideCard title="Memuat checklist">
        <CheckSkeleton rows={4} />
      </SideCard>
    </>
  );
}

function DataSkeleton() {
  return (
    <div className={flow.form} role="status" aria-live="polite" aria-busy="true">
      <LoadingLabel />
      <div style={{ display: "grid", gap: 8 }}>
        <Bar width="min(340px, 100%)" height={28} />
        <Bar width="min(540px, 100%)" height={11} />
        <Bar width="min(420px, 100%)" height={11} />
      </div>

      <CardSkeleton title={170}>
        <div className={flow.form}>
          <FieldSkeleton label={120} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            <FieldSkeleton label={90} />
            <FieldSkeleton label={110} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            <FieldSkeleton label={84} />
            <FieldSkeleton label={96} />
          </div>
          <FieldSkeleton label={150} />
          <div className={flow.field}>
            <Bar width={110} height={10} />
            <Bar width="100%" height={110} radius={9} />
          </div>
        </div>
      </CardSkeleton>

      <CardSkeleton title={140}>
        <div className={flow.logoRow}>
          <Bar width={78} height={78} radius={16} />
          <div style={{ display: "grid", gap: 8, flex: 1 }}>
            <Bar width={160} height={11} />
            <Bar width={220} height={9} />
            <Bar width={120} height={32} radius={8} />
          </div>
        </div>
      </CardSkeleton>

      <div className={flow.actions}>
        <Bar width={100} height={40} radius={9} />
        <span style={{ flex: 1 }} />
        <Bar width={190} height={40} radius={9} tone="accent" />
      </div>
    </div>
  );
}

function DocumentsSkeleton() {
  return (
    <div className={flow.form} role="status" aria-live="polite" aria-busy="true">
      <LoadingLabel />
      <div style={{ display: "grid", gap: 8 }}>
        <Bar width="min(360px, 100%)" height={28} />
        <Bar width="min(560px, 100%)" height={11} />
      </div>

      <CardSkeleton title={190}>
        <div style={{ display: "grid", gap: 12 }}>
          {range(4).map((document) => (
            <div
              key={document}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                border: "1px solid var(--color-line)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <Circle size={34} />
              <span style={{ display: "grid", gap: 6, flex: 1 }}>
                <Bar width="min(220px, 100%)" height={11} />
                <Bar width="min(150px, 100%)" height={9} />
              </span>
              <Bar width={92} height={32} radius={8} />
            </div>
          ))}
        </div>
      </CardSkeleton>

      <CardSkeleton title={210}>
        <div className={flow.form}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            <FieldSkeleton label={110} />
            <FieldSkeleton label={96} />
          </div>
          <FieldSkeleton label={130} />
          <FieldSkeleton label={88} />
        </div>
      </CardSkeleton>

      <div className={flow.actions}>
        <Bar width={90} height={40} radius={9} />
        <span style={{ flex: 1 }} />
        <Bar width={210} height={40} radius={9} tone="accent" />
      </div>
    </div>
  );
}

function VerificationSkeleton() {
  return (
    <div className={flow.form} role="status" aria-live="polite" aria-busy="true">
      <LoadingLabel />
      <div style={{ display: "grid", gap: 8 }}>
        <Bar width="min(380px, 100%)" height={28} />
        <Bar width="min(520px, 100%)" height={11} />
      </div>

      <CardSkeleton title={200}>
        <div style={{ display: "grid", gap: 10 }}>
          <Bar width={130} height={24} radius={999} />
          <Bar width="min(280px, 100%)" height={14} />
          <Bar width="100%" height={10} />
          <Bar width="82%" height={10} />
        </div>
      </CardSkeleton>

      <CardSkeleton title={150}>
        <ol className={flow.timeline} style={{ padding: 0, margin: 0 }}>
          {range(3).map((step) => (
            <li key={step} className={flow.timelineItem}>
              <Circle size={22} />
              <div style={{ display: "grid", gap: 6, flex: 1 }}>
                <Bar width="min(200px, 100%)" height={11} />
                <Bar width="min(280px, 100%)" height={9} />
              </div>
            </li>
          ))}
        </ol>
      </CardSkeleton>

      <CardSkeleton title={170}>
        <div style={{ display: "grid", gap: 12 }}>
          {range(3).map((document) => (
            <div
              key={document}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <Circle size={28} />
              <Bar width="min(200px, 100%)" height={10} />
              <Bar width={60} height={20} radius={999} />
            </div>
          ))}
        </div>
      </CardSkeleton>

      <div className={flow.actions}>
        <Bar width={120} height={38} radius={8} />
        <span style={{ flex: 1 }} />
        <Bar width={140} height={38} radius={8} />
      </div>
    </div>
  );
}

export function CompanyFlowSkeleton({
  step,
  narrow = false,
  variant = "data",
}: CompanyFlowSkeletonProps) {
  const body =
    variant === "verification"
      ? VerificationSkeleton()
      : variant === "documents"
        ? DocumentsSkeleton()
        : DataSkeleton();

  return (
    <CompanyFlowShell
      step={step}
      narrow={narrow}
      aside={narrow ? undefined : <AsideSkeleton />}
    >
      {body}
    </CompanyFlowShell>
  );
}
