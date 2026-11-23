import type { ReactNode } from "react";
import { Bar, Circle, LoadingLabel } from "./skeleton-primitives";
import dash from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import admin from "@/components/pages/admin/admin.module.css";

const range = (length: number) => Array.from({ length }, (_, index) => index);

function HeadingSkeleton() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Bar width="min(260px, 100%)" height={30} />
      <Bar width="min(420px, 100%)" height={14} />
    </div>
  );
}

function PanelSkeleton({
  rows = 4,
  action = false,
  children,
}: {
  rows?: number;
  action?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`${dash.card} ${admin.panel}`}>
      <div className={admin.panelHead}>
        <div style={{ display: "grid", gap: 7 }}>
          <Bar width={180} height={15} />
          <Bar width={230} height={10} />
        </div>
        {action ? <Bar width={72} height={24} radius={999} /> : null}
      </div>
      {children ?? (
        <ul className={admin.queue}>
          {range(rows).map((row) => (
            <li key={row} className={admin.queueRow}>
              <span style={{ display: "grid", gap: 6, flex: 1 }}>
                <Bar width="min(200px, 100%)" height={12} />
                <Bar width="min(280px, 100%)" height={10} />
              </span>
              <Bar width={58} height={22} radius={999} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function TableSkeleton({
  columns = 5,
  rows = 6,
}: {
  columns?: number;
  rows?: number;
}) {
  return (
    <div className={admin.tableCard} aria-hidden="true">
      <table className={admin.table}>
        <thead>
          <tr>
            {range(columns).map((column) => (
              <th key={column} scope="col">
                <Bar width={column === 0 ? 110 : 68} height={11} />
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
                      style={{ display: "flex", alignItems: "center", gap: 9 }}
                    >
                      <Circle size={26} />
                      <span style={{ display: "grid", gap: 5, flex: 1 }}>
                        <Bar width="min(150px, 100%)" height={11} />
                        <Bar width="min(100px, 100%)" height={9} />
                      </span>
                    </span>
                  ) : (
                    <Bar
                      width={column === columns - 1 ? 52 : "min(84px, 100%)"}
                      height={column === columns - 1 ? 20 : 11}
                      radius={column === columns - 1 ? 999 : 6}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminOverviewSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <HeadingSkeleton />

      <div className={dash.stats}>
        {range(4).map((stat) => (
          <div key={stat} className={dash.statCard}>
            <Bar width={48} height={26} />
            <Bar width="min(140px, 100%)" height={11} />
            <Bar width="min(100px, 100%)" height={9} />
          </div>
        ))}
      </div>

      <div className={admin.split}>
        <PanelSkeleton rows={3} />
        <PanelSkeleton rows={4} />
      </div>

      <div className={admin.split}>
        <section className={`${dash.card} ${admin.panel}`}>
          <div className={admin.panelHead}>
            <div style={{ display: "grid", gap: 7 }}>
              <Bar width={170} height={15} />
              <Bar width={220} height={10} />
            </div>
          </div>
          <ul className={admin.bars}>
            {range(5).map((row) => (
              <li key={row} className={admin.barRow}>
                <Bar width={90} height={10} />
                <Bar width={`${40 + row * 11}%`} height={9} />
                <Bar width={24} height={10} />
              </li>
            ))}
          </ul>
        </section>
        <PanelSkeleton rows={4} />
      </div>
    </div>
  );
}

export function AdminTableSkeleton({
  columns = 5,
  rows = 7,
  panels = 1,
  tabs = false,
}: {
  columns?: number;
  rows?: number;
  panels?: number;
  tabs?: boolean;
}) {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <HeadingSkeleton />
      {tabs ? (
        <div className={admin.tabs}>
          {range(4).map((tab) => (
            <Bar key={tab} width={96} height={32} radius={8} />
          ))}
        </div>
      ) : null}
      {range(panels).map((panel) => (
        <PanelSkeleton key={panel}>
          <TableSkeleton columns={columns} rows={rows} />
        </PanelSkeleton>
      ))}
    </div>
  );
}

export function AdminAnalyticsSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <HeadingSkeleton />

      <div className={admin.split}>
        {range(2).map((panel) => (
          <section key={panel} className={`${dash.card} ${admin.panel}`}>
            <div className={admin.panelHead}>
              <div style={{ display: "grid", gap: 7 }}>
                <Bar width={160} height={15} />
                <Bar width={210} height={10} />
              </div>
            </div>
            <ul className={admin.bars}>
              {range(panel === 0 ? 6 : 5).map((row) => (
                <li key={row} className={admin.barRow}>
                  <Bar width={92} height={10} />
                  <Bar width={`${32 + ((row * 13) % 62)}%`} height={9} />
                  <Bar width={26} height={10} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <PanelSkeleton>
        <TableSkeleton columns={5} rows={6} />
      </PanelSkeleton>
    </div>
  );
}

export function AdminSettingsSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <HeadingSkeleton />
      <div className={admin.tabs}>
        {range(4).map((tab) => (
          <Bar key={tab} width={88} height={32} radius={8} />
        ))}
      </div>

      <section className={`${dash.card} ${admin.panel}`}>
        <div className={admin.panelHead}>
          <div style={{ display: "grid", gap: 7 }}>
            <Bar width={180} height={15} />
            <Bar width={230} height={10} />
          </div>
        </div>
        <div className={admin.detail}>
          {range(4).map((row) => (
            <div key={row} className={admin.detailRow}>
              <Bar width={110} height={11} />
              <Bar width="min(180px, 100%)" height={11} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function AdminVerificationDetailSkeleton() {
  return (
    <div
      className={dash.mainInner}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <Bar width={150} height={12} />

      <section className={admin.appSheet}>
        <div className={admin.appHead}>
          <Circle size={48} />
          <div style={{ display: "grid", gap: 8, flex: 1 }}>
            <Bar width="min(300px, 100%)" height={20} />
            <Bar width="min(360px, 100%)" height={11} />
          </div>
          <Bar width={82} height={26} radius={999} />
        </div>

        <div className={admin.appAside}>
          <dl className={admin.facts}>
            {range(4).map((fact) => (
              <div key={fact} className={admin.fact}>
                <dt className={admin.factLabel}>
                  <Bar width={54} height={9} />
                </dt>
                <dd className={admin.factValue}>
                  <Bar width="min(140px, 100%)" height={11} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <section>
          <Bar width={140} height={16} />
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {range(3).map((doc) => (
              <div
                key={doc}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <Circle size={34} />
                <span style={{ display: "grid", gap: 6, flex: 1 }}>
                  <Bar width="min(150px, 100%)" height={12} />
                  <Bar width="min(220px, 100%)" height={9} />
                </span>
                <Bar width={64} height={26} radius={8} />
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 28 }}>
          <Bar width={170} height={16} />
          <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
            {range(4).map((check) => (
              <div key={check} style={{ display: "flex", gap: 10 }}>
                <Circle size={18} />
                <Bar width="min(280px, 100%)" height={11} />
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
          <Bar width={120} height={38} radius={8} />
          <Bar width={120} height={38} radius={8} />
          <span style={{ flex: 1 }} />
          <Bar width={140} height={38} radius={8} />
        </div>
      </section>
    </div>
  );
}
