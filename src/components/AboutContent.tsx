"use client";

import { useEffect, useRef, useState } from "react";

const textIT = `Martina Franchini lavora a partire dal recupero di scarti edilizi, utilizzati come materiali di costruzione e trasformazione. Attraverso installazioni scultoree concepite come ambienti ideali e utopici, l'artista indaga la nozione di struttura e identità, richiamando una dimensione urbana instabile.
La distruzione è parte integrante del processo: le opere attraversano numerose fasi di smontaggio e ricostruzione, giungendo a una forma finale solo dopo un tempo dilatato e stratificato. Controllo e improvvisazione convivono in equilibri rigorosi ma precari, dove la trasformazione diventa il presupposto per la costruzione di nuovi assetti temporanei.`;

const textEN = `Martina Franchini works through the recovery of discarded construction materials, used as elements of transformation and reconfiguration. Through sculptural installations conceived as ideal and utopian environments, the artist investigates notions of structure and identity, evoking an unstable urban dimension.
Destruction is an integral part of the process: the works undergo multiple phases of dismantling and reconstruction, reaching a final form only after an extended and stratified period of transformation. Control and improvisation coexist within rigorous yet precarious balances, where transformation becomes the condition for the emergence of provisional equilibria.`;

const YOUTUBE_VIDEO_ID = "tG4vBK4RAwY";
const YOUTUBE_START_SECONDS = 225;
const VIDEO_TITLE = "MARTINA FRANCHINI | MICROMONDI – studiovisit";

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

type Lang = "it" | "en";

export default function AboutContent() {
  const [lang, setLang] = useState<Lang>("it");
  const embedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?start=${YOUTUBE_START_SECONDS}&rel=0`;

  return (
    <>
      <AnimateIn>
        <div className="space-y-4 mb-16">
          <h2 className="text-sm font-normal uppercase tracking-[0.2em] text-black">
            About
          </h2>
          <p className="text-sm font-normal uppercase tracking-wide text-black">
            {VIDEO_TITLE}
          </p>
          <div className="aspect-video w-full overflow-hidden rounded-sm bg-black">
            <iframe
              src={embedUrl}
              title={VIDEO_TITLE}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}&t=${YOUTUBE_START_SECONDS}s`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-black/70 underline underline-offset-2 hover:text-black transition-colors"
          >
            Apri su YouTube
          </a>
        </div>
      </AnimateIn>

      <AnimateIn delay={200}>
        <div className="mb-8">
          <div className="flex gap-0 border-b border-black/20">
            <button
              type="button"
              onClick={() => setLang("it")}
              className={`px-4 py-2 text-sm font-normal uppercase tracking-wide transition-colors cursor-pointer border-b-2 -mb-px ${
                lang === "it"
                  ? "border-black text-black"
                  : "border-transparent text-black/50 hover:text-black/70"
              }`}
            >
              IT
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-4 py-2 text-sm font-normal uppercase tracking-wide transition-colors cursor-pointer border-b-2 -mb-px ${
                lang === "en"
                  ? "border-black text-black"
                  : "border-transparent text-black/50 hover:text-black/70"
              }`}
            >
              EN
            </button>
          </div>
        </div>
        <p className="text-lg leading-relaxed font-normal text-black whitespace-pre-line">
          {lang === "it" ? textIT : textEN}
        </p>
      </AnimateIn>
    </>
  );
}
