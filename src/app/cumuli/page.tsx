import HamburgerMenu from "@/components/HamburgerMenu";
import CumuliGallery from "@/components/CumuliGallery";
import { getCumuliImages } from "./getCumuli";

export default function CumuliPage() {
  const images = getCumuliImages();

  return (
    <section className="min-h-screen w-full bg-[var(--sfondo-panna)] text-neutral-900">
      <HamburgerMenu theme="light" />

      <div className="mx-auto max-w-6xl px-6 py-20 pt-24">
        <h1 className="mb-12 text-4xl font-normal uppercase tracking-wide md:text-5xl">
          Cumuli
        </h1>

        <CumuliGallery images={images} />
      </div>
    </section>
  );
}

export const metadata = {
  title: "Cumuli | Sito Vetrina",
  description: "Galleria di foto singole",
};
