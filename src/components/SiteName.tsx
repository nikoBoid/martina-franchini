"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteName() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <Link
      href="/"
      className={`fixed top-6 left-6 z-30 text-lg font-semibold uppercase tracking-wide transition-colors cursor-pointer ${
        isHome ? "text-white" : "text-neutral-900"
      }`}
    >
      martina franchini
    </Link>
  );
}
