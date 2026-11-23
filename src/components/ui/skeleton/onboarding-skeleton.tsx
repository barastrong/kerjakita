import { Card } from "@/components/ui/card";
import { Bar, Circle, LoadingLabel } from "./skeleton-primitives";
import onboarding from "@/components/pages/onboarding/onboarding-page.module.css";

const range = (length: number) => Array.from({ length }, (_, index) => index);

export function OnboardingSkeleton() {
  return (
    <div
      className={onboarding.page}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />

      <section className={onboarding.hero}>
        <div className={onboarding.heroInner} style={{ display: "grid", gap: 12 }}>
          <Bar width={160} height={10} />
          <Bar width="min(360px, 100%)" height={38} />
          <Bar width="min(520px, 100%)" height={13} />
        </div>
      </section>

      <main className={onboarding.content}>
        <Card className={onboarding.card}>
          <aside className={onboarding.rail}>
            <Bar width={54} height={10} />
            <div
              className={onboarding.railList}
              style={{ display: "grid", gap: 10, marginTop: 16 }}
            >
              {range(3).map((step) => (
                <div
                  key={step}
                  className={onboarding.railItem}
                  style={{ pointerEvents: "none" }}
                >
                  <Circle size={26} />
                  <span style={{ display: "grid", gap: 6, flex: 1 }}>
                    <Bar width="min(110px, 100%)" height={11} />
                    <Bar width={70} height={9} />
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gap: 7, marginTop: 18 }}>
              <Bar width="100%" height={9} />
              <Bar width="82%" height={9} />
              <Bar width="64%" height={9} />
            </div>
          </aside>

          <div className={onboarding.body}>
            <div className={onboarding.progress}>
              <span className={onboarding.progressBars} aria-hidden="true">
                {range(3).map((step) => (
                  <span
                    key={step}
                    className={step === 0 ? onboarding.progressFill : ""}
                  />
                ))}
              </span>
              <Bar width={96} height={9} />
            </div>

            <Bar width="min(280px, 100%)" height={24} />
            <Bar width="min(420px, 100%)" height={11} />

            <div className={onboarding.options} style={{ marginTop: 22 }}>
              {range(5).map((option) => (
                <div
                  key={option}
                  className={onboarding.option}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <Bar width={18} height={18} radius={50} />
                  <Bar width={`${38 + ((option * 9) % 28)}%`} height={11} />
                </div>
              ))}
            </div>

            <div className={onboarding.actions}>
              <Bar width={150} height={40} radius={9} tone="accent" />
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
