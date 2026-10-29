import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApplicantShell } from "@/components/pages/applicant/applicant-shell";
import { SESSION_COOKIE } from "@/lib/data/session";

export const instant = false;

export const metadata: Metadata = {
  title: "Dashboard Pelamar — Kerjakita",
};

export default async function ApplicantLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = (await cookies()).get(SESSION_COOKIE);

  if (!session) {
    redirect(`/masuk?next=${encodeURIComponent("/pelamar/ringkasan")}`);
  }

  return <ApplicantShell>{children}</ApplicantShell>;
}
