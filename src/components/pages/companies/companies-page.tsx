import { CompaniesHero } from "./companies-hero";
import { CompanyGrid } from "./company-grid";
import styles from "./companies-page.module.css";

export function CompaniesPage() {
  return (
    <div className={styles.page}>
      <CompaniesHero />
      <CompanyGrid />
    </div>
  );
}
