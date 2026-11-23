import { Bar, Circle, LoadingLabel } from "./skeleton-primitives";
import dash from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import applicant from "@/components/pages/applicant/applicant.module.css";

const range = (length: number) => Array.from({ length }, (_, index) => index);

function HeadingSkeleton({ action = true }: { action?: boolean }) {
  return (
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
        <Bar width="min(230px, 100%)" height={30} />
        <Bar width="min(400px, 100%)" height={14} />
      </div>
      {action ? <Bar width={132} height={36} radius={10} /> : null}
    </div>
  );
}

function SideCardSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <section className={applicant.profileCard}>
      <Bar width={150} height={15} />
      <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
        {range(rows).map((row) => (
          <div key={row} style={{ display: "grid", gap: 6 }}>
            <Bar width="min(180px, 100%)" height={11} />
            <Bar width={`${56 + ((row * 11) % 30)}%`} height={9} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ApplicantOverviewSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <HeadingSkeleton />

      <section className={applicant.companyBanner}>
        <Circle size={44} />
        <span style={{ display: "grid", gap: 8, flex: 1 }}>
          <Bar width="min(280px, 100%)" height={14} />
          <Bar width="min(420px, 100%)" height={10} />
        </span>
        <Bar width={140} height={36} radius={10} />
      </section>

      <div className={applicant.statsGrid}>
        {range(4).map((stat) => (
          <div key={stat} className={applicant.statCard}>
            <Bar width={44} height={26} />
            <Bar width="min(112px, 100%)" height={10} />
          </div>
        ))}
      </div>

      <section className={applicant.statusCard}>
        <Bar width={170} height={16} />
        <div className={applicant.statusBoard} style={{ marginTop: 18 }}>
          {range(5).map((column) => (
            <div key={column} className={applicant.statusColumn}>
              <div className={applicant.statusColumnHead}>
                <Bar width={88} height={12} />
                <Bar width={22} height={18} radius={999} />
              </div>
              <div className={applicant.statusColumnBody}>
                {range(column === 0 ? 2 : 1).map((card) => (
                  <div key={card} className={applicant.statusJob}>
                    <Bar width="min(140px, 100%)" height={11} />
                    <Bar width="min(100px, 100%)" height={9} />
                    <Bar width={76} height={20} radius={999} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className={applicant.bottomGrid}>
        <section className={applicant.interviewCard}>
          <Bar width={180} height={16} />
          <div className={applicant.interviewList} style={{ marginTop: 16 }}>
            {range(2).map((row) => (
              <div key={row} className={applicant.interviewRow}>
                <Bar width={54} height={54} radius={12} />
                <span style={{ display: "grid", gap: 6, flex: 1 }}>
                  <Bar width="min(190px, 100%)" height={12} />
                  <Bar width="min(150px, 100%)" height={10} />
                </span>
                <Bar width={92} height={30} radius={8} />
              </div>
            ))}
          </div>
        </section>

        <section className={applicant.interviewCard}>
          <Bar width={200} height={16} />
          <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
            {range(3).map((row) => (
              <div
                key={row}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <Circle size={38} />
                <span style={{ display: "grid", gap: 6, flex: 1 }}>
                  <Bar width="min(160px, 100%)" height={11} />
                  <Bar width="min(120px, 100%)" height={9} />
                </span>
                <Bar width={38} height={16} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function ApplicantApplicationsSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <HeadingSkeleton />

      <div className={applicant.toolbar}>
        <div className={applicant.tabs}>
          {range(4).map((tab) => (
            <Bar key={tab} width={82} height={30} radius={999} />
          ))}
        </div>
        <Bar width={230} height={36} radius={10} />
      </div>

      <section className={applicant.tableCard}>
        <div className={applicant.tableWrap} aria-hidden="true">
          <table className={applicant.table}>
            <thead>
              <tr>
                {range(5).map((column) => (
                  <th key={column} scope="col">
                    <Bar width={column === 0 ? 130 : 68} height={11} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {range(6).map((row) => (
                <tr key={row}>
                  <td>
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Circle size={30} />
                      <span style={{ display: "grid", gap: 5, flex: 1 }}>
                        <Bar width="min(160px, 100%)" height={12} />
                        <Bar width="min(110px, 100%)" height={9} />
                      </span>
                    </span>
                  </td>
                  {range(4).map((column) => (
                    <td key={column}>
                      <Bar
                        width={column === 3 ? 58 : "min(86px, 100%)"}
                        height={column === 3 ? 22 : 11}
                        radius={column === 3 ? 999 : 6}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export function ApplicantDetailSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <HeadingSkeleton />

      <section className={applicant.detailHero}>
        <Circle size={56} />
        <div style={{ display: "grid", gap: 8, flex: 1 }}>
          <Bar width="min(280px, 100%)" height={22} />
          <Bar width="min(180px, 100%)" height={12} />
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {range(3).map((pill) => (
              <Bar key={pill} width={82} height={24} radius={999} />
            ))}
          </div>
        </div>
        <Bar width={70} height={44} radius={10} />
      </section>

      <div className={applicant.profileGrid}>
        <div className={applicant.profileMain}>
          <section className={applicant.detailCard}>
            <Bar width={180} height={16} />
            <div style={{ display: "grid", gap: 18, marginTop: 20 }}>
              {range(4).map((step) => (
                <div
                  key={step}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                >
                  <Circle size={18} />
                  <span style={{ display: "grid", gap: 6, flex: 1 }}>
                    <Bar width="min(180px, 100%)" height={12} />
                    <Bar width="min(240px, 100%)" height={9} />
                  </span>
                </div>
              ))}
            </div>
          </section>
          <section className={applicant.detailCard}>
            <Bar width={160} height={16} />
            <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
              <Bar width="100%" height={11} />
              <Bar width="92%" height={11} />
              <Bar width="74%" height={11} />
            </div>
          </section>
        </div>
        <div className={applicant.profileSide}>
          <SideCardSkeleton rows={3} />
          <SideCardSkeleton rows={2} />
        </div>
      </div>
    </div>
  );
}

export function ApplicantSavedSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <HeadingSkeleton action={false} />

      <div className={applicant.savedLayout}>
        <aside className={applicant.collectionCard}>
          <Bar width={100} height={15} />
          <div className={applicant.collectionList} style={{ marginTop: 14 }}>
            {range(4).map((item) => (
              <div
                key={item}
                className={applicant.collectionButton}
                aria-hidden="true"
              >
                <Bar width="min(120px, 100%)" height={11} />
                <Bar width={24} height={18} radius={999} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Bar width={128} height={32} radius={8} />
          </div>
        </aside>

        <div className={applicant.savedGrid}>
          {range(6).map((card) => (
            <article key={card} className={applicant.savedCard}>
              <div className={applicant.savedTop}>
                <Circle size={36} />
                <Bar width={26} height={26} radius={8} />
              </div>
              <Bar width="min(210px, 100%)" height={14} />
              <Bar width="min(140px, 100%)" height={11} />
              <Bar width={96} height={12} />
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                {range(3).map((tag) => (
                  <Bar key={tag} width={62} height={22} radius={999} />
                ))}
              </div>
              <Bar width={100} height={10} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ApplicantInterviewSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <HeadingSkeleton />

      <section className={applicant.weekCard}>
        <div className={applicant.weekStrip}>
          {range(7).map((day) => (
            <div key={day} style={{ display: "grid", justifyItems: "center", gap: 7 }}>
              <Bar width={36} height={9} />
              <Bar width={24} height={18} />
              <Bar width={42} height={9} />
            </div>
          ))}
        </div>
      </section>

      <div className={applicant.interviewPageGrid}>
        <div className={applicant.profileMain}>
          <section className={applicant.interviewDetailCard}>
            <Bar width={230} height={18} />
            <div className={applicant.interviewFacts} style={{ marginTop: 20 }}>
              {range(4).map((fact) => (
                <div key={fact} className={applicant.fact}>
                  <Bar width={56} height={9} />
                  <Bar width="min(120px, 100%)" height={11} />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gap: 10, marginTop: 22 }}>
              <Bar width="100%" height={11} />
              <Bar width="88%" height={11} />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <Bar width={132} height={38} radius={9} />
              <Bar width={110} height={38} radius={9} />
            </div>
          </section>
        </div>
        <div className={applicant.profileSide}>
          <SideCardSkeleton rows={3} />
        </div>
      </div>
    </div>
  );
}

export function ApplicantProfileSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <HeadingSkeleton />

      <div className={applicant.profileGrid}>
        <div className={applicant.profileMain}>
          <section className={applicant.detailCard}>
            <Bar width={120} height={16} />
            <div className={applicant.formGrid} style={{ marginTop: 20 }}>
              {range(6).map((field) => (
                <div key={field} style={{ display: "grid", gap: 7 }}>
                  <Bar width={90} height={10} />
                  <Bar width="100%" height={42} radius={9} />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gap: 7, marginTop: 18 }}>
              <Bar width={110} height={10} />
              <Bar width="100%" height={96} radius={9} />
            </div>
            <div style={{ marginTop: 20 }}>
              <Bar width={150} height={38} radius={9} />
            </div>
          </section>
        </div>
        <div className={applicant.profileSide}>
          <section className={applicant.profileCard}>
            <div
              style={{ display: "grid", justifyItems: "center", gap: 10 }}
            >
              <Circle size={64} />
              <Bar width={140} height={14} />
              <Bar width={100} height={10} />
            </div>
          </section>
          <SideCardSkeleton rows={4} />
        </div>
      </div>
    </div>
  );
}

export function ApplicantSettingsSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <HeadingSkeleton action={false} />

      <div className={applicant.settingsLayout}>
        <nav className={applicant.settingsNav}>
          {range(4).map((item) => (
            <Bar key={item} width="100%" height={34} radius={8} />
          ))}
        </nav>
        <div className={applicant.settingsContent}>
          {range(2).map((section) => (
            <section key={section} className={applicant.settingsSection}>
              <Bar width={160} height={16} />
              <div className={applicant.formGrid} style={{ marginTop: 18 }}>
                {range(4).map((field) => (
                  <div key={field} style={{ display: "grid", gap: 7 }}>
                    <Bar width={86} height={10} />
                    <Bar width="100%" height={42} radius={9} />
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
                {range(3).map((row) => (
                  <div
                    key={row}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Bar width="min(220px, 100%)" height={11} />
                    <span style={{ flex: 1 }} />
                    <Bar width={42} height={22} radius={999} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
