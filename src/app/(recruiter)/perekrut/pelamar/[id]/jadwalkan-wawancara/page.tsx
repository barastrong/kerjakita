import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JadwalkanWawancaraPage } from "@/components/pages/recruiter/dashboard/jadwalkan-wawancara-page";
import {
  RECRUITER_ROLE_COOKIE,
  can,
  parseRecruiterRole,
} from "@/lib/data/team";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const role = parseRecruiterRole(
    (await cookies()).get(RECRUITER_ROLE_COOKIE)?.value,
  );

  if (!can(role, "jadwalkan-wawancara")) {
    redirect(`/perekrut/pelamar/${id}`);
  }

  return <JadwalkanWawancaraPage slug={id} />;
}
