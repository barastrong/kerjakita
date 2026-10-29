import { cookies } from "next/headers";
import { ProfilPerusahaanPage } from "@/components/pages/recruiter/dashboard/profil-perusahaan-page";
import {
  COMPANY_VERIFICATION_COOKIE,
  parseCompanyVerification,
} from "@/lib/data/company";

export default async function Page() {
  const verification = parseCompanyVerification(
    (await cookies()).get(COMPANY_VERIFICATION_COOKIE)?.value,
  );

  return <ProfilPerusahaanPage verification={verification} />;
}
