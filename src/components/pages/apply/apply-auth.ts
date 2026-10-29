import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/data/session";
import { applyStepHref } from "./apply-routes";

export async function requireApplySession(slug: string, step: number) {
  const session = (await cookies()).get(SESSION_COOKIE);

  if (!session) {
    redirect(`/masuk?next=${encodeURIComponent(applyStepHref(slug, step))}`);
  }
}
