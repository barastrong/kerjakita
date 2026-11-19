"use server";

import { revalidatePath } from "next/cache";
import {
  readRegisteredCompany,
  writeRegisteredCompany,
} from "@/lib/data/company-cookie";
import type { CompanyStatus } from "@/lib/data/company";

async function setCompanyStatus(status: CompanyStatus) {
  const company = await readRegisteredCompany();
  if (!company) return;

  await writeRegisteredCompany({ ...company, status });
  revalidatePath("/admin/verifikasi-perusahaan");
  revalidatePath("/verifikasi-perusahaan");
  revalidatePath("/perekrut", "layout");
}

export async function approveCompany() {
  await setCompanyStatus("approved");
}

export async function rejectCompany() {
  await setCompanyStatus("rejected");
}
