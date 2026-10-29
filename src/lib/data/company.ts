export const COMPANY_VERIFICATION_COOKIE = "kerjakita-company-verification";

export type CompanyVerification = "unverified" | "pending" | "verified";

export function parseCompanyVerification(
  value: string | undefined,
): CompanyVerification {
  return value === "pending" || value === "verified" ? value : "unverified";
}
