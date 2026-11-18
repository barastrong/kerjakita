import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "./session";
import { recruiterMemberForSession } from "./team";

export async function currentRecruiter() {
  const cookieStore = await cookies();
  return recruiterMemberForSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireRecruiter() {
  const member = await currentRecruiter();
  if (!member) {
    redirect(`/masuk?next=${encodeURIComponent("/perekrut/ringkasan")}`);
  }
  return member;
}
