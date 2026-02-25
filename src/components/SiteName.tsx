"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteName() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return null;
  }

  return (
    <Link
      href="/"
      className="fixed top-6 left-6 z-30 text-lg font-normal uppercase tracking-wide text-neutral-900 transition-colors cursor-pointer"
    >
      martina franchini
    </Link>
  );
}
