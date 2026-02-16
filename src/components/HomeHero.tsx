"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomeHero() {
  const [imageVisible, setImageVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setImageVisible(true), 200);
    const t2 = setTimeout(() => setTextVisible(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Immagine di sfondo a tutto schermo con comparsa */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          imageVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/muro/9.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Scritta Martina Franchini nera con ombra, a sinistra, un quarto pagina più in alto */}
      <div
        className={`absolute inset-0 flex items-center z-20 pointer-events-none transition-all duration-700 ease-out ${
          textVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ paddingTop: "25vh", alignItems: "flex-start" }}
      >
        <h1 className="text-4xl md:text-6xl font-normal uppercase text-black drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)] text-left px-8 md:px-12 max-w-4xl">
          Martina Franchini
        </h1>
      </div>
    </section>
  );
}
