import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ApplyLayout } from "@/components/pages/apply/apply-layout";
import { getApplication } from "@/lib/data/apply";

export const instant = false;

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getApplication(slug);

  if (!job) notFound();

  return <ApplyLayout job={job}>{children}</ApplyLayout>;
}
