import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.brand}>kerjakita</span>
      <span className={styles.text}>
        © 2026 Kerjakita · Syarat · Privasi · Bantuan
      </span>
    </footer>
  );
}
