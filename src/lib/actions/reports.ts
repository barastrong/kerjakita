"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { jobs } from "@/lib/data/jobs";
import { readReports, writeReports } from "@/lib/data/reports";

function field(data: FormData, name: string) {
  return String(data.get(name) ?? "").trim();
}

export async function submitReport(formData: FormData) {
  const jobSlug = field(formData, "jobSlug");
  const reason = field(formData, "reason").slice(0, 120);
  const job = jobs.find((item) => item.slug === jobSlug);

  if (!job || !reason) return;

  const detail = field(formData, "detail").slice(0, 160);
  const reporter = field(formData, "reporter").slice(0, 60) || "Pengunjung";
  const reports = await readReports();

  await writeReports(
    [
      {
        id: `laporan-lokal-${Date.now()}`,
        jobSlug,
        reason: detail ? `${reason} — ${detail}` : reason,
        reporter,
        at: new Date().toISOString(),
      },
      ...reports,
    ].slice(0, 20),
  );

  revalidatePath("/admin/laporan");
  redirect(`/laporkan/${jobSlug}?terkirim=1`);
}