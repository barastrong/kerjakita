import { CompanyPage } from "@/components/pages/company/company-page";

export const instant = false;

export function generateStaticParams() {
  return [{ slug: "tokoloka" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CompanyPage slug={slug} />;
}
