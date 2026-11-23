import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Bar, Circle, LoadingLabel } from "./skeleton-primitives";
import course from "@/components/pages/courses/course-pages.module.css";

const range = (length: number) => Array.from({ length }, (_, index) => index);

function BreadcrumbSkeleton() {
  return (
    <div className={course.breadcrumbWrap}>
      <div className={course.breadcrumb}>
        {range(3).map((item) => (
          <Bar key={item} width={item === 2 ? 160 : 62} height={11} />
        ))}
      </div>
    </div>
  );
}

export function CourseDetailSkeleton() {
  return (
    <>
      <div
        className={course.page}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <LoadingLabel />
        <BreadcrumbSkeleton />

        <section className={course.hero}>
          <div className={course.heroLeft}>
            <div className={course.tagRow}>
              {range(3).map((tag) => (
                <Bar key={tag} width={78} height={24} radius={999} />
              ))}
            </div>
            <Bar width="min(520px, 100%)" height={40} />
            <Bar width="min(460px, 100%)" height={14} />
            <Bar width="min(380px, 100%)" height={14} />
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <Bar width={160} height={12} />
              <Bar width={90} height={12} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Circle size={30} />
              <Bar width={220} height={11} />
            </div>
          </div>
          <div className={course.preview}>
            <Bar
              width={64}
              height={64}
              radius="50%"
              tone="dark"
              style={{ margin: "auto" }}
            />
          </div>
        </section>

        <div className={course.content}>
          <main className={course.main}>
            <div className={course.tabs}>
              {range(4).map((tab) => (
                <Bar key={tab} width={68} height={12} />
              ))}
            </div>

            <Card className={course.card}>
              <Bar width={230} height={18} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 14,
                  marginTop: 18,
                }}
              >
                {range(6).map((item) => (
                  <div
                    key={item}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Circle size={20} />
                    <Bar width="min(180px, 100%)" height={11} />
                  </div>
                ))}
              </div>
            </Card>

            <Card className={course.card}>
              <Bar width={140} height={18} />
              <Bar width={200} height={10} />
              <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
                {range(4).map((row) => (
                  <div
                    key={row}
                    className={course.module}
                    style={{ padding: 16 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <Bar width="min(240px, 100%)" height={12} />
                      <Bar width={60} height={10} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={course.card}>
              <Bar width={130} height={18} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginTop: 18,
                }}
              >
                <Circle size={56} />
                <div style={{ display: "grid", gap: 8, flex: 1 }}>
                  <Bar width="min(180px, 100%)" height={13} />
                  <Bar width="min(140px, 100%)" height={10} />
                  <Bar width="min(260px, 100%)" height={9} />
                </div>
              </div>
            </Card>
          </main>

          <aside className={course.sidebar}>
            <Card className={course.priceCard}>
              <Bar width={120} height={30} />
              <Bar width={160} height={12} />
              <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
                <Bar width="100%" height={44} radius={9} tone="accent" />
                <Bar width="100%" height={44} radius={9} />
              </div>
              <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
                {range(4).map((row) => (
                  <Bar key={row} width="100%" height={10} />
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}

export function CoursePathSkeleton() {
  return (
    <>
      <div
        className={course.page}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <LoadingLabel />
        <BreadcrumbSkeleton />

        <section className={`${course.hero} ${course.pathHero}`}>
          <div className={course.heroLeft}>
            <div className={course.pathTags}>
              {range(3).map((tag) => (
                <Bar key={tag} width={100} height={24} radius={999} />
              ))}
            </div>
            <Bar width="min(480px, 100%)" height={42} />
            <Bar width="min(460px, 100%)" height={14} />
            <Bar width="min(400px, 100%)" height={14} />
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Bar width={154} height={40} radius={9} />
              <Bar width={140} height={40} radius={9} />
            </div>
          </div>
          <Card className={course.progressCard}>
            <Bar width={120} height={11} />
            <Bar width={78} height={32} />
            <Bar width="100%" height={8} radius={999} />
            <Bar width={190} height={9} />
          </Card>
        </section>

        <div className={course.content}>
          <main className={course.main}>
            <div className={course.steps}>
              {range(4).map((step) => (
                <div key={step} className={course.step}>
                  <div className={course.stepMarker}>
                    <Circle size={36} />
                  </div>
                  <Card className={course.stepCard}>
                    <Bar width={84} height={22} radius={999} />
                    <Bar width="min(260px, 100%)" height={18} />
                    <Bar width="min(380px, 100%)" height={11} />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginTop: 18,
                      }}
                    >
                      <Circle size={38} />
                      <span style={{ display: "grid", gap: 6, flex: 1 }}>
                        <Bar width="min(180px, 100%)" height={12} />
                        <Bar width="min(140px, 100%)" height={9} />
                      </span>
                      <Bar width={68} height={11} />
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
                      {range(3).map((skill) => (
                        <Bar key={skill} width={62} height={22} radius={999} />
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </main>

          <aside className={course.sidebar}>
            <Card className={course.summaryCard}>
              <Bar width={150} height={18} />
              <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                {range(5).map((row) => (
                  <div
                    key={row}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <Bar width={88} height={10} />
                    <Bar width={110} height={10} />
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
