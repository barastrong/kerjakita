import type { Metadata } from "next";
import { CompanyPage } from "@/components/pages/company/company-page";
import { getCompany } from "@/lib/data/companies";
import { companyDirectory } from "@/lib/data/company-directory";

export const instant = false;

export function generateStaticParams() {
  return companyDirectory.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);

  if (!company) {
    return { title: "Perusahaan tidak ditemukan" };
  }

  return {
    title: company.name,
    description: company.about,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CompanyPage slug={slug} />;
}
