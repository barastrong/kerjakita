import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  REGISTERED_COMPANY_COOKIE,
  companyInitials,
  parseRegisteredCompany,
} from "./company";
import { SESSION_COOKIE } from "./session";
import {
  recruiterMemberForSession,
  type RecruiterRole,
} from "./team";

export type RecruiterContext = {
  name: string;
  email: string;
  role: RecruiterRole;
  newCompany: boolean;
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
  const cookieStore = await cookies();
  const email = cookieStore.get(SESSION_COOKIE)?.value?.trim().toLowerCase();
  if (!email) return null;

  const member = recruiterMemberForSession(email);
  if (member) {
    return {
      name: member.name,
      email,
      role: member.role,
      newCompany: false,
      company: TOKOLOKA,
    };
  }

  const registered = parseRegisteredCompany(
    cookieStore.get(REGISTERED_COMPANY_COOKIE)?.value,
  );
  if (registered && registered.adminEmail === email) {
    return {
      name: registered.adminName,
      email,
      role: "Admin",
      newCompany: true,
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
    redirect(`/masuk?next=${encodeURIComponent("/perekrut/ringkasan")}`);
  }
  return member;
}
