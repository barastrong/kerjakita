import { AuthSkeleton } from "@/components/ui/skeleton/auth-skeleton";

export default function Loading() {
  return (
    <AuthSkeleton fields={2} remember social footer extra="match" />
  );
}
