import { Card } from "@/components/ui/card";
import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanyAboutProps = {
  company: CompanyDetail;
};

export function CompanyAbout({ company }: CompanyAboutProps) {
  return (
    <Card className={styles.card}>
      <h2 className={styles.cardTitle}>Tentang {company.name}</h2>
      <p className={styles.aboutText}>{company.about}</p>
      <dl className={styles.facts}>
        {company.facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt className={styles.factLabel}>{fact.label}</dt>
            <dd className={styles.factValue}>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
