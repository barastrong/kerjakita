import type { Metadata } from "next";
import {
  ADMIN_FUNNEL,
  JOBS_BY_LOCATION,
  JOBS_BY_SKILL,
} from "@/lib/data/admin";
import { jobs } from "@/lib/data/jobs";
import { PageHeading } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import {
  BarList,
  DemoTag,
  Panel,
} from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const metadata: Metadata = { title: "Analitik" };

export default function Page() {
  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Analitik"
        subtitle="Corong pencarian kerja dan sebaran katalog."
      />

      <Panel
        title="Corong pencarian kerja"
        note="Dilihat sampai diterima, 30 hari terakhir."
        action={<DemoTag />}
      >
        <BarList items={ADMIN_FUNNEL} />
        <p className={styles.note}>
          Angka corong adalah contoh. Sebaran di bawah dihitung dari data
          lowongan yang ada.
        </p>
      </Panel>

      <div className={styles.split}>
        <Panel
          title="Lowongan per kota"
          note={`Dihitung dari ${jobs.length} lowongan di katalog.`}
        >
          <BarList items={JOBS_BY_LOCATION} />
        </Panel>
        <Panel
          title="Keahlian paling dicari"
          note="Jumlah lowongan yang mencantumkan keahlian."
        >
          <BarList items={JOBS_BY_SKILL.slice(0, 8)} />
        </Panel>
      </div>
    </div>
  );
}
