"use server";

import {
  COMPANY_SESSION_COOKIE,
  PLATFORM_ADMIN_EMAIL,
  type CompanyDraft,
  type RegisteredCompany,
} from "@/lib/data/company";
import {
  clearCompanyDraft,
  clearRegisteredCompany,
  clearSessionCookie,
  readCompanyDraft,
  readRegisteredCompany,
  setSessionCookie,
  writeCompanyDraft,
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
      ? "/admin"
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

export async function saveCompanyData(formData: FormData) {
  const draft: CompanyDraft = {
    name: field(formData, "company-name"),
    brand: field(formData, "company-brand"),
    industry: field(formData, "company-industry"),
    size: field(formData, "company-size"),
    website: field(formData, "company-website"),
    city: field(formData, "company-city"),
    address: field(formData, "company-address"),
    about: field(formData, "company-about"),
    logoName: field(formData, "company-logo"),
  };

  if (!draft.name) {
    return "Nama resmi perusahaan wajib diisi.";
  }

  await writeCompanyDraft(draft);
  redirect("/daftar-perusahaan/dokumen");
}

export async function submitCompanyApplication(formData: FormData) {
  const draft = await readCompanyDraft();
  if (!draft) {
    redirect("/daftar-perusahaan");
  }

  const adminName = field(formData, "pic-name");
  const email = field(formData, "pic-email").toLowerCase();
  const nib = field(formData, "doc-nib");
  const npwp = field(formData, "doc-npwp");
  const akta = field(formData, "doc-akta");

  if (!adminName || !email) {
    return "Nama penanggung jawab dan email perusahaan wajib diisi.";
  }
  if (!nib || !npwp || !akta) {
    return "Dokumen NIB, NPWP, dan akta pendirian wajib diunggah.";
  }
  if (
    formData.get("statement-data") !== "on" ||
    formData.get("statement-terms") !== "on"
  ) {
    return "Centang kedua pernyataan sebelum mengirim pengajuan.";
  }
  if (RECRUITER_TEAM.some((member) => member.email === email)) {
    return "Email ini sudah terdaftar sebagai anggota Tokoloka. Masuk lewat halaman masuk.";
  }

  const company: RegisteredCompany = {
    ...draft,
    nib,
    npwp,
    akta,
    suratKuasa: field(formData, "doc-surat-kuasa"),
    adminName,
    adminEmail: email,
    picRole: field(formData, "pic-role"),
    picPhone: field(formData, "pic-phone"),
    picRelation:
      formData.get("pic-relation") === "kuasa" ? "kuasa" : "direksi",
    status: "pending",
    id: `KRJ-${new Date().getFullYear()}-${1000 + Math.floor(Math.random() * 9000)}`,
    submittedAt: new Date().toISOString(),
    reviewedAt: "",
    reviewNote: "",
  };

  await writeRegisteredCompany(company);
  await clearCompanyDraft();
  await setSessionCookie(COMPANY_SESSION_COOKIE, email, DAY);
  redirect("/verifikasi-perusahaan");
}

export async function withdrawCompanyApplication() {
  await clearRegisteredCompany();
  await clearCompanyDraft();
  await clearSessionCookie(COMPANY_SESSION_COOKIE);
  redirect("/daftar-perusahaan");
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
