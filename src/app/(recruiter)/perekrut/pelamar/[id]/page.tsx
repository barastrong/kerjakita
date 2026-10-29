import { PelamarDetailPage } from "@/components/pages/recruiter/dashboard/pelamar-detail-page";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PelamarDetailPage slug={id} />;
}
