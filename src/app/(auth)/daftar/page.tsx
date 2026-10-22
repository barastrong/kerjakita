import type { Metadata } from "next";
import {
  AuthShell,
  BenefitList,
} from "@/components/pages/auth/auth-shell";
import { RegisterForm } from "@/components/pages/auth/auth-forms";

export const metadata: Metadata = {
  title: "Daftar — Kerjakita",
};

export default function Page() {
  return (
    <AuthShell
      title="Satu akun, ribuan lowongan yang cocok."
      description="Daftar gratis dan biarkan pencocokan otomatis menunjukkan peluang terbaikmu."
      extra={
        <BenefitList
          items={[
            "Skor kecocokan di setiap lowongan",
            "Lamar dengan satu klik",
            "Pantau status lamaran dan wawancara",
          ]}
        />
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
