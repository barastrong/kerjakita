import type { Metadata } from "next";
import { SalaryPage } from "@/components/pages/salary/salary-page";

export const metadata: Metadata = {
  title: "Cek gaji",
  description:
    "Bandingkan gaji berdasarkan posisi, kota, dan pengalaman kerja di Indonesia.",
};

export const instant = false;

type Props = {
  searchParams: Promise<{
    peran?: string;
    kota?: string;
    pengalaman?: string;
  }>;
};

export default async function GajiPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <SalaryPage
      peran={params.peran}
      kota={params.kota}
      pengalaman={params.pengalaman}
    />
  );
}
