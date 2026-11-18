import { cookies } from "next/headers";
import { PelamarDetailPage } from "@/components/pages/recruiter/dashboard/pelamar-detail-page";
import { RECRUITER_ROLE_COOKIE, parseRecruiterRole } from "@/lib/data/team";

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

  return <PelamarDetailPage slug={id} role={role} />;
}
