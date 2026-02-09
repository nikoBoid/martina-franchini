"use client";

import Image from "next/image";
import { useState } from "react";
import type { Micromondo } from "@/app/micromondi/getMicromondi";

type Props = { micromondi: Micromondo[] };

export default function MicromondiGallery({ micromondi }: Props) {
  const [open, setOpen] = useState<Micromondo | null>(null);
  const [fullImage, setFullImage] = useState<string | null>(null);

  if (micromondi.length === 0) {
    return (
      <p className="text-neutral-500">
        Nessun micromondo disponibile. Aggiungi sotto-cartelle in{" "}
        <code className="rounded bg-neutral-200 px-1">public/sculture</code>.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {micromondi.map((m) => (
          <li key={m.slug} className="overflow-hidden rounded-lg">
            <button
              type="button"
              onClick={() => setOpen(m)}
              className="relative block w-full aspect-[4/3] bg-neutral-900 text-left focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-[var(--sfondo-panna)] rounded-lg overflow-hidden cursor-pointer"
            >
              <Image
                src={m.cover}
                alt={`Micromondo ${m.name}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* View a tutto schermo con tutte le foto del micromondo */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/75"
          role="dialog"
          aria-modal="true"
          aria-label={`Galleria ${open.name}`}
        >
          {/* Overlay cliccabile per chiudere */}
          <div
            onClick={() => setOpen(null)}
            className="absolute inset-0 cursor-pointer"
            aria-hidden="true"
          />
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(null);
            }}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Chiudi"
          >
            <span className="absolute h-[2px] w-5 rotate-45 bg-current" />
            <span className="absolute h-[2px] w-5 -rotate-45 bg-current" />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex-1 overflow-y-auto px-6 py-20 pt-24"
          >
            <ul className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
              {open.images.slice(0, 4).map((src) => (
                <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-900">
                  <button
                    type="button"
                    onClick={() => setFullImage(src)}
                    className="absolute inset-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Immagine per intero a schermo intero */}
          {fullImage && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4">
              <button
                type="button"
                onClick={() => setFullImage(null)}
                className="absolute inset-0 cursor-pointer"
                aria-label="Chiudi immagine"
              >
                <span className="absolute inset-0" aria-hidden />
              </button>
              <div 
                className="relative z-10 h-[90vh] w-[90vw] max-w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullImage(null);
                  }}
                  className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/90 hover:bg-black/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Chiudi immagine"
                >
                  <span className="absolute h-[2px] w-5 rotate-45 bg-current" />
                  <span className="absolute h-[2px] w-5 -rotate-45 bg-current" />
                </button>
                <Image
                  src={fullImage}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
