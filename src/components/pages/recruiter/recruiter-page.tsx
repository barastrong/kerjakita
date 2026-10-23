import { Footer } from "@/components/layout/footer";
import { RecruiterFeatures } from "./recruiter-features";
import { RecruiterHero } from "./recruiter-hero";
import { RecruiterPricing } from "./recruiter-pricing";
import { RecruiterStats } from "./recruiter-stats";
import styles from "./recruiter-page.module.css";

export function RecruiterPage() {
  return (
    <div className={styles.page}>
      <RecruiterHero />
      <main className={styles.content}>
        <RecruiterStats />
        <RecruiterFeatures />
        <RecruiterPricing />
      </main>
      <Footer />
    </div>
  );
}
