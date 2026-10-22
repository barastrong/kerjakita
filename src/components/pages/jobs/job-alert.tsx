import { Button } from "@/components/ui/button";
import { MailIcon } from "@/components/ui/icons/icons";
import styles from "./jobs-page.module.css";

export function JobAlert() {
  return (
    <section className={styles.alert}>
      <div className={styles.alertText}>
        <h2>Jangan ketinggalan lowongan baru</h2>
        <p>
          Buat notifikasi untuk pencarian ini dan terima lowongan yang cocok
          langsung di emailmu.
        </p>
      </div>

      <form className={styles.alertForm}>
        <label className={styles.emailField}>
          <span className={styles.srOnly}>Alamat email</span>
          <MailIcon size={18} className={styles.emailIcon} />
          <input
            type="email"
            name="email"
            placeholder="nama@email.com"
            autoComplete="email"
          />
        </label>
        <Button type="button" className={styles.alertButton}>
          Buat notifikasi
        </Button>
      </form>
    </section>
  );
}
