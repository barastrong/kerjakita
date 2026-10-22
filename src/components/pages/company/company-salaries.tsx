import { Card } from "@/components/ui/card";
import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanySalariesProps = {
  company: CompanyDetail;
};

export function CompanySalaries({ company }: CompanySalariesProps) {
  return (
    <Card className={styles.card}>
      <h2 className={styles.cardTitle}>Gaji per posisi (per bulan)</h2>
      <div className={styles.salaryList}>
        {company.salaries.map((salary) => (
          <div key={salary.role} className={styles.salaryRow}>
            <span>{salary.role}</span>
            <span className={styles.salaryRange}>{salary.range}</span>
          </div>
        ))}
      </div>
      <p className={styles.salaryNote}>
        Berdasarkan laporan karyawan, bukan angka resmi perusahaan.
      </p>
    </Card>
  );
}
