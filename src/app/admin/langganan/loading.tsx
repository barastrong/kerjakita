import { AdminTableSkeleton } from "@/components/ui/skeleton/admin-skeletons";

export default function Loading() {
  return <AdminTableSkeleton columns={6} rows={7} tabs />;
}
