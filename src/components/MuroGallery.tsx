"use client";

import Image from "next/image";
import { useState } from "react";
import type { MuroOpera } from "@/app/muro/getMuro";
import ArtworkSliderModal from "@/components/ArtworkSliderModal";
import ProjectImagePreview from "@/components/ProjectImagePreview";

type Props = { opere: MuroOpera[] };

export default function MuroGallery({ opere }: Props) {
  const [open, setOpen] = useState<MuroOpera | null>(null);

  if (opere.length === 0) {
    return (
      <p className="text-neutral-500">
        Nessuna opera disponibile. Aggiungi cartelle opera in{" "}
        <code className="rounded bg-neutral-200 px-1">public/muro</code>.
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
            <ProjectImagePreview
              images={opera.images}
              projectName={opera.name}
              onOpen={() => setOpen(opera)}
            />
            <div className="mt-3">
              <p className="text-lg font-medium uppercase tracking-wide text-neutral-900">{opera.name}</p>
              {opera.didascalia && (
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">{opera.didascalia}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <ArtworkSliderModal key={open?.slug ?? "closed"} artwork={open} onClose={() => setOpen(null)} />
    </>
  );
}
