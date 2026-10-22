import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanyTabsProps = {
  company: CompanyDetail;
};

export function CompanyTabs({ company }: CompanyTabsProps) {
  const tabs = [
    "Ringkasan",
    `Ulasan ${company.reviewCount}`,
    "Gaji",
    `Lowongan ${company.openJobCount}`,
    "Foto & video",
  ];

  return (
    <nav className={styles.tabs} aria-label="Bagian perusahaan">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          className={`${styles.tab} ${index === 0 ? styles.tabActive : ""}`}
          aria-current={index === 0 ? "page" : undefined}
        >
          {tab}
          <span className={styles.tabLine} aria-hidden="true" />
        </button>
      ))}
    </nav>
  );
}
