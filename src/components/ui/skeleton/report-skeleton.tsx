import { Card } from "@/components/ui/card";
import { Bar, LoadingLabel } from "./skeleton-primitives";
import apply from "@/components/pages/apply/apply-page.module.css";

export function ReportSkeleton() {
  return (
    <div
      className={apply.page}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <nav className={apply.breadcrumb} aria-hidden="true">
        <Bar width={70} height={10} />
        <Bar width={180} height={10} />
        <Bar width={54} height={10} />
      </nav>

      <main className={apply.content}>
        <Card className={apply.form}>
          <div className={apply.formBody}>
            <div style={{ display: "grid", gap: 9 }}>
              <Bar width={120} height={10} />
              <Bar width="min(420px, 100%)" height={28} />
              <Bar width="min(520px, 100%)" height={11} />
            </div>

            <div className={apply.field}>
              <Bar width={110} height={10} />
              <Bar width="100%" height={44} radius={9} />
            </div>

            <div className={apply.field}>
              <Bar width={140} height={10} />
              <Bar width="100%" height={110} radius={9} />
            </div>

            <div className={apply.field}>
              <Bar width={180} height={10} />
              <Bar width="100%" height={44} radius={9} />
            </div>

            <div className={apply.actions}>
              <Bar width={84} height={40} radius={9} />
              <span className={apply.actionsSpacer} />
              <Bar width={132} height={40} radius={9} />
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

