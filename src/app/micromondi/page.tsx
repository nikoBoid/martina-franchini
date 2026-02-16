import HamburgerMenu from "@/components/HamburgerMenu";
import MicromondiGallery from "@/components/MicromondiGallery";
import { getMicromondi } from "./getMicromondi";

export default function MicromondiPage() {
  const micromondi = getMicromondi();

  return (
    <section className="min-h-screen w-full bg-[var(--sfondo-panna)] text-neutral-900">
      <HamburgerMenu theme="light" />

      <div className="mx-auto max-w-6xl px-6 py-20 pt-24">
        <h1 className="mb-12 text-4xl font-normal uppercase tracking-wide md:text-5xl">
          Micromondi
        </h1>

        <MicromondiGallery micromondi={micromondi} />
      </div>
    </section>
  );
}

export const metadata = {
  title: "Micromondi | Sito Vetrina",
  description: "Galleria di micromondi e sculture",
};
