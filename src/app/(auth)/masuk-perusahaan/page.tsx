import type { Metadata } from "next";
import {
  AuthShell,
  BenefitList,
} from "@/components/pages/auth/auth-shell";
import { LoginForm } from "@/components/pages/auth/auth-forms";

export const metadata: Metadata = {
  title: "Masuk Perusahaan — Kerjakita",
};

export default function Page() {
  return (
    <AuthShell
      tone="company"
      eyebrow="Portal perusahaan"
      title={
        <>
          <span>Kelola rekrutmen</span>
          <span>perusahaanmu.</span>
        </>
      }
      description="Pasang lowongan, tinjau pelamar, dan atur tim perekrut dari satu portal."
      extra={
        <BenefitList
          items={[
            "Lowongan dan pelamar dalam satu dashboard",
            "Peran Admin, Perekrut, dan Pewawancara",
            "Jadwal wawancara dan keputusan terpusat",
          ]}
        />
      }
    >
      <LoginForm variant="company" />
    </AuthShell>
  );
}
