"use client";

import Link from "next/link";

export default function SiteName() {
  return (
    <Link
      href="/"
      translate="no"
      className="notranslate fixed top-6 left-6 z-10010 hidden md:block text-lg font-normal uppercase tracking-wide text-neutral-900 transition-colors cursor-pointer"
    >
      martina franchini
    </Link>
  );
}
