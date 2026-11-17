"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { enrolledCookie } from "@/lib/data/session";

type Props = {
  courseKey: string;
  label: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function CourseEnrollButton({
  courseKey,
  label,
  variant,
  size,
  className,
}: Props) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        document.cookie = `${enrolledCookie(courseKey)}=1; path=/; max-age=86400; samesite=lax`;
        router.refresh();
      }}
    >
      {label}
    </Button>
  );
}
