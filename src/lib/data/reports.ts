import { cookies } from "next/headers";
import { openSession, sealSession } from "./session-token";

export const REPORTS_COOKIE = "kerjakita-reports";

export type LocalReport = {
  id: string;
  jobSlug: string;
  reason: string;
  reporter: string;
  at: string;
};

export function sanitizeReports(value: unknown): LocalReport[] {
  if (!Array.isArray(value)) return [];

  const reports: LocalReport[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") continue;

    const report = item as Record<string, unknown>;
    if (
      typeof report.id !== "string" ||
      typeof report.jobSlug !== "string" ||
      typeof report.reason !== "string" ||
      !report.id ||
      !report.jobSlug ||
      !report.reason
    ) {
      continue;
    }

    reports.push({
      id: report.id,
      jobSlug: report.jobSlug,
      reason: report.reason.slice(0, 300),
      reporter:
        typeof report.reporter === "string" && report.reporter
          ? report.reporter.slice(0, 60)
          : "Pengunjung",
      at: typeof report.at === "string" ? report.at : "",
    });
  }

  return reports.slice(0, 20);
}

export async function readReports(): Promise<LocalReport[]> {
  const cookieStore = await cookies();
  return sanitizeReports(
    openSession(cookieStore.get(REPORTS_COOKIE)?.value),
  );
}

export async function writeReports(reports: LocalReport[]) {
  const cookieStore = await cookies();
  cookieStore.set(REPORTS_COOKIE, sealSession(reports), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });
}