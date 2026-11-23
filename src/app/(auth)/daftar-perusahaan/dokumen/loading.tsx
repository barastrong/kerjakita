import { CompanyFlowSkeleton } from "@/components/ui/skeleton/company-flow-skeleton";

export default function Loading() {
  return <CompanyFlowSkeleton step={2} variant="documents" />;
}
