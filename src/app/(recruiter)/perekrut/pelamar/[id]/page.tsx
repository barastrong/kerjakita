import { PelamarDetailPage } from "@/components/pages/recruiter/dashboard/pelamar-detail-page";
import { requireRecruiter } from "@/lib/data/recruiter-session";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await requireRecruiter();

  return <PelamarDetailPage slug={id} role={member.role} />;
}
