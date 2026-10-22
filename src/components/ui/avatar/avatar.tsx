import styles from "./avatar.module.css";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

type AvatarProps = {
  initials: string;
  color?: string;
  size?: AvatarSize;
  className?: string;
  label?: string;
};

export function Avatar({
  initials,
  color = "var(--brand-accent)",
  size = "sm",
  className,
  label,
}: AvatarProps) {
  return (
    <span
      className={[styles.avatar, styles[size], className]
        .filter(Boolean)
        .join(" ")}
      style={{ backgroundColor: color }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {initials}
    </span>
  );
}
