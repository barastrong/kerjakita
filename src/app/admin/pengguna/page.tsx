import type { Metadata } from "next";
import { ADMIN_CANDIDATES } from "@/lib/data/admin";
import { PageHeading, Avatar } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import {
  Chip,
  DataTable,
  DemoTag,
  Panel,
} from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const metadata: Metadata = { title: "Pencari kerja" };

const STAGE_TONE: Record<string, "neutral" | "ok" | "warn" | "bad"> = {
  Baru: "warn",
  Ditinjau: "neutral",
  Wawancara: "ok",
  Penawaran: "ok",
  Ditolak: "bad",
};

export default function Page() {
  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Pencari kerja"
        subtitle="Akun yang melamar lewat portal. Tahap mengikuti pipeline perekrut."
      />

      <Panel
        title="Daftar pencari kerja"
        note={`${ADMIN_CANDIDATES.length} akun dari data pelamar yang ada.`}
        action={<DemoTag />}
      >
        <DataTable
          caption="Daftar akun pencari kerja"
          head={
            <>
              <th scope="col">Nama</th>
              <th scope="col">Kota</th>
              <th scope="col">Tahap</th>
              <th scope="col">Kecocokan</th>
              <th scope="col">Terakhir aktif</th>
            </>
          }
        >
          {ADMIN_CANDIDATES.map((candidate) => (
            <tr key={candidate.slug}>
              <td data-label="Nama">
                <span className={styles.cellStack}>
                  <span className={styles.cellTitle}>
                    <Avatar
                      initials={candidate.initials}
                      color={candidate.color}
                      size="sm"
                    />{" "}
                    {candidate.fullName}
                  </span>
                  <span className={styles.cellMeta}>
                    {candidate.role} · {candidate.years}
                  </span>
                </span>
              </td>
              <td data-label="Kota">{candidate.location}</td>
              <td data-label="Tahap">
                <Chip tone={STAGE_TONE[candidate.stage] ?? "neutral"}>
                  {candidate.stage}
                </Chip>
              </td>
              <td data-label="Kecocokan">{candidate.match}%</td>
              <td data-label="Terakhir aktif" className={styles.cellMuted}>
                {candidate.time}
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}
