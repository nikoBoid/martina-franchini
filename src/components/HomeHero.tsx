"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HOME_BACKGROUND_IMAGES_DESKTOP = [
  "/home/HOME-PC/1.jpg",
  "/home/HOME-PC/2.jpg",
  "/home/HOME-PC/2%20(2).jpg",
  "/home/HOME-PC/3.jpg",
];
const HOME_BACKGROUND_IMAGES_MOBILE = [
  "/home/HOME-cell/1.jpg",
  "/home/HOME-cell/2.jpg",
  "/home/HOME-cell/3.jpg",
  "/home/HOME-cell/4.jpg",
  "/home/HOME-cell/5.jpg",
  "/home/HOME-cell/6.jpg",
  "/home/HOME-cell/7.jpg",
];
const SLIDE_INTERVAL_MS = 4500;
const INTERVIEW_URL =
  "https://www.salonbrera.com/2026/07/13/martina-franchini-di-cecilia-pisano/";

export default function HomeHero() {
  const [imageVisible, setImageVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [activeSlideTick, setActiveSlideTick] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setImageVisible(true), 200);
    const t2 = setTimeout(() => setTextVisible(true), 900);

    const intervalId = setInterval(() => {
      setActiveSlideTick((prev) => prev + 1);
    }, SLIDE_INTERVAL_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slider desktop */}
      <div className="absolute inset-0 hidden md:block">
        {HOME_BACKGROUND_IMAGES_DESKTOP.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
              imageVisible &&
              activeSlideTick % HOME_BACKGROUND_IMAGES_DESKTOP.length === index
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Slider mobile */}
      <div className="absolute inset-0 md:hidden">
        {HOME_BACKGROUND_IMAGES_MOBILE.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
              imageVisible &&
              activeSlideTick % HOME_BACKGROUND_IMAGES_MOBILE.length === index
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Scritta Martina Franchini */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none transition-all duration-700 ease-out ${
          textVisible ? "opacity-100" : "opacity-0"
        }`}
      >
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-64 bg-linear-to-t from-black/70 via-black/30 to-transparent md:h-72"
        aria-hidden="true"
      />

      <a
        href={INTERVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 right-5 z-30 flex items-end justify-between gap-5 text-white transition-all duration-700 focus:outline-none focus-visible:ring-1 focus-visible:ring-white md:bottom-7 md:left-8 md:right-auto md:w-auto ${
          textVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
        aria-label="Leggi la nuova intervista a Martina Franchini su Salon Brera"
      >
        <span>
          <span className="block text-[11px] uppercase tracking-[0.18em] text-white/70 md:text-xs">
            Nuova intervista · Salon Brera
          </span>
          <span className="mt-1.5 block text-xl font-normal underline decoration-white/35 underline-offset-4 transition-colors group-hover:decoration-white md:text-2xl">
            Macerie dorate
          </span>
        </span>
        <span
          className="pb-0.5 text-xl text-white/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white md:text-2xl"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    </section>
  );
}
