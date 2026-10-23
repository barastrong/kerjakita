import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/header";
import { currentUser, SESSION_COOKIE } from "@/lib/data/session";

export const instant = false;

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = (await cookies()).get(SESSION_COOKIE);

  return (
    <>
      <Header user={session ? currentUser : null} />
      {children}
    </>
  );
}
