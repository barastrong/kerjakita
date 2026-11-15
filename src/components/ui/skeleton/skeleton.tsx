import styles from "./skeleton.module.css";

const PUBLIC_CARDS = [0, 1, 2, 3, 4, 5, 6, 7];
const DASHBOARD_CARDS = [0, 1, 2, 3, 4, 5];
const JOBS = [0, 1, 2, 3, 4, 5];
const RAIL_GROUPS = [0, 1, 2, 3];
const PATH_ROWS = [0, 1, 2, 3];
const CHART_BARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const STATS = [0, 1, 2, 3];
const PRICE_CARDS = [0, 1, 2];

function Block({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={className ? `${styles.block} ${className}` : styles.block}
    />
  );
}

function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className ? `${styles.card} ${className}` : styles.card}
    >
      <Block className={styles.avatar} />
      <Block className={styles.lineWide} />
      <Block className={styles.lineShort} />
      <Block className={styles.lineTiny} />
      <Block className={styles.pill} />
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div role="status" aria-live="polite" className={styles.publicPage}>
      <span className={styles.srOnly}>Memuat halaman…</span>
      <div className={`${styles.hero} ${styles.heroLight}`} aria-hidden="true">
        <div className={styles.heroInner}>
          <div className={styles.homeHero}>
            <div>
              <Block className={styles.heroKicker} />
              <Block className={styles.homeTitle} />
              <Block className={styles.homeTitleShort} />
              <Block className={styles.heroText} />
              <Block className={styles.homeCta} />
            </div>
            <div className={styles.homeCollage}>
              <Block className={styles.homeCollageRow} />
              <Block className={styles.homeCollageRowTall} />
              <Block className={styles.homeCollageRow} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content} aria-hidden="true">
        <div className={styles.heading}>
          <Block className={styles.headingTitle} />
          <Block className={styles.headingAside} />
        </div>
        <Block className={styles.homePanel} />
        <div className={styles.grid}>
          {PUBLIC_CARDS.slice(0, 4).map((item) => (
            <CardSkeleton key={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function JobsSkeleton() {
  return (
    <div role="status" aria-live="polite" className={styles.publicPage}>
      <span className={styles.srOnly}>Memuat halaman…</span>
      <div className={styles.searchBand} aria-hidden="true">
        <div className={styles.heroInner}>
          <div className={styles.searchBar}>
            <Block className={styles.searchField} />
            <Block
              className={`${styles.searchField} ${styles.searchFieldNarrow}`}
            />
            <Block
              className={`${styles.searchField} ${styles.searchFieldNarrow}`}
            />
            <Block className={styles.searchButton} />
          </div>
        </div>
      </div>
      <div className={styles.jobsShell} aria-hidden="true">
        <div className={styles.rail}>
          {RAIL_GROUPS.map((group) => (
            <div key={group} className={styles.railGroup}>
              <Block className={styles.railHeading} />
              <Block className={styles.railLine} />
              <Block className={styles.railLine} />
              <Block className={`${styles.railLine} ${styles.railLineShort}`} />
            </div>
          ))}
        </div>
        <div className={styles.jobList}>
          {JOBS.map((item) => (
            <div key={item} className={styles.jobCard}>
              <Block className={styles.jobLogo} />
              <div className={styles.jobBody}>
                <Block className={styles.jobTitle} />
                <Block className={styles.jobSub} />
                <div className={styles.jobChips}>
                  <Block className={styles.jobChip} />
                  <Block className={styles.jobChip} />
                  <Block className={styles.jobChip} />
                </div>
              </div>
              <div className={styles.jobSide}>
                <Block className={styles.jobSalary} />
                <Block className={styles.jobAge} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SalarySkeleton() {
  return (
    <div role="status" aria-live="polite" className={styles.publicPage}>
      <span className={styles.srOnly}>Memuat halaman…</span>
      <div className={styles.hero} aria-hidden="true">
        <div className={styles.heroInner}>
          <Block className={styles.heroKicker} />
          <Block className={styles.heroTitle} />
          <Block className={styles.heroTitleShort} />
          <Block className={styles.heroText} />
          <div className={styles.salarySearch}>
            <Block className={styles.salaryField} />
            <Block className={styles.salaryField} />
            <Block
              className={`${styles.salaryField} ${styles.salaryFieldShort}`}
            />
            <Block className={styles.salaryButton} />
          </div>
        </div>
      </div>
      <div className={styles.salaryShell} aria-hidden="true">
        <div className={styles.panel}>
          <Block className={styles.panelMeta} />
          <Block className={styles.median} />
          <div className={styles.facts}>
            <Block className={styles.fact} />
            <Block className={styles.fact} />
            <Block className={styles.fact} />
          </div>
          <Block className={styles.panelTitle} />
          <div className={styles.chart}>
            {CHART_BARS.map((item) => (
              <Block key={item} className={styles.chartBar} />
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <Block className={styles.panelTitle} />
          <Block className={styles.salaryRow} />
          <Block className={styles.salaryRow} />
          <Block className={styles.salaryRow} />
          <Block className={styles.salaryRow} />
          <Block className={styles.salaryRow} />
        </div>
      </div>
    </div>
  );
}

export function CoursesSkeleton() {
  return (
    <div role="status" aria-live="polite" className={styles.publicPage}>
      <span className={styles.srOnly}>Memuat halaman…</span>
      <div className={styles.hero} aria-hidden="true">
        <div className={styles.heroInner}>
          <Block className={styles.heroKicker} />
          <Block className={styles.heroTitle} />
          <Block className={styles.heroTitleShort} />
          <Block className={styles.heroText} />
          <Block className={styles.heroSearch} />
        </div>
      </div>
      <div className={styles.content} aria-hidden="true">
        <div className={styles.stack}>
          <div className={styles.heading}>
            <Block className={styles.headingTitle} />
            <Block className={styles.headingAside} />
          </div>
          <div className={styles.pathPanel}>
            {PATH_ROWS.map((item) => (
              <div key={item} className={styles.pathRow}>
                <Block className={styles.pathIndex} />
                <div className={styles.pathLines}>
                  <Block className={styles.pathTitle} />
                  <Block className={styles.pathMeta} />
                </div>
                <Block className={styles.pathTag} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.stack}>
          <div className={styles.heading}>
            <Block className={styles.headingTitle} />
            <Block className={styles.headingAside} />
          </div>
          <div className={styles.catalog}>
            {PUBLIC_CARDS.slice(0, 6).map((item) => (
              <CardSkeleton key={item} className={styles.courseCard} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompaniesSkeleton() {
  return (
    <div role="status" aria-live="polite" className={styles.publicPage}>
      <span className={styles.srOnly}>Memuat halaman…</span>
      <div className={styles.hero} aria-hidden="true">
        <div className={styles.heroInner}>
          <Block className={styles.heroKicker} />
          <Block className={styles.heroTitle} />
          <Block className={styles.heroTitleShort} />
          <Block className={styles.heroText} />
          <Block className={styles.heroSearch} />
          <div className={styles.heroChips}>
            {PUBLIC_CARDS.map((item) => (
              <Block key={item} className={styles.heroChip} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.content} aria-hidden="true">
        <div className={styles.heading}>
          <Block className={styles.headingTitle} />
          <Block className={styles.headingAside} />
        </div>
        <div className={styles.grid}>
          {PUBLIC_CARDS.map((item) => (
            <CardSkeleton key={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function RecruitersSkeleton() {
  return (
    <div role="status" aria-live="polite" className={styles.publicPage}>
      <span className={styles.srOnly}>Memuat halaman…</span>
      <div className={styles.hero} aria-hidden="true">
        <div className={styles.heroInner}>
          <div className={styles.homeHero}>
            <div>
              <Block className={styles.heroKicker} />
              <Block className={styles.heroTitle} />
              <Block className={styles.heroTitleShort} />
              <Block className={styles.heroText} />
              <Block className={styles.homeCta} />
            </div>
            <div className={`${styles.homeCollage} ${styles.homeCollageDark}`}>
              <Block className={styles.homeCollageRow} />
              <Block className={styles.homeCollageRowTall} />
              <Block className={styles.homeCollageRow} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content} aria-hidden="true">
        <div className={styles.statsRow}>
          {STATS.map((item) => (
            <div key={item} className={styles.statBlock}>
              <Block className={styles.statValue} />
              <Block className={styles.statLabel} />
            </div>
          ))}
        </div>
        <div className={styles.grid}>
          {PUBLIC_CARDS.slice(0, 4).map((item) => (
            <CardSkeleton key={item} />
          ))}
        </div>
        <div className={styles.priceGrid}>
          {PRICE_CARDS.map((item) => (
            <CardSkeleton key={item} className={styles.priceCard} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div role="status" aria-live="polite" className={styles.dashboard}>
      <span className={styles.srOnly}>Memuat halaman…</span>
      <div className={styles.dashHeading} aria-hidden="true">
        <Block className={styles.dashTitle} />
        <Block className={styles.dashAction} />
      </div>
      <div className={styles.dashGrid} aria-hidden="true">
        {DASHBOARD_CARDS.map((item) => (
          <CardSkeleton key={item} className={styles.dashCard} />
        ))}
      </div>
    </div>
  );
}

export function AuthSkeleton() {
  return (
    <div role="status" aria-live="polite" className={styles.auth}>
      <span className={styles.srOnly}>Memuat halaman…</span>
      <div className={styles.authPanel} aria-hidden="true">
        <Block className={styles.authTitle} />
        <Block className={styles.authField} />
        <Block className={styles.authField} />
        <Block className={styles.authButton} />
      </div>
    </div>
  );
}
