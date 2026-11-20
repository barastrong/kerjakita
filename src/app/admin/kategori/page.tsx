import type { Metadata } from "next";
import {
  COMPANIES_BY_INDUSTRY,
  JOBS_BY_SKILL,
} from "@/lib/data/admin";
import { PageHeading } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import {
  BarList,
  Panel,
} from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const metadata: Metadata = { title: "Kategori" };

export default function Page() {
  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Kategori"
        subtitle="Industri dan keahlian yang dipakai di katalog."
      />

      <div className={styles.split}>
        <Panel
          title="Industri"
          note="Jumlah perusahaan per industri di direktori."
        >
          <BarList items={COMPANIES_BY_INDUSTRY} />
        </Panel>
        <Panel
          title="Keahlian"
          note="Jumlah lowongan yang mencantumkan keahlian ini."
        >
          <BarList items={JOBS_BY_SKILL.slice(0, 8)} />
        </Panel>
      </div>
    </div>
  );
}
