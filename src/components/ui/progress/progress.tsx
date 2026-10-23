import styles from "./progress.module.css";

type ProgressProps = {
  value: number;
  tone?: "mint" | "amber";
  className?: string;
  label?: string;
};

export function Progress({
  value,
  tone = "mint",
  className,
  label,
}: ProgressProps) {
  return (
    <div
      className={[styles.track, className].filter(Boolean).join(" ")}
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`${styles.fill} ${styles[tone]}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
