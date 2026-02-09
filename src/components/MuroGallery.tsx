"use client";

import Image from "next/image";
import { useState } from "react";

type Props = { images: string[] };

export default function MuroGallery({ images }: Props) {
  const [fullImage, setFullImage] = useState<string | null>(null);

  if (images.length === 0) {
    return (
      <p className="text-neutral-500">
        Nessuna foto disponibile. Aggiungi immagini in{" "}
        <code className="rounded bg-neutral-200 px-1">public/muro</code>.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src) => (
          <li key={src} className="overflow-hidden rounded-lg">
            <button
              type="button"
              onClick={() => setFullImage(src)}
              className="relative block w-full aspect-[4/3] bg-neutral-900 text-left focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-[var(--sfondo-panna)] rounded-lg overflow-hidden cursor-pointer"
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

      {/* Immagine per intero a schermo intero */}
      {fullImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
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
