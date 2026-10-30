import { notFound } from "next/navigation";
import { LamaranDetailPage } from "@/components/pages/applicant/lamaran-detail-page";
import { getApplication } from "@/components/pages/applicant/lamaran-data";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = getApplication(id);

  if (!application) {
    notFound();
  }

  return <LamaranDetailPage application={application} />;
}
