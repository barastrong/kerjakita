import type { CSSProperties, ReactNode } from "react";
import styles from "./skeleton.module.css";

type Tone = "line" | "dark" | "accent";

function background(tone: Tone) {
  if (tone === "dark") return "rgba(255, 255, 255, 0.16)";
  if (tone === "accent") return "var(--brand-accent)";
  return undefined;
}

export function Bar({
  width = "100%",
  height = 12,
  radius = 6,
  tone = "line",
  className,
  style,
}: {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  tone?: Tone;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.block} ${className ?? ""}`}
      style={{
        width,
        height,
        borderRadius: radius,
        background: background(tone),
        ...style,
      }}
    />
  );
}

export function Circle({
  size = 40,
  tone = "line",
  className,
  style,
}: {
  size?: number;
  tone?: Tone;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.block} ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        flex: "0 0 auto",
        borderRadius: "50%",
        background: background(tone),
        ...style,
      }}
    />
  );
}

export function LoadingLabel({ children = "Memuat halaman…" }: { children?: ReactNode }) {
  return <span className={styles.srOnly}>{children}</span>;
}
