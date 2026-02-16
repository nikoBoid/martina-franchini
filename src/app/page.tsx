import HamburgerMenu from "@/components/HamburgerMenu";
import HomeHero from "@/components/HomeHero";

export default function Page() {
  return (
    <>
      <HamburgerMenu theme="light" />
      <HomeHero />
    </>
  );
}

export const metadata = {
  title: "Home | Sito Vetrina",
  description: "Sito professionale in Next.js",
};