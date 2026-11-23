import { AdminTableSkeleton } from "@/components/ui/skeleton/admin-skeletons";

export default function Loading() {
  return <AdminTableSkeleton columns={5} rows={8} tabs />;
}
