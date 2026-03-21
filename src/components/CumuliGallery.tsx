"use client";

import Image from "next/image";
import { useState } from "react";
import type { CumuliOpera } from "@/app/cumuli/getCumuli";

type Props = { opere: CumuliOpera[] };

export default function CumuliGallery({ opere }: Props) {
  const [open, setOpen] = useState<CumuliOpera | null>(null);
  const [fullImage, setFullImage] = useState<string | null>(null);

  if (opere.length === 0) {
    return (
      <p className="text-neutral-500">
        Nessuna opera disponibile. Aggiungi cartelle opera in{" "}
        <code className="rounded bg-neutral-200 px-1">public/cumuli</code>.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {opere.map((opera) => (
          <li key={opera.slug} className="overflow-hidden rounded-lg">
            <button
              type="button"
              onClick={() => setOpen(opera)}
              className="relative block aspect-4/3 w-full overflow-hidden rounded-lg bg-neutral-900 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-white"
            >
              <Image
                src={opera.cover}
                alt=""
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </button>
            <div className="mt-3">
              <p className="text-lg font-medium uppercase tracking-wide text-neutral-900">{opera.name}</p>
              {opera.didascalia && (
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">{opera.didascalia}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Modale con immagini dell'opera */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/75"
          role="dialog"
          aria-modal="true"
          aria-label={`Galleria ${open.name}`}
        >
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
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-md transition-colors hover:bg-black/75"
            aria-label="Chiudi"
          >
            <span className="absolute h-[2px] w-5 rotate-45 bg-current" />
            <span className="absolute h-[2px] w-5 -rotate-45 bg-current" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex-1 overflow-y-auto px-6 py-20 pt-24"
          >
            <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
              {open.images.map((src) => (
                <li key={src} className="relative aspect-4/3 overflow-hidden rounded-lg bg-neutral-900">
                  <button
                    type="button"
                    onClick={() => setFullImage(src)}
                    className="absolute inset-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset"
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
        </div>
      )}

      {/* Immagine per intero a schermo intero */}
      {fullImage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4">
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
    </>
  );
}
