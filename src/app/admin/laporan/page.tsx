import type { Metadata } from "next";
import Link from "next/link";
import { reopenReport, resolveReport } from "@/lib/actions/admin";
import { ADMIN_REPORTS } from "@/lib/data/admin";
import { readAdminState } from "@/lib/data/admin-state";
import { readReports } from "@/lib/data/reports";
import { jobs } from "@/lib/data/jobs";
import { PageHeading } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import {
  ActionButton,
  Chip,
  DataTable,
  DemoTag,
  Panel,
} from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const instant = false;

export const metadata: Metadata = { title: "Laporan" };

const FILTERS = [
  { key: "terbuka", label: "Terbuka" },
  { key: "selesai", label: "Selesai" },
  { key: "semua", label: "Semua" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function formatDate(iso: string) {
  const date = new Date(iso);
  if (!iso || Number.isNaN(date.getTime())) return "Baru";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const filter: FilterKey = FILTERS.some((item) => item.key === params.status)
    ? (params.status as FilterKey)
    : "terbuka";

  const state = await readAdminState();
  const localReports = await readReports();
  const rows = [
    ...localReports.map((report) => ({
      id: report.id,
      jobSlug: report.jobSlug,
      reason: report.reason,
      reporter: report.reporter,
      date: formatDate(report.at),
    })),
    ...ADMIN_REPORTS,
  ].map((report) => ({
    ...report,
    job: jobs.find((job) => job.slug === report.jobSlug),
    done: state.reports.includes(report.id),
  }));

  const counts: Record<FilterKey, number> = {
    terbuka: rows.filter((row) => !row.done).length,
    selesai: rows.filter((row) => row.done).length,
    semua: rows.length,
  };

  const visible = rows.filter((row) =>
    filter === "semua" ? true : filter === "selesai" ? row.done : !row.done,
  );

  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Laporan pengguna"
        subtitle="Tinjau laporan lowongan, lalu tutup setelah ditindak."
      />

      <div className={styles.tabs}>
        {FILTERS.map((item) => (
          <Link
            key={item.key}
            href={
              item.key === "terbuka"
                ? "/admin/laporan"
                : `/admin/laporan?status=${item.key}`
            }
            className={`${styles.tab} ${filter === item.key ? styles.tabActive : ""}`}
            aria-current={filter === item.key ? "page" : undefined}
          >
            {item.label} ({counts[item.key]})
          </Link>
        ))}
      </div>

      <Panel
        title="Daftar laporan"
        note="Laporan contoh dan laporan yang dikirim dari browser ini."
        action={<DemoTag />}
      >
        <DataTable
          caption="Daftar laporan pengguna"
          head={
            <>
              <th scope="col">Laporan</th>
              <th scope="col">Alasan</th>
              <th scope="col">Pelapor</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Status</th>
              <th scope="col">Aksi</th>
            </>
          }
        >
          {visible.map((row) => (
            <tr key={row.id}>
              <td data-label="Laporan">
                <span className={styles.cellStack}>
                  <span className={styles.cellTitle}>
                    {row.job?.title ?? row.jobSlug}
                  </span>
                  <span className={styles.cellMeta}>
                    {row.job?.company ?? "Perusahaan tidak ditemukan"}
                  </span>
                </span>
              </td>
              <td data-label="Alasan">{row.reason}</td>
              <td data-label="Pelapor" className={styles.cellMuted}>
                {row.reporter}
              </td>
              <td data-label="Tanggal" className={styles.cellMuted}>
                {row.date}
              </td>
              <td data-label="Status">
                <Chip tone={row.done ? "ok" : "warn"}>
                  {row.done ? "Selesai" : "Terbuka"}
                </Chip>
              </td>
              <td data-label="Aksi">
                <div className={styles.actions}>
                  {row.done ? (
                    <form action={reopenReport}>
                      <input type="hidden" name="id" value={row.id} />
                      <ActionButton>Buka lagi</ActionButton>
                    </form>
                  ) : (
                    <form action={resolveReport}>
                      <input type="hidden" name="id" value={row.id} />
                      <ActionButton tone="primary">
                        Tandai selesai
                      </ActionButton>
                    </form>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}
