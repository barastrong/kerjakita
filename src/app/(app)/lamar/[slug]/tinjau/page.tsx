import { ReviewStep } from "@/components/pages/apply/apply-flow";
import { requireApplySession } from "@/components/pages/apply/apply-auth";

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await requireApplySession(slug, 3);

  return <ReviewStep />;
}
