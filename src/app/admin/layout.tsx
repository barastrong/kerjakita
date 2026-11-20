import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/pages/admin/admin-shell";
import { ADMIN_REPORTS, jobModeration } from "@/lib/data/admin";
import { readAdminState } from "@/lib/data/admin-state";
import {
  COMPANY_SESSION_COOKIE,
  PLATFORM_ADMIN_EMAIL,
} from "@/lib/data/company";
import {
  readRegisteredCompany,
  readSessionEmail,
} from "@/lib/data/company-cookie";
import { courseCatalog } from "@/lib/data/courses";
import { jobs } from "@/lib/data/jobs";

export const instant = false;

export const metadata: Metadata = {
  title: { default: "Admin — Kerjakita", template: "%s — Admin Kerjakita" },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await readSessionEmail(COMPANY_SESSION_COOKIE);
  if (session !== PLATFORM_ADMIN_EMAIL) {
    redirect("/masuk-admin");
  }

  const [company, state] = await Promise.all([
    readRegisteredCompany(),
    readAdminState(),
  ]);

  const pendingJobs = jobs.filter(
    (job) => jobModeration(job.slug, state.jobs) === "pending",
  ).length;
  const openReports = ADMIN_REPORTS.filter(
    (report) => !state.reports.includes(report.id),
  ).length;

  return (
    <AdminShell
      counts={{
        verification: company?.status === "pending" ? 1 : 0,
        moderation: pendingJobs,
        reports: openReports,
        jobs: jobs.length,
        courses: courseCatalog.length,
      }}
    >
      {children}
    </AdminShell>
  );
}
