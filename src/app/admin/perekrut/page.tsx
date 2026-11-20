import type { Metadata } from "next";
import { RECRUITER_TEAM } from "@/lib/data/team";
import { PageHeading, Avatar } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import {
  Chip,
  DataTable,
  DemoTag,
  Panel,
} from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const metadata: Metadata = { title: "Perekrut" };

export default function Page() {
  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Perekrut"
        subtitle="Anggota tim perekrut yang punya akses ke portal perusahaan."
      />

      <Panel
        title="Anggota tim perekrut"
        note="Data tim Tokoloka dari portal perekrut."
        action={<DemoTag />}
      >
        <DataTable
          caption="Daftar anggota tim perekrut"
          head={
            <>
              <th scope="col">Nama</th>
              <th scope="col">Peran</th>
              <th scope="col">Lowongan</th>
              <th scope="col">Terakhir aktif</th>
            </>
          }
        >
          {RECRUITER_TEAM.map((member) => (
            <tr key={member.id}>
              <td data-label="Nama">
                <span className={styles.cellStack}>
                  <span className={styles.cellTitle}>
                    <Avatar
                      initials={member.initials}
                      color={member.color}
                      size="sm"
                    />{" "}
                    {member.name}
                  </span>
                  <span className={styles.cellMeta}>
                    {member.title} · {member.email}
                  </span>
                </span>
              </td>
              <td data-label="Peran">
                <Chip tone={member.role === "Admin" ? "ok" : "neutral"}>
                  {member.role}
                </Chip>
              </td>
              <td data-label="Lowongan">{member.jobs}</td>
              <td data-label="Terakhir aktif" className={styles.cellMuted}>
                {member.lastActive}
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}
