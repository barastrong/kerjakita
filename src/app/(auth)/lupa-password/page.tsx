import type { Metadata } from "next";
import {
  AuthShell,
  SecurityNote,
} from "@/components/pages/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/pages/auth/auth-forms";

export const metadata: Metadata = {
  title: "Lupa Password — Kerjakita",
};

export default function Page() {
  return (
    <AuthShell
      title="Tenang, kami bantu pulihkan akunmu."
      description="Masukkan email terdaftar dan kami kirim tautan untuk membuat password baru."
      extra={
        <SecurityNote>
          Demi keamanan, kami tidak memberi tahu apakah sebuah email terdaftar
          atau tidak.
        </SecurityNote>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
