import type { Metadata } from "next";
import {
  JOB_STATUS_LABEL,
  jobModeration,
  type JobModeration,
} from "@/lib/data/admin";
import { readAdminState } from "@/lib/data/admin-state";
import { jobs } from "@/lib/data/jobs";
import { PageHeading } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import {
  Chip,
  DataTable,
  Panel,
} from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const metadata: Metadata = { title: "Lowongan" };

const STATUS_TONE: Record<JobModeration, "ok" | "warn" | "bad"> = {
  active: "ok",
  pending: "warn",
  rejected: "bad",
};

export default async function Page() {
  const state = await readAdminState();

  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Lowongan"
        subtitle={`${jobs.length} lowongan di katalog. Status mengikuti keputusan moderasi.`}
      />

      <Panel
        title="Katalog lowongan"
        note="Keputusan status diubah di halaman Moderasi lowongan."
      >
        <DataTable
          caption="Daftar lowongan di katalog"
          head={
            <>
              <th scope="col">Lowongan</th>
              <th scope="col">Perusahaan</th>
              <th scope="col">Kota</th>
              <th scope="col">Tipe</th>
              <th scope="col">Status</th>
              <th scope="col">Diposting</th>
            </>
          }
        >
          {jobs.map((job) => {
            const status = jobModeration(job.slug, state.jobs);

            return (
              <tr key={job.slug}>
                <td data-label="Lowongan">
                  <span className={styles.cellStack}>
                    <span className={styles.cellTitle}>{job.title}</span>
                    <span className={styles.cellMeta}>{job.salaryShort}</span>
                  </span>
                </td>
                <td data-label="Perusahaan">{job.company}</td>
                <td data-label="Kota">{job.location}</td>
                <td data-label="Tipe" className={styles.cellMuted}>
                  {job.employmentType}
                </td>
                <td data-label="Status">
                  <Chip tone={STATUS_TONE[status]}>
                    {JOB_STATUS_LABEL[status]}
                  </Chip>
                </td>
                <td data-label="Diposting" className={styles.cellMuted}>
                  {job.posted}
                </td>
              </tr>
            );
          })}
        </DataTable>
      </Panel>
    </div>
  );
}
