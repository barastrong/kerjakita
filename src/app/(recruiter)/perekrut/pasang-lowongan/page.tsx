import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PasangLowonganPage } from "@/components/pages/recruiter/dashboard/pasang-lowongan-page";
import {
  COMPANY_VERIFICATION_COOKIE,
  parseCompanyVerification,
} from "@/lib/data/company";
import { requireRecruiter } from "@/lib/data/recruiter-session";
import { canAccessRecruiterPage } from "@/lib/data/team";

export default async function Page() {
  const member = await requireRecruiter();

  if (!canAccessRecruiterPage(member.role, "/perekrut/pasang-lowongan")) {
    redirect("/perekrut/ringkasan");
  }

  const verification = parseCompanyVerification(
    (await cookies()).get(COMPANY_VERIFICATION_COOKIE)?.value,
  );

  return (
    <PasangLowonganPage
      verification={verification}
      companyName={member.company.name}
    />
  );
}
