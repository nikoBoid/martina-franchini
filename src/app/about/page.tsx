import HamburgerMenu from "@/components/HamburgerMenu";
import AboutContent from "@/components/AboutContent";

export default function AboutPage() {
  return (
    <section className="min-h-screen w-full bg-white text-black">
      <HamburgerMenu theme="light" />

      <div className="mx-auto max-w-2xl px-6 py-24 pt-28">
        <AboutContent />
      </div>
    </section>
  );
}

export const metadata = {
  title: "About | Martina Franchini",
  description: "About Martina Franchini - artist statement and interview",
};
