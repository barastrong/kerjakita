import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanyFacilitiesProps = {
  company: CompanyDetail;
};

export function CompanyFacilities({ company }: CompanyFacilitiesProps) {
  return (
    <Card className={styles.card}>
      <h2 className={styles.cardTitle}>Budaya dan fasilitas</h2>
      <div className={styles.facilities}>
        {company.facilities.map((facility) => (
          <Badge key={facility} tone="accent">
            {facility}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
