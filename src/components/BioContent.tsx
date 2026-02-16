"use client";

import { useEffect, useRef, useState } from "react";

const bio = `Martina Franchini was born in 1995 in Verona (VR). She lives and work in Milan.`;

const exhibitions = [
  {
    year: "2025",
    items: [
      {
        title: "Sguardi IV L'Epilogo",
        detail: "curated by Marco Casentini and Dany Vescovi",
        venue: "L.U.P.O. Lorenzelli Project, Milan, Italy",
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        title: "Sguardi e Macerie",
        detail: "curated by Mattia Andres Lombardo",
        venue: "Studio DFB, Rome, Italy",
        sub: "in collaboration with Artra Gallery, Milan, Italy",
      },
      {
        title: "The Others Art Fair",
        venue: "Turin, Italy",
        sub: "presented by Artra Gallery, Milan, Italy",
      },
      {
        title: "ArtVerona Fair",
        venue: "Verona, Italy",
        sub: "Presented by Artra Gallery, Milan, Italy",
      },
    ],
  },
  {
    year: "2023",
    items: [
      {
        title: "Abecedario",
        detail: "curated by Roberto Borghi",
        venue: "Spazio21, Lodi, Italy",
        sub: "In collaboration with Artra Gallery, Milan, Italy",
      },
      {
        title: "ArtVerona Fair",
        venue: "Verona, Italy",
        sub: "Presented by Progettoarte-Elm Gallery, Milan, Italy",
      },
      {
        title: "Summer Storm",
        detail: "curated by Marco Casentini and Dany Vescovi",
        venue: "Progettoarte-Elm Gallery, Milan, Italy",
      },
      {
        title: "Mirabilis",
        detail: "curated by Marco Casentini and Dany Vescovi in collaboration with Marco Cingolani",
        venue: "Milan, Italy",
      },
      {
        title: "2023 Special Mention for Mario Golè Prize",
        venue: "Milan, Italy",
      },
    ],
  },
];

function AnimateIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function BioContent() {
  return (
    <>
      <AnimateIn>
        <p className="text-lg leading-relaxed font-normal text-black mb-20">
          {bio}
        </p>
      </AnimateIn>

      <AnimateIn delay={150}>
        <h2 className="text-sm font-normal uppercase tracking-[0.2em] text-black mb-10">
          Exhibitions
        </h2>
      </AnimateIn>

      <div className="space-y-14">
        {exhibitions.map((block, blockIndex) => (
          <AnimateIn key={block.year} delay={250 + blockIndex * 80}>
            <div>
              <p className="text-xs font-normal uppercase tracking-widest text-black mb-6">
                {block.year}
              </p>
              <ul className="space-y-8">
                {block.items.map((item, i) => (
                  <li key={`${block.year}-${i}`} className="border-b border-black/10 pb-6 last:border-0">
                    <p className="font-normal text-black">{item.title}</p>
                    {item.detail && (
                      <p className="text-sm text-black/80 mt-1">{item.detail}</p>
                    )}
                    <p className="text-sm text-black/70 mt-1">{item.venue}</p>
                    {item.sub && (
                      <p className="text-sm text-black/60 mt-0.5">{item.sub}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        ))}
      </div>
    </>
  );
}
