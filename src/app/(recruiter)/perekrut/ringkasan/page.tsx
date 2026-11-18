import { RingkasanPage } from "@/components/pages/recruiter/dashboard/ringkasan-page";
import { requireRecruiter } from "@/lib/data/recruiter-session";

export default async function Page() {
  const member = await requireRecruiter();

  return <RingkasanPage role={member.role} companyName={member.company.name} />;
}
