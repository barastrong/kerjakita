import { AuthSkeleton } from "@/components/ui/skeleton/auth-skeleton";

export default function Loading() {
  return <AuthSkeleton otp extra="note" footer />;
}
