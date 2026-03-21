import HamburgerMenu from "@/components/HamburgerMenu";
import SelectedWorksGallery from "@/components/SelectedWorksGallery";
import { getMicromondi } from "@/app/micromondi/getMicromondi";
import { getCumuliOpere } from "@/app/cumuli/getCumuli";
import { getMuroOpere } from "@/app/muro/getMuro";

export default function SelectedWorksPage() {
  const micromondi = getMicromondi();
  const muroOpere = getMuroOpere();
  const cumuliOpere = getCumuliOpere();

  return (
    <section className="min-h-screen w-full bg-white text-neutral-900">
      <HamburgerMenu theme="light" />

      <div className="mx-auto max-w-6xl px-6 py-20 pt-24">
        <SelectedWorksGallery
          micromondi={micromondi}
          muroOpere={muroOpere}
          cumuliOpere={cumuliOpere}
        />
      </div>
    </section>
  );
}

export const metadata = {
  title: "Selected Works | Martina Franchini",
  description: "Selected works by Martina Franchini",
};
