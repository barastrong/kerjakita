import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanySalariesProps = {
  company: CompanyDetail;
  standalone?: boolean;
};

export function CompanySalaries({
  company,
  standalone = false,
}: CompanySalariesProps) {
  if (!standalone) {
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

  const ranges = company.salaries.map((salary) => {
    const match = salary.range.match(/(\d+)\s*[–-]\s*(\d+)/);
    return {
      ...salary,
      low: match ? Number(match[1]) : 0,
      high: match ? Number(match[2]) : 0,
    };
  });
  const scaleMax = Math.max(...ranges.map((range) => range.high), 1);
  const lowest = Math.min(...ranges.map((range) => range.low));
  const highest = Math.max(...ranges.map((range) => range.high));

  return (
    <div className={styles.salaryLayout}>
      <Card className={styles.card}>
        <div className={styles.cardHead}>
          <div>
            <h2 className={styles.cardTitle}>Gaji per posisi</h2>
            <p className={styles.salarySub}>
              Estimasi per bulan dari laporan karyawan
            </p>
          </div>
        </div>
        <div className={styles.salaryItems}>
          {ranges.map(({ role, range, low, high }) => (
            <div key={role} className={styles.salaryItem}>
              <div className={styles.salaryItemHead}>
                <span className={styles.salaryRole}>{role}</span>
                <span className={styles.salaryAmount}>
                  {range.replace(/\s*jt$/, "")}{" "}
                  <span className={styles.salaryUnit}>jt</span>
                </span>
              </div>
              <div className={styles.salaryTrack} aria-hidden="true">
                <span
                  className={styles.salaryFill}
                  style={{
                    left: `${(low / scaleMax) * 100}%`,
                    width: `${((high - low) / scaleMax) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className={styles.salaryNote}>
          Berdasarkan laporan karyawan, bukan angka resmi perusahaan.
        </p>
      </Card>
      <Card className={`${styles.card} ${styles.salarySummary}`}>
        <span className={styles.salarySummaryLabel}>Rentang dilaporkan</span>
        <strong className={styles.salarySummaryValue}>
          Rp {lowest} – {highest} jt
        </strong>
        <span className={styles.salarySummaryMeta}>
          {company.salaries.length} posisi · per bulan
        </span>
        <ButtonLink
          href="/gaji"
          size="sm"
          className={styles.salaryCompare}
        >
          Bandingkan di Cek gaji
        </ButtonLink>
      </Card>
    </div>
  );
}
