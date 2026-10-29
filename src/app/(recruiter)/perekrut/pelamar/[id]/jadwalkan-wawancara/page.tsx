import { JadwalkanWawancaraPage } from "@/components/pages/recruiter/dashboard/jadwalkan-wawancara-page";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <JadwalkanWawancaraPage slug={id} />;
}
