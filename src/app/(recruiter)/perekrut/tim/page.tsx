import { redirect } from "next/navigation";
import { TimPage } from "@/components/pages/recruiter/dashboard/tim-page";
import { requireRecruiter } from "@/lib/data/recruiter-session";
import { canAccessRecruiterPage } from "@/lib/data/team";

export default async function Page() {
  const member = await requireRecruiter();

  if (!canAccessRecruiterPage(member.role, "/perekrut/tim")) {
    redirect("/perekrut/ringkasan");
  }

  const initialMembers = member.newCompany
    ? [
        {
          id: "admin",
          name: member.name,
          email: member.email,
          title: "Admin perusahaan",
          initials: member.company.initials,
          color: "#7c3aed",
          role: "Admin" as const,
          jobs: "Semua lowongan",
          lastActive: "Hari ini",
        },
      ]
    : undefined;

  return <TimPage initialMembers={initialMembers} />;
}
