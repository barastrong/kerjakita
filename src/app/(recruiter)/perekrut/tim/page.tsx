import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TimPage } from "@/components/pages/recruiter/dashboard/tim-page";
import {
  RECRUITER_ROLE_COOKIE,
  canAccessRecruiterPage,
  parseRecruiterRole,
} from "@/lib/data/team";

export default async function Page() {
  const role = parseRecruiterRole(
    (await cookies()).get(RECRUITER_ROLE_COOKIE)?.value,
  );

  if (!canAccessRecruiterPage(role, "/perekrut/tim")) {
    redirect("/perekrut/ringkasan");
  }

  return <TimPage />;
}
