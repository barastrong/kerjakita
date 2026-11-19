"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  COMPANY_SESSION_COOKIE,
  REGISTERED_COMPANY_COOKIE,
  parseRegisteredCompany,
  type CompanyStatus,
} from "@/lib/data/company";

async function setCompanyStatus(status: CompanyStatus) {
  const cookieStore = await cookies();
  const company = parseRegisteredCompany(
    cookieStore.get(REGISTERED_COMPANY_COOKIE)?.value,
  );
  if (!company) return;

  cookieStore.set(
    REGISTERED_COMPANY_COOKIE,
    JSON.stringify({ ...company, status }),
    { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" },
  );
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

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set(COMPANY_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  redirect("/");
}
