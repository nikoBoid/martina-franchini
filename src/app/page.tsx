import Hero from "@/components/Hero";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function Page() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <HamburgerMenu />

      {/* background image */}
      <img
        src="/Hero.jpeg"
        alt="Industrial fog cranes"
        className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-4xl px-8">
          <h1 className="text-6xl font-bold uppercase text-white">
            Martina Franchini
          </h1>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  title: "Home | Sito Vetrina",
  description: "Sito professionale in Next.js",
};