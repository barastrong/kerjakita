import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { currentUser } from "@/lib/data/session";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header user={currentUser} />
      {children}
    </>
  );
}
