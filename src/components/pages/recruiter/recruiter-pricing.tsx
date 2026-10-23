import { ButtonLink } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons/icons";
import styles from "./recruiter-page.module.css";

const PLANS = [
  {
    name: "Gratis",
    price: "Rp 0",
    note: "untuk mencoba",
    features: ["1 lowongan aktif", "Aktif 30 hari", "Kelola pelamar dasar"],
    cta: "Mulai gratis",
    href: "/daftar",
    variant: "outline",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "Rp 1.500.000",
    note: "per lowongan",
    features: [
      "Pencocokan otomatis",
      "Lowongan ditonjolkan 30 hari",
      "Penjadwalan wawancara",
      "Laporan pelamar",
    ],
    cta: "Pilih paket Pro",
    href: "/daftar",
    variant: "primary",
    highlighted: true,
  },
  {
    name: "Perusahaan",
    price: "Hubungi kami",
    note: "untuk rekrutmen skala besar",
    features: [
      "Lowongan tanpa batas",
      "Integrasi ATS",
      "Akun tim dan peran",
      "Manajer akun khusus",
    ],
    cta: "Hubungi tim",
    href: "/masuk",
    variant: "outline",
    highlighted: false,
  },
] as const;

export function RecruiterPricing() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <h2 className={styles.sectionTitle}>Harga pasang lowongan</h2>
        <p className={styles.sectionSubtitle}>
          Bayar per lowongan, tanpa kontrak berlangganan.
        </p>
      </div>

      <ul className={styles.pricingGrid}>
        {PLANS.map((plan) => (
          <li
            key={plan.name}
            className={`${styles.plan} ${
              plan.highlighted ? styles.planHighlighted : ""
            }`}
          >
            <div className={styles.planHead}>
              <h3 className={styles.planName}>{plan.name}</h3>
              {plan.highlighted && (
                <span className={styles.planBadge}>Paling populer</span>
              )}
            </div>
            <p className={styles.planPrice}>{plan.price}</p>
            <p className={styles.planNote}>{plan.note}</p>
            <ul className={styles.planFeatures}>
              {plan.features.map((feature) => (
                <li key={feature} className={styles.planFeature}>
                  <CheckIcon size={16} className={styles.planCheck} />
                  {feature}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={plan.href}
              variant={plan.variant}
              size="sm"
              className={styles.planButton}
            >
              {plan.cta}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
