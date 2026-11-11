import { Footer } from "@/components/layout/footer";
import { ButtonLink } from "@/components/ui/button";
import { RecruiterFeatures } from "./recruiter-features";
import { RecruiterHero } from "./recruiter-hero";
import { RecruiterPricing } from "./recruiter-pricing";
import { RecruiterStats } from "./recruiter-stats";
import styles from "./recruiter-page.module.css";

export function RecruiterPage() {
  return (
    <div className={styles.page}>
      <RecruiterHero />
      <main>
        <RecruiterStats />
        <RecruiterFeatures />
        <RecruiterPricing />
        <section className={styles.closing}>
          <div>
            <h2 className={styles.closingTitle}>
              Siap mengisi posisi berikutnya?
            </h2>
            <p className={styles.closingText}>
              Pasang lowongan pertama, lihat kandidat dengan skor kecocokan,
              lalu atur jadwal wawancara dari satu dashboard.
            </p>
          </div>
          <div className={styles.closingActions}>
            <ButtonLink href="/masuk" size="lg">
              Pasang lowongan
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
