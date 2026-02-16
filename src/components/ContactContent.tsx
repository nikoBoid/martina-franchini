"use client";

import { useEffect, useState } from "react";

const EMAIL = "martina.franchini.vr@gmail.com";
const INSTAGRAM_HANDLE = "martinafranchini__";
const INSTAGRAM_URL = "https://www.instagram.com/martinafranchini___/";
const STUDIO_ADDRESS = "Viale Monte Nero 20";
const STUDIO_CITY = "Milano, Italy";
const STUDIO_NOTE = "By appointment only";

function AnimateIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function ContactContent() {
  return (
    <div className="space-y-10">
      <AnimateIn>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-black/60 mb-2">
            E-mail
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="text-lg font-normal text-black hover:underline"
          >
            {EMAIL}
          </a>
        </div>
      </AnimateIn>

      <AnimateIn delay={100}>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-black/60 mb-2">
            Instagram
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-normal text-black hover:underline block"
          >
            {INSTAGRAM_HANDLE}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black/70 hover:text-black mt-1 inline-block"
          >
            {INSTAGRAM_URL}
          </a>
        </div>
      </AnimateIn>

      <AnimateIn delay={200}>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-black/60 mb-2">
            Studio
          </p>
          <p className="text-lg font-normal text-black">
            {STUDIO_ADDRESS}
          </p>
          <p className="text-black/90">{STUDIO_CITY}</p>
          <p className="text-sm text-black/70 mt-2">{STUDIO_NOTE}</p>
        </div>
      </AnimateIn>
    </div>
  );
}
