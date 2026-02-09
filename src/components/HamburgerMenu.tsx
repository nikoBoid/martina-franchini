"use client";

import { useState } from "react";

type Theme = "dark" | "light";

export default function HamburgerMenu({ theme = "dark" }: { theme?: Theme }) {
  const [open, setOpen] = useState(false);
  const iconColor = theme === "light" ? "bg-neutral-800" : "bg-white";

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="group fixed top-6 right-6 z-40 flex h-10 w-10 flex-col items-center justify-center gap-1.5 cursor-pointer transition-transform duration-200 hover:scale-110"
        aria-label="Apri menu"
      >
        <span className={`h-[2px] w-6 ${iconColor} transition-all duration-200 group-hover:w-7`} />
        <span className={`h-[2px] w-6 ${iconColor} transition-all duration-200`} />
        <span className={`h-[2px] w-6 ${iconColor} transition-all duration-200 group-hover:w-7`} />
      </button>

      {/* Overlay scuro (85% della pagina) - chiude il menu al click */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 cursor-pointer ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Pannello slider 15% da destra */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[15vw] min-w-[200px] max-w-[280px] bg-white text-neutral-900 shadow-[-4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          aria-label="Chiudi menu"
        >
          <span className="absolute h-[2px] w-5 rotate-45 bg-current" />
          <span className="absolute h-[2px] w-5 -rotate-45 bg-current" />
        </button>

        {/* Nav */}
        <nav className="flex h-full items-center justify-center px-6 pt-20">
          <ul className="space-y-8 text-center text-2xl font-bold uppercase">
            <li>
              <a
                onClick={() => setOpen(false)}
                href="/"
                className="block py-2 text-neutral-800 hover:text-neutral-500 transition-colors cursor-pointer"
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => setOpen(false)}
                href="#"
                className="block py-2 text-neutral-800 hover:text-neutral-500 transition-colors cursor-pointer"
              >
                About
              </a>
            </li>
            <li>
              <a
                onClick={() => setOpen(false)}
                href="/micromondi"
                className="block py-2 text-neutral-800 hover:text-neutral-500 transition-colors cursor-pointer"
              >
                Micromondi
              </a>
            </li>
            <li>
              <a
                onClick={() => setOpen(false)}
                href="/cumuli"
                className="block py-2 text-neutral-800 hover:text-neutral-500 transition-colors cursor-pointer"
              >
                Cumuli
              </a>
            </li>
            <li>
              <a
                onClick={() => setOpen(false)}
                href="/muro"
                className="block py-2 text-neutral-800 hover:text-neutral-500 transition-colors cursor-pointer"
              >
                Muro
              </a>
            </li>
            <li>
              <a
                onClick={() => setOpen(false)}
                href="#"
                className="block py-2 text-neutral-800 hover:text-neutral-500 transition-colors cursor-pointer"
              >
                Contact
              </a>
            </li>
          </ul>
          </nav>
      </div>
    </>
  );
}
