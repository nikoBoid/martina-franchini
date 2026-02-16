"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteName() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <Link
      href="/"
      className={`fixed top-6 left-6 z-30 text-lg font-normal uppercase tracking-wide transition-colors cursor-pointer ${
        isHome ? "text-black" : "text-neutral-900"
      }`}
    >
      martina franchini
    </Link>
  );
}
