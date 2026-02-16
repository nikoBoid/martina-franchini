import HamburgerMenu from "@/components/HamburgerMenu";
import ContactContent from "@/components/ContactContent";

export default function ContactPage() {
  return (
    <section className="min-h-screen w-full bg-white text-black">
      <HamburgerMenu theme="light" />

      <div className="mx-auto max-w-2xl px-6 py-24 pt-28">
        <h1 className="text-sm font-normal uppercase tracking-[0.2em] text-black mb-12">
          Contact
        </h1>
        <ContactContent />
      </div>
    </section>
  );
}

export const metadata = {
  title: "Contact | Martina Franchini",
  description: "Contact Martina Franchini",
};
