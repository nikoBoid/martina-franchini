import HamburgerMenu from "@/components/HamburgerMenu";
import BioContent from "@/components/BioContent";

export default function BioPage() {
  return (
    <section className="min-h-screen w-full bg-white text-black">
      <HamburgerMenu theme="light" />

      <div className="mx-auto max-w-2xl px-6 py-24 pt-28">
        <BioContent />
      </div>
    </section>
  );
}

export const metadata = {
  title: "Bio | Martina Franchini",
  description: "Bio and exhibitions of Martina Franchini",
};
