import { cookies } from "next/headers";
import {
  REGISTERED_COMPANY_COOKIE,
  sanitizeRegisteredCompany,
  type RegisteredCompany,
} from "./company";
import { openSession, sealSession } from "./session-token";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};

export async function readRegisteredCompany(): Promise<RegisteredCompany | null> {
  const cookieStore = await cookies();
  return sanitizeRegisteredCompany(
    openSession(cookieStore.get(REGISTERED_COMPANY_COOKIE)?.value),
  );
}

export async function writeRegisteredCompany(company: RegisteredCompany) {
  const cookieStore = await cookies();
  cookieStore.set(REGISTERED_COMPANY_COOKIE, sealSession(company), {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function readSessionEmail(cookieName: string): Promise<string> {
  const cookieStore = await cookies();
  const session = openSession<{ email?: unknown }>(
    cookieStore.get(cookieName)?.value,
  );

  return typeof session?.email === "string"
    ? session.email.trim().toLowerCase()
    : "";
}

export async function setSessionCookie(
  cookieName: string,
  email: string,
  maxAge: number,
) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, sealSession({ email }), {
    ...COOKIE_OPTIONS,
    maxAge,
  });
}

export async function clearSessionCookie(cookieName: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, "", { path: "/", maxAge: 0 });
}
