"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export function KitCssGate() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const active = pathname === "/";
    document
      .querySelectorAll<HTMLLinkElement>("link[data-kit]")
      .forEach((link) => {
        link.disabled = !active;
      });
  }, [pathname]);

  return null;
}
