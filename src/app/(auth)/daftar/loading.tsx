import { AuthSkeleton } from "@/components/ui/skeleton/auth-skeleton";

export default function Loading() {
  return (
    <AuthSkeleton fields={4} remember social footer extra="benefits" />
  );
}
