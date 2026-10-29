import { cookies } from "next/headers";
import { PasangLowonganPage } from "@/components/pages/recruiter/dashboard/pasang-lowongan-page";
import {
  COMPANY_VERIFICATION_COOKIE,
  parseCompanyVerification,
} from "@/lib/data/company";

export default async function Page() {
  const verification = parseCompanyVerification(
    (await cookies()).get(COMPANY_VERIFICATION_COOKIE)?.value,
  );

  return <PasangLowonganPage verification={verification} />;
}
