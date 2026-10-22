import type { Metadata } from "next";
import {
  AuthShell,
  BenefitList,
} from "@/components/pages/auth/auth-shell";
import { NewPasswordForm } from "@/components/pages/auth/auth-forms";

export const metadata: Metadata = {
  title: "Atur Password Baru — Kerjakita",
};

export default function Page() {
  return (
    <AuthShell
      title="Buat password yang kuat."
      description="Gunakan kombinasi huruf, angka, dan simbol agar akunmu lebih aman."
      extra={
        <BenefitList
          items={[
            "Minimal 8 karakter",
            "Campuran huruf besar dan kecil",
            "Angka dan simbol",
          ]}
        />
      }
    >
      <NewPasswordForm />
    </AuthShell>
  );
}
