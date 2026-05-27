import { Link } from "@tanstack/react-router";
import { Instagram, Music2, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cocoa text-cream mt-32">
      <div className="container-luxe py-20 grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2 space-y-5">
          <div className="font-serif text-3xl tracking-[0.28em]">MELANVÉE</div>
          <p className="text-cream/70 max-w-sm text-sm leading-relaxed">
            Effortless beauty, made to feel like yours. Premium textured hair, designed for the women who wear it.
          </p>
          <a href="mailto:customercare@melanvee.com" className="block text-sm text-cream/85 hover:text-blush">customercare@melanvee.com</a>
          <form className="flex gap-2 max-w-sm pt-2">
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 bg-transparent border-b border-cream/30 py-2 px-1 text-sm placeholder:text-cream/40 focus:outline-none focus:border-cream"
            />
            <button className="text-[0.7rem] tracking-[0.25em] uppercase border-b border-cream pb-2 hover:text-blush transition">
              Join
            </button>
          </form>
        </div>

        <FooterCol title="Shop" links={[
          ["Back to Work", "/shop"],
          ["Signature Wigs", "/shop"],
          ["Summer Edit", "/shop"],
          ["Crochet", "/shop"],
          ["Hot Tools", "/shop"],
        ]} />

        <FooterCol title="Care" links={[
          ["Hair Care Guide", "/hair-care"],
          ["FAQ", "/faq"],
          ["Track Order", "/contact"],
          ["Shipping Policy", "/faq"],
          ["Returns", "/faq"],
        ]} />

        <FooterCol title="House" links={[
          ["About Us", "/about"],
          ["Collab With Us", "/collab"],
          ["Contact", "/contact"],
          ["Privacy", "/faq"],
          ["Terms", "/faq"],
        ]} />
      </div>

      <div className="border-t border-cream/15">
        <div className="container-luxe py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[0.7rem] tracking-[0.2em] uppercase text-cream/60">
          <div>© {new Date().getFullYear()} Melanvée. All rights reserved.</div>
          <div className="flex gap-5 text-cream">
            <a href="#" aria-label="Instagram" className="hover:text-blush"><Instagram size={16} /></a>
            <a href="#" aria-label="TikTok" className="hover:text-blush"><Music2 size={16} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-blush"><Youtube size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="space-y-4">
      <h4 className="text-[0.7rem] tracking-[0.28em] uppercase text-cream/60 font-sans">{title}</h4>
      <ul className="space-y-2.5 text-sm text-cream/85">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link to={href} className="hover:text-blush transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
