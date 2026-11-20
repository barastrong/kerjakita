import type { Metadata } from "next";
import Link from "next/link";
import { companyDirectory } from "@/lib/data/company-directory";
import { PageHeading, Avatar } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import { DataTable, Panel } from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const metadata: Metadata = { title: "Verifikasi perusahaan" };

export default async function Page() {
  const demoRows = companyDirectory.slice(0, 3);

  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Verifikasi perusahaan"
        subtitle="Tinjau pengajuan sebelum portal perekrut dibuka."
      />

      <Panel
        title="Antrean contoh"
        note="Tiga baris pertama direktori sebagai gambaran antrean. Buka detail untuk memeriksa dan memberi keputusan."
      >
        <DataTable
          caption="Contoh antrean verifikasi perusahaan"
          head={
            <>
              <th scope="col">Perusahaan</th>
              <th scope="col">Industri</th>
              <th scope="col">Gaya kerja</th>
              <th scope="col">Aksi</th>
            </>
          }
        >
          {demoRows.map((row) => (
            <tr key={row.slug}>
              <td data-label="Perusahaan">
                <span className={styles.cellStack}>
                  <span className={styles.cellTitle}>
                    <Avatar
                      initials={row.initials}
                      color={row.color}
                      size="sm"
                    />{" "}
                    {row.name}
                  </span>
                </span>
              </td>
              <td data-label="Industri">{row.industry}</td>
              <td data-label="Gaya kerja" className={styles.cellMuted}>
                {row.workStyle}
              </td>
              <td data-label="Aksi">
                <Link
                  href={`/admin/verifikasi-perusahaan/${row.slug}`}
                  className={styles.action}
                >
                  Lihat detail
                </Link>
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}
