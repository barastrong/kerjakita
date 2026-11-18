import { redirect } from "next/navigation";
import { TimPage } from "@/components/pages/recruiter/dashboard/tim-page";
import { requireRecruiter } from "@/lib/data/recruiter-session";
import { canAccessRecruiterPage } from "@/lib/data/team";

export default async function Page() {
  const member = await requireRecruiter();

  if (!canAccessRecruiterPage(member.role, "/perekrut/tim")) {
    redirect("/perekrut/ringkasan");
  }

  return <TimPage />;
}
