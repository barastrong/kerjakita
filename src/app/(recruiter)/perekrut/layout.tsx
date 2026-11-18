import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RecruiterShell } from "@/components/pages/recruiter/dashboard/recruiter-shell";
import { requireRecruiter } from "@/lib/data/recruiter-session";

export const instant = false;

export const metadata: Metadata = {
  title: "Dashboard Perekrut — Kerjakita",
};

export default async function RecruiterLayout({
  children,
}: {
  children: ReactNode;
}) {
  const member = await requireRecruiter();

  return (
    <RecruiterShell
      role={member.role}
      memberName={member.name}
      companyName={member.company.name}
      companyInitials={member.company.initials}
    >
      {children}
    </RecruiterShell>
  );
}
