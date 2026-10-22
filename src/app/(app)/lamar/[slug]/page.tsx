import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApplyPage } from "@/components/pages/apply/apply-page";
import { SESSION_COOKIE } from "@/lib/data/session";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = (await cookies()).get(SESSION_COOKIE);

  if (!session) {
    redirect(`/masuk?next=${encodeURIComponent(`/lamar/${slug}`)}`);
  }

  return <ApplyPage slug={slug} />;
}
