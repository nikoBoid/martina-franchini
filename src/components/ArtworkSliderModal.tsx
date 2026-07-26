"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type SliderArtwork = {
  name: string;
  images: string[];
};

type Props = {
  artwork: SliderArtwork | null;
  onClose: () => void;
};

export default function ArtworkSliderModal({ artwork, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const imageCount = artwork?.images.length ?? 0;

  useEffect(() => {
    if (!artwork) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + imageCount) % imageCount);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % imageCount);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [artwork, imageCount, onClose]);

  if (typeof document === "undefined" || !artwork || imageCount === 0) return null;

  const previous = () =>
    setActiveIndex((current) => (current - 1 + imageCount) % imageCount);
  const next = () =>
    setActiveIndex((current) => (current + 1) % imageCount);

  return createPortal(
    <div
      className="fixed inset-x-0 bottom-0 flex bg-black/95 text-white"
      style={{
        top: "calc(5rem + env(safe-area-inset-top))",
        zIndex: 11000,
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Galleria ${artwork.name}`}
    >
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-6 sm:pt-5">
        <div className="mb-2 flex shrink-0 items-center justify-between gap-4">
          <p className="truncate text-[11px] uppercase tracking-[0.12em] text-white/70 sm:text-xs">
            {artwork.name}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="relative h-9 w-9 shrink-0 cursor-pointer text-white/80 transition-colors hover:text-white focus:outline-none focus:ring-1 focus:ring-white"
            aria-label="Chiudi"
          >
            <span className="absolute left-2 top-1/2 h-px w-5 rotate-45 bg-current" />
            <span className="absolute left-2 top-1/2 h-px w-5 -rotate-45 bg-current" />
          </button>
        </div>

        <div
          className="relative min-h-0 flex-1 overflow-hidden"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = touchStartX.current;
            const endX = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (startX === null || endX === undefined) return;
            if (startX - endX > 45) next();
            if (endX - startX > 45) previous();
          }}
        >
          <Image
            src={artwork.images[activeIndex]}
            alt={`${artwork.name}, immagine ${activeIndex + 1} di ${imageCount}`}
            fill
            priority
            className="select-none object-contain"
            sizes="100vw"
          />

          {imageCount > 1 && (
            <>
              <button
                type="button"
                onClick={previous}
                className="absolute left-0 top-1/2 flex h-12 w-10 -translate-y-1/2 cursor-pointer items-center justify-start text-3xl font-extralight text-white/75 transition-colors hover:text-white focus:outline-none focus:ring-1 focus:ring-white sm:left-2 sm:justify-center"
                aria-label="Immagine precedente"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-0 top-1/2 flex h-12 w-10 -translate-y-1/2 cursor-pointer items-center justify-end text-3xl font-extralight text-white/75 transition-colors hover:text-white focus:outline-none focus:ring-1 focus:ring-white sm:right-2 sm:justify-center"
                aria-label="Immagine successiva"
              >
                ›
              </button>
            </>
          )}
        </div>

        <div className="mt-2 shrink-0 sm:mt-3">
          <p className="mb-2 text-center text-[10px] tabular-nums text-white/55">
            {activeIndex + 1} / {imageCount}
          </p>
          <div className="flex snap-x gap-1.5 overflow-x-auto pb-1 sm:justify-center sm:gap-2">
            {artwork.images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-11 w-14 shrink-0 snap-center cursor-pointer overflow-hidden bg-white/5 transition-opacity focus:outline-none focus:ring-1 focus:ring-white sm:h-14 sm:w-[4.5rem] ${
                  index === activeIndex ? "opacity-100 ring-1 ring-white" : "opacity-45 hover:opacity-75"
                }`}
                aria-label={`Mostra immagine ${index + 1}`}
                aria-current={index === activeIndex}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
