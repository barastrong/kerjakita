import type { ReactNode } from "react";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
};

export function RevealSection({ children, className, id, labelledBy }: RevealSectionProps) {
  return (
    <section className={className} id={id} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
