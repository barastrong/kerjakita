export const COMPANY_VERIFICATION_COOKIE = "kerjakita-company-verification";

export type CompanyVerification = "unverified" | "pending" | "verified";

export function parseCompanyVerification(
  value: string | undefined,
): CompanyVerification {
  return value === "pending" || value === "verified" ? value : "unverified";
}

export const REGISTERED_COMPANY_COOKIE = "kerjakita-registered-company";

export type RegisteredCompany = {
  name: string;
  industry: string;
  city: string;
  adminName: string;
  adminEmail: string;
};

export function parseRegisteredCompany(
  value: string | null | undefined,
): RegisteredCompany | null {
  if (!value) return null;

  try {
    const data = JSON.parse(value) as Partial<RegisteredCompany>;
    if (!data || typeof data.name !== "string" || typeof data.adminEmail !== "string") {
      return null;
    }

    return {
      name: data.name,
      industry: typeof data.industry === "string" ? data.industry : "",
      city: typeof data.city === "string" ? data.city : "",
      adminName:
        typeof data.adminName === "string" && data.adminName
          ? data.adminName
          : data.name,
      adminEmail: data.adminEmail.toLowerCase(),
    };
  } catch {
    return null;
  }
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
