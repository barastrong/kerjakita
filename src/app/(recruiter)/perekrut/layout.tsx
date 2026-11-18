import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RecruiterShell } from "@/components/pages/recruiter/dashboard/recruiter-shell";
import { SESSION_COOKIE } from "@/lib/data/session";
import { RECRUITER_ROLE_COOKIE, parseRecruiterRole } from "@/lib/data/team";

export const instant = false;

export const metadata: Metadata = {
  title: "Dashboard Perekrut — Kerjakita",
};

export default async function RecruiterLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session) {
    redirect(`/masuk?next=${encodeURIComponent("/perekrut/ringkasan")}`);
  }

  const role = parseRecruiterRole(cookieStore.get(RECRUITER_ROLE_COOKIE)?.value);

  return <RecruiterShell role={role}>{children}</RecruiterShell>;
}
