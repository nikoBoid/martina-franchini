import HamburgerMenu from "@/components/HamburgerMenu";
import SelectedWorksGallery from "@/components/SelectedWorksGallery";
import { getMicromondi } from "@/app/micromondi/getMicromondi";
import { getCumuliImages } from "@/app/cumuli/getCumuli";
import { getMuroImages } from "@/app/muro/getMuro";

export default function SelectedWorksPage() {
  const micromondi = getMicromondi();
  const muroImages = getMuroImages();
  const cumuliImages = getCumuliImages();

  return (
    <section className="min-h-screen w-full bg-[var(--sfondo-panna)] text-neutral-900">
      <HamburgerMenu theme="light" />

      <div className="mx-auto max-w-6xl px-6 py-20 pt-24">
        <SelectedWorksGallery
          micromondi={micromondi}
          muroImages={muroImages}
          cumuliImages={cumuliImages}
        />
      </div>
    </section>
  );
}

export const metadata = {
  title: "Selected Works | Martina Franchini",
  description: "Selected works by Martina Franchini",
};
