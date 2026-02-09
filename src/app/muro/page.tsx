import HamburgerMenu from "@/components/HamburgerMenu";
import MuroGallery from "@/components/MuroGallery";
import { getMuroImages } from "./getMuro";

export default function MuroPage() {
  const images = getMuroImages();

  return (
    <section className="min-h-screen w-full bg-[var(--sfondo-panna)] text-neutral-900">
      <HamburgerMenu theme="light" />

      <div className="mx-auto max-w-6xl px-6 py-20 pt-24">
        <h1 className="mb-12 text-4xl font-bold uppercase tracking-wide md:text-5xl">
          Muro
        </h1>

        <MuroGallery images={images} />
      </div>
    </section>
  );
}

export const metadata = {
  title: "Muro | Sito Vetrina",
  description: "Galleria Muro",
};
