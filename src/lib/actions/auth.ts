"use server";

import {
  COMPANY_SESSION_COOKIE,
  PLATFORM_ADMIN_EMAIL,
  type RegisteredCompany,
} from "@/lib/data/company";
import {
  clearSessionCookie,
  readRegisteredCompany,
  setSessionCookie,
  writeRegisteredCompany,
} from "@/lib/data/company-cookie";
import { SESSION_COOKIE } from "@/lib/data/session";
import { RECRUITER_TEAM, recruiterMemberForSession } from "@/lib/data/team";
import { redirect } from "next/navigation";

const DAY = 60 * 60 * 24;

function field(data: FormData, name: string) {
  return String(data.get(name) ?? "").trim();
}

function safeNext(next: string, kind: "user" | "company" | "admin") {
  if (!next.startsWith("/")) return null;
  if (kind === "admin") return next.startsWith("/admin") ? next : null;
  if (kind === "company") return next.startsWith("/perekrut") ? next : null;
  return next.startsWith("/perekrut") ? null : next;
}

export async function login(formData: FormData) {
  const variant = field(formData, "variant");
  const admin = variant === "admin";
  const company = variant === "company";
  const email = field(formData, "login-email").toLowerCase();

  if (!email) return "Email wajib diisi.";
  if (admin && email !== PLATFORM_ADMIN_EMAIL) {
    return "Email ini bukan akun admin platform.";
  }

  const member = recruiterMemberForSession(email);
  const registered = await readRegisteredCompany();
  const isRecruiter = Boolean(member) || registered?.adminEmail === email;

  if (company && !isRecruiter) {
    return "Email ini bukan akun perusahaan. Daftarkan perusahaan dulu, atau masuk sebagai pencari kerja.";
  }
  if (!admin && !company && isRecruiter) {
    return "Email ini akun perusahaan. Masuk lewat halaman Masuk Perusahaan.";
  }

  await setSessionCookie(
    admin || company ? COMPANY_SESSION_COOKIE : SESSION_COOKIE,
    email,
    DAY,
  );

  const target =
    safeNext(field(formData, "next"), admin ? "admin" : company ? "company" : "user") ??
    (admin
      ? "/admin/verifikasi-perusahaan"
      : company
        ? registered &&
          !member &&
          registered.adminEmail === email &&
          registered.status !== "approved"
          ? "/verifikasi-perusahaan"
          : "/perekrut/ringkasan"
        : "/pelamar/ringkasan");

  redirect(target);
}

export async function registerCompany(formData: FormData) {
  const name = field(formData, "company-name");
  const adminName = field(formData, "company-admin");
  const email = field(formData, "company-email").toLowerCase();

  if (!name || !adminName || !email) {
    return "Nama perusahaan, nama kamu, dan email admin wajib diisi.";
  }
  if (RECRUITER_TEAM.some((member) => member.email === email)) {
    return "Email ini sudah terdaftar sebagai anggota Tokoloka. Masuk lewat halaman masuk.";
  }

  const company: RegisteredCompany = {
    name,
    industry: field(formData, "company-industry"),
    city: field(formData, "company-city"),
    adminName,
    adminEmail: email,
    status: "pending",
  };

  await writeRegisteredCompany(company);
  await setSessionCookie(COMPANY_SESSION_COOKIE, email, DAY);
  redirect("/verifikasi-perusahaan");
}

export async function verifyOtp() {
  await setSessionCookie(SESSION_COOKIE, "rani.ayu@email.com", DAY);
  redirect("/onboarding");
}

export async function logout(session: "user" | "company") {
  await clearSessionCookie(
    session === "company" ? COMPANY_SESSION_COOKIE : SESSION_COOKIE,
  );
  redirect("/");
}
