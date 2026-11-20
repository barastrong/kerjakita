export const COMPANY_VERIFICATION_COOKIE = "kerjakita-company-verification";

export type CompanyVerification = "unverified" | "pending" | "verified";

export function parseCompanyVerification(
  value: string | undefined,
): CompanyVerification {
  return value === "pending" || value === "verified" ? value : "unverified";
}

export const REGISTERED_COMPANY_COOKIE = "kerjakita-registered-company";

export const COMPANY_DRAFT_COOKIE = "kerjakita-company-draft";

export const COMPANY_SESSION_COOKIE = "kerjakita-company-session";

export const PLATFORM_ADMIN_EMAIL = "admin@kerjakita.id";

export type CompanyStatus = "pending" | "approved" | "rejected";

export type CompanyDraft = {
  name: string;
  brand: string;
  industry: string;
  size: string;
  website: string;
  city: string;
  address: string;
  about: string;
  logoName: string;
};

export type CompanyDocuments = {
  nib: string;
  npwp: string;
  akta: string;
  suratKuasa: string;
};

export type RegisteredCompany = CompanyDraft &
  CompanyDocuments & {
    adminName: string;
    adminEmail: string;
    picRole: string;
    picPhone: string;
    picRelation: "direksi" | "kuasa";
    status: CompanyStatus;
    id: string;
    submittedAt: string;
    reviewedAt: string;
    reviewNote: string;
  };

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function sanitizeCompanyDraft(data: unknown): CompanyDraft | null {
  if (!data || typeof data !== "object") return null;

  const draft = data as Partial<CompanyDraft>;
  return {
    name: text(draft.name),
    brand: text(draft.brand),
    industry: text(draft.industry),
    size: text(draft.size),
    website: text(draft.website),
    city: text(draft.city),
    address: text(draft.address),
    about: text(draft.about),
    logoName: text(draft.logoName),
  };
}

export function parseRegisteredCompany(
  value: string | null | undefined,
): RegisteredCompany | null {
  if (!value) return null;

  try {
    return sanitizeRegisteredCompany(JSON.parse(value));
  } catch {
    return null;
  }
}

export function sanitizeRegisteredCompany(
  data: unknown,
): RegisteredCompany | null {
  const draft = sanitizeCompanyDraft(data);
  if (!draft) return null;

  const company = data as Partial<RegisteredCompany>;
  if (!draft.name || typeof company.adminEmail !== "string") {
    return null;
  }

  return {
    ...draft,
    nib: text(company.nib),
    npwp: text(company.npwp),
    akta: text(company.akta),
    suratKuasa: text(company.suratKuasa),
    adminName: text(company.adminName) || draft.name,
    adminEmail: company.adminEmail.toLowerCase(),
    picRole: text(company.picRole),
    picPhone: text(company.picPhone),
    picRelation: company.picRelation === "kuasa" ? "kuasa" : "direksi",
    status:
      company.status === "approved" || company.status === "rejected"
        ? company.status
        : "pending",
    id: text(company.id),
    submittedAt: text(company.submittedAt),
    reviewedAt: text(company.reviewedAt),
    reviewNote: text(company.reviewNote),
  };
}

export function companyDocuments(company: RegisteredCompany) {
  return [
    { label: "NIB", file: company.nib },
    { label: "NPWP", file: company.npwp },
    { label: "Akta pendirian", file: company.akta },
    { label: "Surat kuasa", file: company.suratKuasa },
  ];
}

export function companyInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (
    parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "PT"
  );
}
