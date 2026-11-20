import type { Metadata } from "next";
import Link from "next/link";
import { companyDirectory } from "@/lib/data/company-directory";
import { PageHeading, Avatar } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import {
  Chip,
  DataTable,
  Panel,
} from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const metadata: Metadata = { title: "Perusahaan" };

export default function Page() {
  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Perusahaan"
        subtitle={`${companyDirectory.length} perusahaan di direktori publik.`}
      />

      <Panel
        title="Direktori perusahaan"
        note="Lowongan aktif dihitung dari data direktori."
      >
        <DataTable
          caption="Daftar perusahaan di direktori"
          head={
            <>
              <th scope="col">Perusahaan</th>
              <th scope="col">Industri</th>
              <th scope="col">Gaya kerja</th>
              <th scope="col">Rating</th>
              <th scope="col">Lowongan</th>
              <th scope="col">Profil</th>
            </>
          }
        >
          {companyDirectory.map((company) => (
            <tr key={company.slug}>
              <td data-label="Perusahaan">
                <span className={styles.cellStack}>
                  <span className={styles.cellTitle}>
                    <Avatar
                      initials={company.initials}
                      color={company.color}
                      size="sm"
                    />{" "}
                    {company.name}
                  </span>
                </span>
              </td>
              <td data-label="Industri">{company.industry}</td>
              <td data-label="Gaya kerja" className={styles.cellMuted}>
                {company.workStyle}
              </td>
              <td data-label="Rating">
                {company.rating}{" "}
                <span className={styles.cellMeta}>
                  ({company.reviewCount} ulasan)
                </span>
              </td>
              <td data-label="Lowongan">{company.openJobs}</td>
              <td data-label="Profil">
                <div className={styles.actions}>
                  <Link
                    href={`/perusahaan/${company.slug}`}
                    className={styles.action}
                  >
                    Lihat profil
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>

      <Panel title="Status verifikasi" note="Ringkasan singkat.">
        <div className={styles.detail}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Perusahaan di direktori</span>
            <span className={styles.detailValue}>
              {companyDirectory.length}
            </span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Status</span>
            <span>
              <Chip tone="ok">Terdaftar</Chip>
            </span>
          </div>
        </div>
        <p className={styles.note}>
          Pengajuan perusahaan baru dari browser ini diputuskan di halaman
          Verifikasi perusahaan.
        </p>
      </Panel>
    </div>
  );
}
