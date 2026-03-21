"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Micromondo } from "@/app/micromondi/getMicromondi";
import type { MuroOpera } from "@/app/muro/getMuro";
import type { CumuliOpera } from "@/app/cumuli/getCumuli";

type Props = {
  micromondi: Micromondo[];
  muroOpere: MuroOpera[];
  cumuliOpere: CumuliOpera[];
};

const DUMMY_CAPTIONS = [
  "Testo didascalia di esempio: materia e luce dialogano in un equilibrio sospeso.",
  "Testo didascalia di esempio: frammenti, ritmo e vuoto costruiscono una narrazione visiva.",
  "Testo didascalia di esempio: superficie, gesto e tempo lasciano una traccia minima.",
];

function getDummyCaption(index: number) {
  return DUMMY_CAPTIONS[index % DUMMY_CAPTIONS.length];
}

export default function SelectedWorksGallery({
  micromondi,
  muroOpere,
  cumuliOpere,
}: Props) {
  const [open, setOpen] = useState<{ name: string; images: string[] } | null>(null);
  const [fullImage, setFullImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const modalTopOffset = "calc(5rem + env(safe-area-inset-top))";
  const closeButtonTopOffset = "calc(5rem + env(safe-area-inset-top) + 1rem)";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const hasModalOpen = Boolean(open || fullImage);
    const previousOverflow = document.body.style.overflow;

    if (hasModalOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, fullImage]);

  return (
    <>
      {/* Sezione MICROMONDI */}
      <section className="mb-24">
        <h2 className="mb-12 text-4xl font-normal uppercase tracking-wide text-neutral-900">
          Micromondi
        </h2>
        <ul className="grid grid-cols-1 gap-10">
          {micromondi.map((m, index) => (
            <li key={m.slug} className="mx-auto w-full max-w-4xl">
              <button
                type="button"
                onClick={() => setOpen(m)}
                className="relative block aspect-4/3 w-full overflow-hidden rounded-lg border border-neutral-300 bg-white text-left cursor-pointer md:border-0 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-white"
              >
                <Image
                  src={m.cover}
                  alt=""
                  fill
                  className="object-cover md:object-contain"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </button>
              <div className="mt-3 text-center">
                <p className="text-base font-medium uppercase tracking-wide text-neutral-900">{m.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                  {m.didascalia || getDummyCaption(index)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Sezione MURO */}
      {muroOpere.length > 0 && (
        <section className="mb-24">
          <h2 className="mb-12 text-4xl font-normal uppercase tracking-wide text-neutral-900">
            Muro
          </h2>
          <ul className="grid grid-cols-1 gap-10">
            {muroOpere.map((opera, index) => (
              <li key={opera.slug} className="mx-auto w-full max-w-4xl">
                <button
                  type="button"
                  onClick={() => setOpen({ name: opera.name, images: opera.images })}
                  className="relative block aspect-4/3 w-full overflow-hidden rounded-lg border border-neutral-300 bg-(--sfondo-panna) text-left cursor-pointer md:border-0 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-(--sfondo-panna)"
                >
                  <Image
                    src={opera.cover}
                    alt=""
                    fill
                    className="object-cover md:object-contain"
                    sizes="(max-width: 1024px) 100vw, 896px"
                  />
                </button>
                <div className="mt-3 text-center">
                  <p className="text-base font-medium uppercase tracking-wide text-neutral-900">
                    {opera.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {opera.didascalia || getDummyCaption(index)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sezione CUMULI */}
      {cumuliOpere.length > 0 && (
        <section className="mb-24">
          <h2 className="mb-12 text-4xl font-normal uppercase tracking-wide text-neutral-900">
            Cumuli
          </h2>
          <ul className="grid grid-cols-1 gap-10">
            {cumuliOpere.map((opera, index) => (
              <li key={opera.slug} className="mx-auto w-full max-w-4xl">
                <button
                  type="button"
                  onClick={() => setOpen({ name: opera.name, images: opera.images })}
                  className="relative block aspect-4/3 w-full overflow-hidden rounded-lg border border-neutral-300 bg-(--sfondo-panna) text-left cursor-pointer md:border-0 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-(--sfondo-panna)"
                >
                  <Image
                    src={opera.cover}
                    alt=""
                    fill
                    className="object-cover md:object-contain"
                    sizes="(max-width: 1024px) 100vw, 896px"
                  />
                </button>
                <div className="mt-3 text-center">
                  <p className="text-base font-medium uppercase tracking-wide text-neutral-900">
                    {opera.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {opera.didascalia || getDummyCaption(index)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* View a tutto schermo con tutte le foto del micromondo */}
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-x-0 bottom-0 flex flex-col bg-black/75"
            style={{ top: modalTopOffset, zIndex: 11000 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Galleria ${open.name}`}
          >
            <div
              onClick={() => setOpen(null)}
              className={`absolute inset-0 cursor-pointer ${fullImage ? "pointer-events-none" : ""}`}
              aria-hidden="true"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(null);
              }}
              className={`fixed right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-md transition-colors hover:bg-black/75 ${fullImage ? "pointer-events-none opacity-0" : ""}`}
              style={{ top: closeButtonTopOffset, zIndex: 11020 }}
              aria-hidden={Boolean(fullImage)}
              aria-label="Chiudi"
            >
              <span className="absolute h-[2px] w-5 rotate-45 bg-current" />
              <span className="absolute h-[2px] w-5 -rotate-45 bg-current" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex-1 overflow-y-auto px-4 pb-8 pt-8 md:px-6 md:pb-20 md:pt-10"
            >
              <ul className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
                {open.images.map((src) => (
                  <li key={src} className="relative aspect-4/3 overflow-hidden rounded-lg bg-(--sfondo-panna)">
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

            {fullImage && (
              <div
                className="fixed inset-x-0 bottom-0 bg-black/95"
                style={{ top: modalTopOffset, zIndex: 12010 }}
              >
                <button
                  type="button"
                  onClick={() => setFullImage(null)}
                  className="absolute inset-0 cursor-pointer"
                  aria-label="Chiudi immagine"
                >
                  <span className="absolute inset-0" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullImage(null);
                  }}
                  className="fixed right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-md transition-colors hover:bg-black/75"
                  style={{ top: closeButtonTopOffset, zIndex: 12020 }}
                  aria-label="Chiudi immagine"
                >
                  <span className="absolute h-[2px] w-5 rotate-45 bg-current" />
                  <span className="absolute h-[2px] w-5 -rotate-45 bg-current" />
                </button>
                <div
                  className="relative z-10 flex h-full w-full items-center justify-center px-4 py-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={fullImage}
                    alt=""
                    width={2200}
                    height={2200}
                    className="h-auto max-h-full w-auto max-w-[92vw] object-contain"
                    sizes="92vw"
                  />
                </div>
              </div>
            )}
          </div>,
          document.body
        )}

      {/* Immagine per intero a schermo intero (per muro e cumuli) */}
      {mounted &&
        fullImage &&
        !open &&
        createPortal(
          <div
            className="fixed inset-x-0 bottom-0 bg-black/95"
            style={{ top: modalTopOffset, zIndex: 12010 }}
          >
            <button
              type="button"
              onClick={() => setFullImage(null)}
              className="absolute inset-0 cursor-pointer"
              aria-label="Chiudi immagine"
            >
              <span className="absolute inset-0" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFullImage(null);
              }}
              className="fixed right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-md transition-colors hover:bg-black/75"
              style={{ top: closeButtonTopOffset, zIndex: 12020 }}
              aria-label="Chiudi immagine"
            >
              <span className="absolute h-[2px] w-5 rotate-45 bg-current" />
              <span className="absolute h-[2px] w-5 -rotate-45 bg-current" />
            </button>
            <div
              className="relative z-10 flex h-full w-full items-center justify-center px-4 py-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={fullImage}
                alt=""
                width={2200}
                height={2200}
                className="h-auto max-h-full w-auto max-w-[92vw] object-contain"
                sizes="92vw"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
