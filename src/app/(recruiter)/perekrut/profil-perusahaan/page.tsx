import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfilPerusahaanPage } from "@/components/pages/recruiter/dashboard/profil-perusahaan-page";
import {
  COMPANY_VERIFICATION_COOKIE,
  parseCompanyVerification,
} from "@/lib/data/company";
import {
  RECRUITER_ROLE_COOKIE,
  canAccessRecruiterPage,
  parseRecruiterRole,
} from "@/lib/data/team";

export default async function Page() {
  const cookieStore = await cookies();
  const role = parseRecruiterRole(cookieStore.get(RECRUITER_ROLE_COOKIE)?.value);

  if (!canAccessRecruiterPage(role, "/perekrut/profil-perusahaan")) {
    redirect("/perekrut/ringkasan");
  }

  const verification = parseCompanyVerification(
    cookieStore.get(COMPANY_VERIFICATION_COOKIE)?.value,
  );

  return <ProfilPerusahaanPage verification={verification} />;
}
