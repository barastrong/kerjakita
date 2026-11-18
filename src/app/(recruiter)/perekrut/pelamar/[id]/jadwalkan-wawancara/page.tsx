import { redirect } from "next/navigation";
import { JadwalkanWawancaraPage } from "@/components/pages/recruiter/dashboard/jadwalkan-wawancara-page";
import { requireRecruiter } from "@/lib/data/recruiter-session";
import { can } from "@/lib/data/team";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await requireRecruiter();

  if (!can(member.role, "jadwalkan-wawancara")) {
    redirect(`/perekrut/pelamar/${id}`);
  }

  return <JadwalkanWawancaraPage slug={id} />;
}
