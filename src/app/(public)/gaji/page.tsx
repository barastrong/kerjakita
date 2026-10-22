import type { Metadata } from "next";
import { SalaryPage } from "@/components/pages/salary/salary-page";

export const metadata: Metadata = {
  title: "Cek gaji",
  description:
    "Bandingkan gaji berdasarkan posisi, kota, dan pengalaman kerja di Indonesia.",
};

export default function GajiPage() {
  return <SalaryPage />;
}
