import { Bar, Circle, LoadingLabel } from "./skeleton-primitives";
import dash from "@/components/pages/recruiter/dashboard/dashboard.module.css";

const range = (length: number) => Array.from({ length }, (_, index) => index);

function PageHeadingSkeleton({ action = true }: { action?: boolean }) {
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
        <Bar width="min(240px, 100%)" height={30} />
        <Bar width="min(380px, 100%)" height={14} />
      </div>
      {action ? <Bar width={132} height={38} radius={10} /> : null}
    </div>
  );
}

function ToolbarSkeleton({ tabs = 3 }: { tabs?: number }) {
  return (
    <div className={dash.toolbar}>
      <div className={dash.tabs}>
        {range(tabs).map((tab) => (
          <Bar key={tab} width={92} height={32} radius={999} />
        ))}
      </div>
      <Bar width={220} height={36} radius={10} />
    </div>
  );
}

function TableSkeleton({
  columns = 6,
  rows = 6,
}: {
  columns?: number;
  rows?: number;
}) {
  return (
    <div className={dash.tableCard} aria-hidden="true">
      <div className={dash.tableScroll}>
        <table className={dash.table}>
          <thead>
            <tr>
              {range(columns).map((column) => (
                <th key={column} scope="col">
                  <Bar width={column === 0 ? 120 : 72} height={11} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {range(rows).map((row) => (
              <tr key={row}>
                {range(columns).map((column) => (
                  <td key={column}>
                    {column === 0 ? (
                      <span
                        style={{ display: "flex", alignItems: "center", gap: 10 }}
                      >
                        <Circle size={28} />
                        <span style={{ display: "grid", gap: 5, flex: 1 }}>
                          <Bar width="min(160px, 100%)" height={12} />
                          <Bar width="min(110px, 100%)" height={10} />
                        </span>
                      </span>
                    ) : (
                      <Bar
                        width={column === columns - 1 ? 54 : "min(88px, 100%)"}
                        height={12}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CardStack({ rows = 3 }: { rows?: number }) {
  return (
    <section className={dash.card}>
      <Bar width={180} height={16} />
      <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
        {range(rows).map((row) => (
          <div key={row} style={{ display: "grid", gap: 7 }}>
            <Bar width="min(220px, 100%)" height={12} />
            <Bar width={`${68 + ((row * 13) % 24)}%`} height={10} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function RecruiterOverviewSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <PageHeadingSkeleton action={false} />

      <div className={dash.stats}>
        {range(4).map((stat) => (
          <div key={stat} className={dash.statCard}>
            <Bar width={58} height={26} />
            <Bar width="min(130px, 100%)" height={11} />
            <Bar width="min(90px, 100%)" height={9} />
          </div>
        ))}
      </div>

      <div className={dash.contentGrid}>
        <div className={dash.leftColumn}>
          <section className={`${dash.card} ${dash.queueCard}`}>
            <Bar width={210} height={16} />
            <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
              {range(4).map((row) => (
                <div key={row} className={dash.queueRow} aria-hidden="true">
                  <Circle size={36} />
                  <span style={{ display: "grid", gap: 6, flex: 1 }}>
                    <Bar width="min(170px, 100%)" height={12} />
                    <Bar width="min(240px, 100%)" height={10} />
                  </span>
                  <Bar width={64} height={26} radius={999} />
                </div>
              ))}
            </div>
          </section>
          <CardStack rows={4} />
        </div>

        <div className={dash.rightColumn}>
          <CardStack rows={3} />
          <CardStack rows={3} />
        </div>
      </div>
    </div>
  );
}

export function RecruiterBoardSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <PageHeadingSkeleton />
      <ToolbarSkeleton tabs={4} />

      <div className={dash.board}>
        {range(4).map((column) => (
          <section key={column} className={dash.column}>
            <div className={dash.columnHead}>
              <Bar width={96} height={14} />
              <Bar width={26} height={20} radius={999} />
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {range(column === 0 ? 3 : 2).map((card) => (
                <div key={card} className={dash.candidateCard}>
                  <div className={dash.candidateTop}>
                    <Circle size={36} />
                    <div className={dash.candidateCardText}>
                      <Bar width="min(150px, 100%)" height={12} />
                      <Bar width="min(110px, 100%)" height={10} />
                    </div>
                  </div>
                  <div className={dash.candidateBottom}>
                    <Bar width={68} height={22} radius={999} />
                    <Bar width={48} height={10} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export function RecruiterLowonganSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <PageHeadingSkeleton />
      <ToolbarSkeleton />
      <TableSkeleton columns={6} rows={7} />
    </div>
  );
}

export function RecruiterDetailSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <PageHeadingSkeleton />

      <div className={dash.contentGrid}>
        <div className={dash.leftColumn}>
          <section className={dash.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Circle size={64} />
              <div style={{ display: "grid", gap: 8, flex: 1 }}>
                <Bar width="min(240px, 100%)" height={20} />
                <Bar width="min(180px, 100%)" height={12} />
              </div>
              <Bar width={64} height={34} radius={10} />
            </div>
          </section>
          <CardStack rows={3} />
          <CardStack rows={3} />
        </div>
        <div className={dash.rightColumn}>
          <CardStack rows={4} />
          <CardStack rows={2} />
        </div>
      </div>
    </div>
  );
}

export function RecruiterScheduleSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <PageHeadingSkeleton action={false} />

      <div className={`${dash.contentGrid} ${dash.scheduleContent}`}>
        <div className={dash.leftColumn}>
          <section className={`${dash.card} ${dash.pickCard}`}>
            <Bar width={210} height={16} />
            <div className={dash.scheduleGrid} style={{ marginTop: 18 }}>
              <div className={dash.calendar}>
                <div className={dash.calendarHead}>
                  <Bar width={130} height={14} />
                  <Bar width={64} height={26} radius={8} />
                </div>
                <div className={dash.calendarGrid}>
                  {range(35).map((cell) => (
                    <Bar
                      key={cell}
                      width="100%"
                      height={30}
                      radius={8}
                      style={{ opacity: cell % 7 === 0 ? 0.45 : 1 }}
                    />
                  ))}
                </div>
              </div>
              <div className={dash.timeColumn}>
                <Bar width="min(180px, 100%)" height={13} />
                <Bar width={96} height={10} />
                <div className={dash.timeSlots} style={{ marginTop: 12 }}>
                  {range(8).map((slot) => (
                    <Bar key={slot} width="100%" height={34} radius={8} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className={`${dash.rightColumn} ${dash.scheduleRight}`}>
          <section className={`${dash.card} ${dash.interviewDetailCard}`}>
            <Bar width={180} height={16} />
            <div style={{ display: "grid", gap: 18, marginTop: 20 }}>
              {range(3).map((field) => (
                <div key={field} style={{ display: "grid", gap: 7 }}>
                  <Bar width={110} height={11} />
                  <Bar width="100%" height={44} radius={9} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function RecruiterWeekSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <PageHeadingSkeleton action={false} />

      <div className={dash.weekToolbar}>
        {range(4).map((pill) => (
          <Bar key={pill} width={pill === 1 ? 154 : 110} height={34} radius={999} />
        ))}
      </div>

      <div className={dash.weekBoard}>
        {range(5).map((day) => (
          <section key={day} className={dash.dayColumn}>
            <div className={dash.dayHead}>
              <Bar width={44} height={10} />
              <Bar width={26} height={22} />
            </div>
            <div className={dash.dayEvents}>
              {range(day % 2 === 0 ? 2 : 1).map((event) => (
                <div key={event} className={dash.eventCard}>
                  <Bar width={42} height={10} />
                  <Bar width="min(100px, 100%)" height={12} />
                  <Bar width="min(80px, 100%)" height={9} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className={dash.weekBottom}>
        <section className={`${dash.card} ${dash.queueCard}`}>
          <Bar width={230} height={16} />
          <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
            {range(3).map((row) => (
              <div key={row} className={dash.queueRow}>
                <Circle size={34} />
                <span style={{ display: "grid", gap: 6, flex: 1 }}>
                  <Bar width="min(150px, 100%)" height={12} />
                  <Bar width="min(200px, 100%)" height={10} />
                </span>
                <Bar width={104} height={30} radius={8} />
              </div>
            ))}
          </div>
        </section>

        <section className={`${dash.card} ${dash.queueCard}`}>
          <Bar width={240} height={16} />
          <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
            {range(4).map((row) => (
              <div key={row} style={{ display: "grid", gap: 6 }}>
                <Bar width="min(150px, 100%)" height={11} />
                <Bar width={`${54 + row * 9}%`} height={9} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function RecruiterPostJobSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <PageHeadingSkeleton action={false} />

      <div className={dash.formGrid}>
        <section className={dash.formCard}>
          <Bar width={190} height={16} />
          <div style={{ display: "grid", gap: 18, marginTop: 20 }}>
            {range(3).map((row) => (
              <div key={row} className={dash.twoCol}>
                <div className={dash.field}>
                  <Bar width={100} height={11} />
                  <Bar width="100%" height={44} radius={9} />
                </div>
                <div className={dash.field}>
                  <Bar width={80} height={11} />
                  <Bar width="100%" height={44} radius={9} />
                </div>
              </div>
            ))}
            <div className={dash.field}>
              <Bar width={90} height={11} />
              <Bar width="100%" height={120} radius={9} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {range(4).map((chip) => (
                <Bar key={chip} width={76} height={28} radius={999} />
              ))}
            </div>
          </div>
        </section>

        <aside className={dash.card}>
          <Bar width={170} height={16} />
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {range(4).map((row) => (
              <div key={row} style={{ display: "flex", gap: 10 }}>
                <Circle size={18} />
                <Bar width="min(180px, 100%)" height={11} />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export function RecruiterAccountSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <PageHeadingSkeleton action={false} />

      <section className={dash.formCard}>
        <div className={dash.previewTop}>
          <Circle size={48} />
          <span style={{ display: "grid", gap: 7, flex: 1 }}>
            <Bar width="min(180px, 100%)" height={14} />
            <Bar width="min(130px, 100%)" height={11} />
          </span>
        </div>
        {range(2).map((row) => (
          <div key={row} className={dash.twoCol}>
            {range(2).map((field) => (
              <div key={field} className={dash.field}>
                <Bar width={96} height={11} />
                <Bar width="100%" height={44} radius={9} />
              </div>
            ))}
          </div>
        ))}
        <Bar width="min(320px, 100%)" height={11} />
        <div className={dash.formActions}>
          <Bar width={148} height={38} radius={9} />
        </div>
      </section>
    </div>
  );
}

export function RecruiterCompanyProfileSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <PageHeadingSkeleton action={false} />

      <div className={dash.contentGrid}>
        <div className={dash.leftColumn}>
          <section className={dash.card}>
            <Bar width={160} height={16} />
            <div className={dash.infoGrid} style={{ marginTop: 20 }}>
              {range(4).map((field) => (
                <div key={field} className={dash.field}>
                  <Bar width={90} height={11} />
                  <Bar width="100%" height={42} radius={9} />
                </div>
              ))}
            </div>
            <div className={dash.field} style={{ marginTop: 18 }}>
              <Bar width={110} height={11} />
              <Bar width="100%" height={96} radius={9} />
            </div>
            <div className={dash.mediaRow} style={{ marginTop: 22 }}>
              <Bar width={96} height={96} radius={14} />
              <Bar width="100%" height={96} radius={14} />
            </div>
            <div className={dash.formActions} style={{ marginTop: 22 }}>
              <Bar width={148} height={38} radius={9} />
            </div>
          </section>
        </div>
        <div className={dash.rightColumn}>
          <CardStack rows={3} />
          <CardStack rows={3} />
        </div>
      </div>
    </div>
  );
}

export function RecruiterTeamSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <PageHeadingSkeleton />
      <TableSkeleton columns={5} rows={5} />
    </div>
  );
}
