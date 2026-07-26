"use client";

import { useEffect, useState } from "react";

const textIT = `Martina Franchini lavora a partire dal recupero di scarti edilizi, utilizzati come materiali di costruzione e trasformazione. Attraverso installazioni scultoree concepite come ambienti ideali e utopici, l'artista indaga la nozione di struttura e identità.
La distruzione è parte integrante del processo: le opere attraversano numerose fasi di smontaggio e ricostruzione, giungendo a una forma finale solo dopo un tempo dilatato e stratificato. Controllo e improvvisazione convivono in equilibri rigorosi ma precari, dove la trasformazione diventa il presupposto per la costruzione di nuovi assetti temporanei.`;

const textEN = `Martina Franchini works through the recovery of discarded construction materials, used as elements of transformation and reconfiguration. Through sculptural installations conceived as ideal and utopian environments, the artist investigates notions of structure and identity, evoking an unstable urban dimension.
Destruction is an integral part of the process: the works undergo multiple phases of dismantling and reconstruction, reaching a final form only after an extended and stratified period of transformation. Control and improvisation coexist within rigorous yet precarious balances, where transformation becomes the condition for the emergence of provisional equilibria.`;

const YOUTUBE_VIDEO_ID = "tG4vBK4RAwY";
const YOUTUBE_START_SECONDS = 225;
const VIDEO_TITLE = "MARTINA FRANCHINI | MICROMONDI – studiovisit";
const INTERVIEW_URL =
  "https://www.salonbrera.com/2026/07/13/martina-franchini-di-cecilia-pisano/";

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

      <AnimateIn delay={120}>
        <article className="mb-16 border-y border-black/20 py-7">
          <div className="flex items-center justify-between gap-6">
            <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-black/55">
              Intervista · Salon Brera
            </p>
            <time
              dateTime="2026-07-13"
              className="shrink-0 text-[11px] tabular-nums text-black/45"
            >
              13.07.2026
            </time>
          </div>

          <h2 className="mt-5 text-2xl font-normal leading-tight text-black sm:text-3xl">
            Macerie dorate
          </h2>
          <p className="mt-2 text-sm font-normal text-black/60">
            Martina Franchini, intervista di Cecilia Pisano
          </p>
          <p className="mt-5 max-w-xl text-base font-normal leading-relaxed text-black/75">
            Una conversazione nello studio dell&apos;artista sul recupero dei
            materiali edilizi, la trasformazione della materia e la ricerca di
            equilibrio tra peso e leggerezza.
          </p>

          <a
            href={INTERVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-3 text-sm font-normal text-black underline decoration-black/35 underline-offset-4 transition-colors hover:decoration-black"
            aria-label="Leggi l'intervista completa su Salon Brera, si apre in una nuova scheda"
          >
            Leggi l&apos;intervista su Salon Brera
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              ↗
            </span>
          </a>
        </article>
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
