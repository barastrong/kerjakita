"use server";

import { revalidatePath } from "next/cache";
import {
  readAdminState,
  writeAdminState,
  type AdminCompanyDecision,
  type AdminJobDecision,
} from "@/lib/data/admin-state";

function field(data: FormData, name: string) {
  return String(data.get(name) ?? "").trim();
}

async function setJobDecision(slug: string, decision: AdminJobDecision) {
  if (!slug) return;

  const state = await readAdminState();
  await writeAdminState({
    ...state,
    jobs: { ...state.jobs, [slug]: decision },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/moderasi-lowongan");
  revalidatePath("/admin/lowongan");
}

export async function reviewQueueCompany(formData: FormData) {
  const slug = field(formData, "slug");
  const intent = field(formData, "intent");
  if (!slug || (intent !== "approve" && intent !== "fix")) return;

  const decision: AdminCompanyDecision =
    intent === "approve" ? "approved" : "rejected";

  const state = await readAdminState();
  await writeAdminState({
    ...state,
    companies: {
      ...state.companies,
      [slug]: {
        decision,
        note: decision === "rejected" ? field(formData, "note") : "",
        at: new Date().toISOString(),
      },
    },
  });

  revalidatePath("/admin/verifikasi-perusahaan");
  revalidatePath(`/admin/verifikasi-perusahaan/${slug}`);
}

export async function approveJob(formData: FormData) {
  await setJobDecision(field(formData, "slug"), "active");
}

export async function rejectJob(formData: FormData) {
  await setJobDecision(field(formData, "slug"), "rejected");
}

export async function resolveReport(formData: FormData) {
  const id = field(formData, "id");
  if (!id) return;

  const state = await readAdminState();
  if (!state.reports.includes(id)) {
    await writeAdminState({ ...state, reports: [...state.reports, id] });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/laporan");
}

export async function reopenReport(formData: FormData) {
  const id = field(formData, "id");
  if (!id) return;

  const state = await readAdminState();
  await writeAdminState({
    ...state,
    reports: state.reports.filter((report) => report !== id),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/laporan");
}
