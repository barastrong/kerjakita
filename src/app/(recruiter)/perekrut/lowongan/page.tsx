import { LowonganPage } from "@/components/pages/recruiter/dashboard/lowongan-page";
import { requireRecruiter } from "@/lib/data/recruiter-session";

export default async function Page() {
  const member = await requireRecruiter();

  return <LowonganPage role={member.role} />;
}
