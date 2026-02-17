"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HOME_BACKGROUND_IMAGES = ["/home/DSC_0143.jpg", "/home/d.jpg", "/home/e.jpg"];
const SLIDE_INTERVAL_MS = 4500;

export default function HomeHero() {
  const [imageVisible, setImageVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setImageVisible(true), 200);
    const t2 = setTimeout(() => setTextVisible(true), 900);

    const intervalId = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HOME_BACKGROUND_IMAGES.length);
    }, SLIDE_INTERVAL_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slider temporaneo dello sfondo con dissolvenza */}
      {HOME_BACKGROUND_IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
            imageVisible && activeSlide === index ? "opacity-100" : "opacity-0"
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

      {/* Scritta Martina Franchini nera con ombra, a sinistra, un quarto pagina più in alto */}
      <div
        className={`absolute inset-0 flex items-center z-20 pointer-events-none transition-all duration-700 ease-out ${
          textVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ paddingTop: "25vh", alignItems: "flex-start" }}
      >
        <h1 className="text-4xl md:text-6xl font-normal uppercase text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] text-left px-8 md:px-12 max-w-4xl">
          Martina Franchini
        </h1>
      </div>
    </section>
  );
}
