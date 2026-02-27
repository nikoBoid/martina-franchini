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
  "/home/HOME-cell/4.jpg",
  "/home/HOME-cell/4%20(2).JPG",
];
const SLIDE_INTERVAL_MS = 4500;

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
    </section>
  );
}
