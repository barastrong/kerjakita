import { redirect } from "next/navigation";
import {
  COMPANY_SESSION_COOKIE,
  companyInitials,
  type CompanyStatus,
} from "./company";
import { readRegisteredCompany, readSessionEmail } from "./company-cookie";
import {
  recruiterMemberForSession,
  type RecruiterRole,
} from "./team";

export type RecruiterContext = {
  name: string;
  email: string;
  role: RecruiterRole;
  newCompany: boolean;
  approved: boolean;
  companyStatus: CompanyStatus;
  company: {
    name: string;
    initials: string;
    industry: string;
    city: string;
  };
};

const TOKOLOKA = {
  name: "Tokoloka",
  initials: "TL",
  industry: "E-commerce",
  city: "Jakarta Selatan",
};

export async function currentRecruiter(): Promise<RecruiterContext | null> {
  const email = await readSessionEmail(COMPANY_SESSION_COOKIE);
  if (!email) return null;

  const member = recruiterMemberForSession(email);
  if (member) {
    return {
      name: member.name,
      email,
      role: member.role,
      newCompany: false,
      approved: true,
      companyStatus: "approved",
      company: TOKOLOKA,
    };
  }

  const registered = await readRegisteredCompany();
  if (registered && registered.adminEmail === email) {
    return {
      name: registered.adminName,
      email,
      role: "Admin",
      newCompany: true,
      approved: registered.status === "approved",
      companyStatus: registered.status,
      company: {
        name: registered.name,
        initials: companyInitials(registered.name),
        industry: registered.industry,
        city: registered.city,
      },
    };
  }

  return null;
}

export async function requireRecruiter() {
  const member = await currentRecruiter();
  if (!member) {
    redirect(
      `/masuk-perusahaan?next=${encodeURIComponent("/perekrut/ringkasan")}`,
    );
  }
  if (!member.approved) {
    redirect("/verifikasi-perusahaan");
  }
  return member;
}

export async function requireCompanyApplication() {
  const member = await currentRecruiter();
  if (!member) {
    redirect(
      `/masuk-perusahaan?next=${encodeURIComponent("/perekrut/ringkasan")}`,
    );
  }
  if (member.approved && !member.newCompany) {
    redirect("/perekrut/ringkasan");
  }
  return member;
}
