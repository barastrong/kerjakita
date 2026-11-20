import type { Metadata } from "next";
import Link from "next/link";
import { approveJob, rejectJob } from "@/lib/actions/admin";
import {
  JOB_STATUS_LABEL,
  jobModeration,
  type JobModeration,
} from "@/lib/data/admin";
import { readAdminState } from "@/lib/data/admin-state";
import { jobs } from "@/lib/data/jobs";
import { PageHeading } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import {
  ActionButton,
  Chip,
  DataTable,
  Panel,
} from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const instant = false;

export const metadata: Metadata = { title: "Moderasi lowongan" };

const STATUS_TONE: Record<JobModeration, "ok" | "warn" | "bad"> = {
  active: "ok",
  pending: "warn",
  rejected: "bad",
};

const FILTERS = [
  { key: "semua", label: "Semua" },
  { key: "menunggu", label: "Menunggu tinjau" },
  { key: "aktif", label: "Aktif" },
  { key: "ditolak", label: "Ditolak" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const filter: FilterKey = FILTERS.some((item) => item.key === params.status)
    ? (params.status as FilterKey)
    : "semua";

  const state = await readAdminState();
  const rows = jobs.map((job) => ({
    ...job,
    status: jobModeration(job.slug, state.jobs),
  }));

  const counts: Record<FilterKey, number> = {
    semua: rows.length,
    menunggu: rows.filter((row) => row.status === "pending").length,
    aktif: rows.filter((row) => row.status === "active").length,
    ditolak: rows.filter((row) => row.status === "rejected").length,
  };

  const visible =
    filter === "semua"
      ? rows
      : rows.filter((row) =>
          filter === "menunggu"
            ? row.status === "pending"
            : filter === "aktif"
              ? row.status === "active"
              : row.status === "rejected",
        );

  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Moderasi lowongan"
        subtitle="Lowongan baru belum tayang sampai disetujui. Keputusan tersimpan di browser ini."
      />

      <div className={styles.tabs}>
        {FILTERS.map((item) => (
          <Link
            key={item.key}
            href={
              item.key === "semua"
                ? "/admin/moderasi-lowongan"
                : `/admin/moderasi-lowongan?status=${item.key}`
            }
            className={`${styles.tab} ${filter === item.key ? styles.tabActive : ""}`}
            aria-current={filter === item.key ? "page" : undefined}
          >
            {item.label} ({counts[item.key]})
          </Link>
        ))}
      </div>

      <Panel
        title="Antrean lowongan"
        note={`${visible.length} dari ${rows.length} lowongan ditampilkan.`}
      >
        <DataTable
          caption="Daftar lowongan untuk moderasi"
          head={
            <>
              <th scope="col">Lowongan</th>
              <th scope="col">Kota</th>
              <th scope="col">Diposting</th>
              <th scope="col">Status</th>
              <th scope="col">Aksi</th>
            </>
          }
        >
          {visible.map((row) => (
            <tr key={row.slug}>
              <td data-label="Lowongan">
                <span className={styles.cellStack}>
                  <span className={styles.cellTitle}>{row.title}</span>
                  <span className={styles.cellMeta}>
                    {row.company} · {row.employmentType}
                  </span>
                </span>
              </td>
              <td data-label="Kota">{row.location}</td>
              <td data-label="Diposting" className={styles.cellMuted}>
                {row.posted}
              </td>
              <td data-label="Status">
                <Chip tone={STATUS_TONE[row.status]}>
                  {JOB_STATUS_LABEL[row.status]}
                </Chip>
              </td>
              <td data-label="Aksi">
                <div className={styles.actions}>
                  {row.status !== "active" ? (
                    <form action={approveJob}>
                      <input type="hidden" name="slug" value={row.slug} />
                      <ActionButton tone="primary">
                        {row.status === "rejected" ? "Aktifkan" : "Setujui"}
                      </ActionButton>
                    </form>
                  ) : null}
                  {row.status !== "rejected" ? (
                    <form action={rejectJob}>
                      <input type="hidden" name="slug" value={row.slug} />
                      <ActionButton tone="danger">Tolak</ActionButton>
                    </form>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}
