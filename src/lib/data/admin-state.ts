import { cookies } from "next/headers";
import { openSession, sealSession } from "./session-token";

export const ADMIN_STATE_COOKIE = "kerjakita-admin-state";

export type AdminJobDecision = "active" | "rejected";

export type AdminCompanyDecision = "approved" | "rejected";

export type AdminCompanyReview = {
  decision: AdminCompanyDecision;
  note: string;
  at: string;
};

export type AdminState = {
  jobs: Record<string, AdminJobDecision>;
  reports: string[];
  companies: Record<string, AdminCompanyReview>;
};

const EMPTY_STATE: AdminState = { jobs: {}, reports: [], companies: {} };

function isDecision(value: unknown): value is AdminJobDecision {
  return value === "active" || value === "rejected";
}

function isCompanyDecision(value: unknown): value is AdminCompanyDecision {
  return value === "approved" || value === "rejected";
}

export function sanitizeAdminState(value: unknown): AdminState {
  if (!value || typeof value !== "object") return { ...EMPTY_STATE };

  const data = value as {
    jobs?: unknown;
    reports?: unknown;
    companies?: unknown;
  };
  const jobs: Record<string, AdminJobDecision> = {};
  const companies: Record<string, AdminCompanyReview> = {};

  if (data.jobs && typeof data.jobs === "object") {
    for (const [slug, decision] of Object.entries(data.jobs)) {
      if (slug && isDecision(decision)) jobs[slug] = decision;
    }
  }

  if (data.companies && typeof data.companies === "object") {
    for (const [slug, review] of Object.entries(data.companies)) {
      if (!slug || !review || typeof review !== "object") continue;

      const item = review as { decision?: unknown; note?: unknown; at?: unknown };
      if (!isCompanyDecision(item.decision)) continue;

      companies[slug] = {
        decision: item.decision,
        note: typeof item.note === "string" ? item.note : "",
        at: typeof item.at === "string" ? item.at : "",
      };
    }
  }

  const reports = Array.isArray(data.reports)
    ? data.reports.filter(
        (id): id is string => typeof id === "string" && id.length > 0,
      )
    : [];

  return { jobs, reports: [...new Set(reports)], companies };
}

export async function readAdminState(): Promise<AdminState> {
  const cookieStore = await cookies();
  return sanitizeAdminState(
    openSession(cookieStore.get(ADMIN_STATE_COOKIE)?.value),
  );
}

export async function writeAdminState(state: AdminState) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_STATE_COOKIE, sealSession(state), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });
}
