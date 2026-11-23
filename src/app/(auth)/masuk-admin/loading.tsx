import { AuthSkeleton } from "@/components/ui/skeleton/auth-skeleton";

export default function Loading() {
  return (
    <AuthSkeleton
      fields={2}
      eyebrow
      remember
      hint
      footer
      extra="benefits"
    />
  );
}
