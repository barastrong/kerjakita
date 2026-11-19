export const COMPANY_VERIFICATION_COOKIE = "kerjakita-company-verification";

export type CompanyVerification = "unverified" | "pending" | "verified";

export function parseCompanyVerification(
  value: string | undefined,
): CompanyVerification {
  return value === "pending" || value === "verified" ? value : "unverified";
}

export const REGISTERED_COMPANY_COOKIE = "kerjakita-registered-company";

export const COMPANY_SESSION_COOKIE = "kerjakita-company-session";

export const PLATFORM_ADMIN_EMAIL = "admin@kerjakita.id";

export type CompanyStatus = "pending" | "approved" | "rejected";

export type RegisteredCompany = {
  name: string;
  industry: string;
  city: string;
  adminName: string;
  adminEmail: string;
  status: CompanyStatus;
};

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
  if (!data || typeof data !== "object") return null;

  const company = data as Partial<RegisteredCompany>;
  if (
    typeof company.name !== "string" ||
    typeof company.adminEmail !== "string"
  ) {
    return null;
  }

  return {
    name: company.name,
    industry: typeof company.industry === "string" ? company.industry : "",
    city: typeof company.city === "string" ? company.city : "",
    adminName:
      typeof company.adminName === "string" && company.adminName
        ? company.adminName
        : company.name,
    adminEmail: company.adminEmail.toLowerCase(),
    status:
      company.status === "approved" || company.status === "rejected"
        ? company.status
        : "pending",
  };
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
