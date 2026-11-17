import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OnboardingPage } from "@/components/pages/onboarding/onboarding-page";
import { ONBOARDED_COOKIE, SESSION_COOKIE } from "@/lib/data/session";

export const instant = false;

export const metadata: Metadata = {
  title: "Kenalan dulu — Kerjakita",
};

export default async function Page() {
  const store = await cookies();

  if (!store.get(SESSION_COOKIE)) {
    redirect(`/masuk?next=${encodeURIComponent("/onboarding")}`);
  }

  if (store.get(ONBOARDED_COOKIE)) {
    redirect("/pelamar/ringkasan");
  }

  return <OnboardingPage />;
}
