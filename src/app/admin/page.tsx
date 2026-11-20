import type { Metadata } from "next";
import Link from "next/link";
import {
  ADMIN_ACTIVITY,
  ADMIN_CANDIDATES,
  ADMIN_REPORTS,
  COMPANIES_BY_INDUSTRY,
  JOBS_BY_LOCATION,
  jobModeration,
} from "@/lib/data/admin";
import { readAdminState } from "@/lib/data/admin-state";
import { readRegisteredCompany } from "@/lib/data/company-cookie";
import { companyDirectory } from "@/lib/data/company-directory";
import { courseCatalog } from "@/lib/data/courses";
import { jobs } from "@/lib/data/jobs";
import { PageHeading } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import {
  BarList,
  Chip,
  Panel,
  Stat,
  StatGrid,
} from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const metadata: Metadata = { title: "Ringkasan" };

export default async function Page() {
  const [company, state] = await Promise.all([
    readRegisteredCompany(),
    readAdminState(),
  ]);

  const pendingJobs = jobs.filter(
    (job) => jobModeration(job.slug, state.jobs) === "pending",
  ).length;
  const openReports = ADMIN_REPORTS.filter(
    (report) => !state.reports.includes(report.id),
  ).length;
  const verification = company?.status === "pending" ? 1 : 0;

  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Ringkasan platform"
        subtitle={`${pendingJobs} lowongan menunggu moderasi, ${openReports} laporan terbuka, ${verification} pengajuan perusahaan.`}
      />

      <StatGrid>
        <Stat
          value={companyDirectory.length}
          label="Perusahaan terdaftar"
          note={verification ? `${verification} menunggu verifikasi` : "Tidak ada pengajuan baru"}
        />
        <Stat
          value={jobs.length}
          label="Lowongan di katalog"
          note={`${pendingJobs} menunggu tinjau`}
        />
        <Stat
          value={ADMIN_CANDIDATES.length}
          label="Pencari kerja"
          note="Contoh data"
        />
        <Stat
          value={courseCatalog.length}
          label="Kursus"
          note="Katalog aktif"
        />
      </StatGrid>

      <div className={styles.split}>
        <Panel
          title="Perlu tindakan"
          note="Antrian yang menahan pengguna lain."
        >
          <ul className={styles.queue}>
            <li>
              <Link
                href="/admin/verifikasi-perusahaan"
                className={styles.queueRow}
              >
                <span>
                  <span className={styles.queueTitle}>
                    Verifikasi perusahaan
                  </span>
                  <span className={styles.queueNote}>
                    {verification
                      ? `${company?.name ?? "Pengajuan baru"} menunggu keputusan.`
                      : "Tidak ada pengajuan dari browser ini."}
                  </span>
                </span>
                <Chip tone={verification ? "warn" : "ok"}>
                  {verification ? "1 menunggu" : "Beres"}
                </Chip>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/moderasi-lowongan"
                className={styles.queueRow}
              >
                <span>
                  <span className={styles.queueTitle}>Moderasi lowongan</span>
                  <span className={styles.queueNote}>
                    {pendingJobs
                      ? "Lowongan baru belum tayang sampai disetujui."
                      : "Semua lowongan sudah diputuskan."}
                  </span>
                </span>
                <Chip tone={pendingJobs ? "warn" : "ok"}>
                  {pendingJobs ? `${pendingJobs} menunggu` : "Beres"}
                </Chip>
              </Link>
            </li>
            <li>
              <Link href="/admin/laporan" className={styles.queueRow}>
                <span>
                  <span className={styles.queueTitle}>Laporan pengguna</span>
                  <span className={styles.queueNote}>
                    {openReports
                      ? "Tinjau laporan sebelum menutupnya."
                      : "Tidak ada laporan terbuka."}
                  </span>
                </span>
                <Chip tone={openReports ? "warn" : "ok"}>
                  {openReports ? `${openReports} terbuka` : "Beres"}
                </Chip>
              </Link>
            </li>
          </ul>
        </Panel>

        <Panel
          title="Aktivitas terbaru"
          note="Dari data lowongan, pelamar, dan tim yang ada."
        >
          <ul className={styles.queue}>
            {ADMIN_ACTIVITY.map((activity) => (
              <li key={activity.id}>
                <Link href={activity.href} className={styles.queueRow}>
                  <span>
                    <span className={styles.queueTitle}>{activity.text}</span>
                    <span className={styles.queueNote}>{activity.note}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className={styles.split}>
        <Panel
          title="Lowongan per kota"
          note={`Dihitung dari ${jobs.length} lowongan di katalog.`}
        >
          <BarList items={JOBS_BY_LOCATION} />
        </Panel>
        <Panel
          title="Perusahaan per industri"
          note="Dihitung dari direktori perusahaan."
        >
          <BarList items={COMPANIES_BY_INDUSTRY} />
        </Panel>
      </div>
    </div>
  );
}
