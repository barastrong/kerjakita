import { CompanyFlowSkeleton } from "@/components/ui/skeleton/company-flow-skeleton";

export default function Loading() {
  return <CompanyFlowSkeleton step={3} narrow variant="verification" />;
}
