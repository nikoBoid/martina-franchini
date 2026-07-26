"use client";

import Image from "next/image";
import { useState } from "react";
import type { Micromondo } from "@/app/micromondi/getMicromondi";
import ArtworkSliderModal from "@/components/ArtworkSliderModal";
import ProjectImagePreview from "@/components/ProjectImagePreview";

type Props = { micromondi: Micromondo[] };

export default function MicromondiGallery({ micromondi }: Props) {
  const [open, setOpen] = useState<Micromondo | null>(null);

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
              className="relative block aspect-4/3 w-full overflow-hidden rounded-lg bg-neutral-900 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-white"
            >
              <Image
                src={m.cover}
                alt={`Micromondo ${m.name}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </button>
            <ProjectImagePreview
              images={m.images}
              projectName={m.name}
              onOpen={() => setOpen(m)}
            />
          </li>
        ))}
      </ul>

      <ArtworkSliderModal key={open?.slug ?? "closed"} artwork={open} onClose={() => setOpen(null)} />
    </>
  );
}
