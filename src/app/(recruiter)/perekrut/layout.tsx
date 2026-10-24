import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RecruiterShell } from "@/components/pages/recruiter/dashboard/recruiter-shell";
import { SESSION_COOKIE } from "@/lib/data/session";

export const instant = false;

export const metadata: Metadata = {
  title: "Dashboard Perekrut — Kerjakita",
};

export default async function RecruiterLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = (await cookies()).get(SESSION_COOKIE);

  if (!session) {
    redirect(`/masuk?next=${encodeURIComponent("/perekrut/ringkasan")}`);
  }

  return <RecruiterShell>{children}</RecruiterShell>;
}
