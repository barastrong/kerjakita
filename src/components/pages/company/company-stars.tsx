import styles from "./company-page.module.css";

type CompanyStarsProps = {
  rating: string;
};

export function CompanyStars({ rating }: CompanyStarsProps) {
  const filled = Math.round(Number(rating.replace(",", ".")));

  return (
    <span className={styles.stars} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => (
        <span
          key={index}
          className={index < filled ? styles.starOn : styles.starOff}
        >
          ★
        </span>
      ))}
    </span>
  );
}
