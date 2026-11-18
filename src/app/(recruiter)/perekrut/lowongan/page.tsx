import { cookies } from "next/headers";
import { LowonganPage } from "@/components/pages/recruiter/dashboard/lowongan-page";
import { RECRUITER_ROLE_COOKIE, parseRecruiterRole } from "@/lib/data/team";

export default async function Page() {
  const role = parseRecruiterRole(
    (await cookies()).get(RECRUITER_ROLE_COOKIE)?.value,
  );

  return <LowonganPage role={role} />;
}
