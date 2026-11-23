import { Card } from "@/components/ui/card";
import { Bar, Circle, LoadingLabel } from "./skeleton-primitives";
import company from "@/components/pages/company/company-page.module.css";

const range = (length: number) => Array.from({ length }, (_, index) => index);

function CompanyCoverSkeleton() {
  return (
    <>
      <section className={company.cover} aria-hidden="true">
        <div className={company.coverInner}>
          <div className={company.crumb}>
            <Bar width={70} height={10} tone="dark" />
            <Bar width={12} height={10} tone="dark" />
            <Bar width={150} height={10} tone="dark" />
          </div>
          <div className={company.coverRow}>
            <Bar width={88} height={88} radius={20} tone="dark" />
            <div className={company.coverInfo}>
              <Bar width="min(320px, 100%)" height={30} tone="dark" />
              <Bar width="min(430px, 100%)" height={12} tone="dark" />
              <Bar width="min(240px, 100%)" height={12} tone="dark" />
            </div>
            <div className={company.coverActions}>
              <Bar width={120} height={38} radius={9} tone="dark" />
              <Bar width={44} height={38} radius={9} tone="dark" />
            </div>
          </div>
        </div>
      </section>

      <nav className={company.tabs} aria-hidden="true">
        {range(5).map((tab) => (
          <span key={tab} style={{ display: "grid", gap: 10, padding: "14px 0" }}>
            <Bar width={tab === 0 ? 70 : 92} height={12} />
            <Bar width="100%" height={2} />
          </span>
        ))}
      </nav>
    </>
  );
}

function SideCardSkeleton({
  rows = 3,
  action = false,
}: {
  rows?: number;
  action?: boolean;
}) {
  return (
    <Card className={company.card}>
      <Bar width={160} height={16} />
      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {range(rows).map((row) => (
          <div
            key={row}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <Bar width={`${48 + ((row * 13) % 34)}%`} height={10} />
            <Bar width={72} height={10} />
          </div>
        ))}
      </div>
      {action ? (
        <div style={{ marginTop: 18 }}>
          <Bar width="100%" height={34} radius={8} />
        </div>
      ) : null}
    </Card>
  );
}

export function CompanyDetailSkeleton() {
  return (
    <div
      className={company.page}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <CompanyCoverSkeleton />

      <main className={company.content}>
        <div className={company.main}>
          <Card className={company.card}>
            <Bar width={220} height={18} />
            <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
              <Bar width="100%" height={11} />
              <Bar width="96%" height={11} />
              <Bar width="88%" height={11} />
              <Bar width="64%" height={11} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 16,
                marginTop: 22,
              }}
            >
              {range(4).map((fact) => (
                <div key={fact} style={{ display: "grid", gap: 6 }}>
                  <Bar width={72} height={9} />
                  <Bar width="min(130px, 100%)" height={11} />
                </div>
              ))}
            </div>
          </Card>

          <Card className={company.card}>
            <Bar width={150} height={18} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 12,
                marginTop: 16,
              }}
            >
              {range(6).map((item) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: 9 }}
                >
                  <Circle size={22} />
                  <Bar width={90} height={10} />
                </div>
              ))}
            </div>
          </Card>

          <Card className={company.card}>
            <Bar width={180} height={18} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginTop: 20,
              }}
            >
              <Bar width={72} height={52} />
              <div style={{ display: "grid", gap: 10, flex: 1 }}>
                {range(4).map((row) => (
                  <div
                    key={row}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Bar width={62} height={9} />
                    <Bar width={`${40 + row * 12}%`} height={8} />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className={company.card}>
            <Bar width={160} height={18} />
            {range(3).map((review) => (
              <div
                key={review}
                style={{
                  display: "grid",
                  gap: 10,
                  paddingTop: 18,
                  marginTop: 18,
                  borderTop: "1px solid var(--color-line)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Circle size={34} />
                  <span style={{ display: "grid", gap: 5, flex: 1 }}>
                    <Bar width={120} height={11} />
                    <Bar width={90} height={9} />
                  </span>
                  <Bar width={58} height={10} />
                </div>
                <Bar width="100%" height={10} />
                <Bar width="82%" height={10} />
              </div>
            ))}
          </Card>
        </div>

        <aside className={company.sidebar}>
          <Card className={company.card}>
            <Bar width={150} height={16} />
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              {range(3).map((job) => (
                <div
                  key={job}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <Circle size={32} />
                  <span style={{ display: "grid", gap: 5, flex: 1 }}>
                    <Bar width="min(150px, 100%)" height={11} />
                    <Bar width="min(100px, 100%)" height={9} />
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18 }}>
              <Bar width="100%" height={34} radius={8} />
            </div>
          </Card>
          <SideCardSkeleton rows={4} />
        </aside>
      </main>
    </div>
  );
}

export function CompanySectionSkeleton() {
  return (
    <div
      className={company.page}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <CompanyCoverSkeleton />

      <main className={company.content}>
        <div className={company.main}>
          <Card className={company.card}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "grid", gap: 8 }}>
                <Bar width={210} height={18} />
                <Bar width={300} height={11} />
              </div>
              <Bar width={110} height={34} radius={8} />
            </div>
            <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
              {range(6).map((row) => (
                <div
                  key={row}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    paddingTop: 14,
                    borderTop:
                      row === 0 ? undefined : "1px solid var(--color-line)",
                  }}
                >
                  <Circle size={30} />
                  <span style={{ display: "grid", gap: 6, flex: 1 }}>
                    <Bar width="min(220px, 100%)" height={12} />
                    <Bar width="min(320px, 100%)" height={9} />
                  </span>
                  <Bar width={72} height={24} radius={999} />
                </div>
              ))}
            </div>
          </Card>
        </div>
        <aside className={company.sidebar}>
          <SideCardSkeleton rows={4} action />
          <SideCardSkeleton rows={3} />
        </aside>
      </main>
    </div>
  );
}
