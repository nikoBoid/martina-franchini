"use client";

import Image from "next/image";

type Props = {
  images: string[];
  projectName: string;
  onOpen: () => void;
};

export default function ProjectImagePreview({
  images,
  projectName,
  onOpen,
}: Props) {
  if (images.length < 2) return null;

  return (
    <div
      className="project-thumbnails mt-2 flex gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0"
      aria-label={`Altre immagini di ${projectName}`}
    >
      {images.map((src, index) => (
        <button
          key={src}
          type="button"
          onClick={onOpen}
          className="relative h-10 w-12 shrink-0 cursor-pointer overflow-hidden bg-neutral-200 opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-neutral-700 sm:h-10 sm:w-14"
          aria-label={`Apri la galleria di ${projectName}, immagine ${index + 1} di ${images.length}`}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="64px"
          />
        </button>
      ))}
    </div>
  );
}
