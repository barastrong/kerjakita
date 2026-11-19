import type { Metadata } from "next";
import {
  AuthShell,
  BenefitList,
} from "@/components/pages/auth/auth-shell";
import { LoginForm } from "@/components/pages/auth/auth-forms";

export const metadata: Metadata = {
  title: "Masuk Admin — Kerjakita",
};

export default function Page() {
  return (
    <AuthShell
      eyebrow="Admin platform"
      title={
        <>
          <span>Panel admin</span>
          <span>platform.</span>
        </>
      }
      description="Tinjau pengajuan perusahaan sebelum portal perekrut dibuka."
      extra={
        <BenefitList
          items={[
            "Setujui atau tolak perusahaan baru",
            "Cek data admin dan industri",
            "Jaga kualitas perusahaan di Kerjakita",
          ]}
        />
      }
    >
      <LoginForm variant="admin" />
    </AuthShell>
  );
}
