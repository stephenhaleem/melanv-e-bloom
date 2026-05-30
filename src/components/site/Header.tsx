import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { CurrencySwitcher } from "./CurrencySwitcher";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/hair-care", label: "Hair Care" },
  { to: "/collab", label: "Collab" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-ivory/85 backdrop-blur">
      <div className="bg-cocoa text-cream text-[0.68rem] tracking-[0.25em] uppercase py-2">
        <div className="container-luxe flex items-center justify-between gap-4">
          <span className="hidden sm:block opacity-70">Worldwide shipping · Klarna available</span>
          <span className="text-center flex-1 sm:flex-none">Complimentary shipping on orders over £100</span>
          <div className="hidden sm:block"><CurrencySwitcher tone="light" /></div>
        </div>
      </div>
      <div className="container-luxe flex items-center justify-between py-5">
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-cocoa"
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className="hidden md:flex gap-7 text-[0.78rem] tracking-[0.18em] uppercase text-cocoa flex-1">
          {NAV.slice(0, 3).map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-espresso transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="font-serif text-2xl md:text-3xl tracking-[0.32em] text-cocoa">
          MELANVÉE
        </Link>

        <div className="hidden md:flex gap-7 text-[0.78rem] tracking-[0.18em] uppercase text-cocoa flex-1 justify-end">
          {NAV.slice(3).map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-espresso transition-colors">
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 text-cocoa md:ml-8">
          <button aria-label="Search" className="hover:text-espresso"><Search size={18} /></button>
          <button aria-label="Wishlist" className="hover:text-espresso hidden sm:block"><Heart size={18} /></button>
          <button aria-label="Bag" className="hover:text-espresso relative">
            <ShoppingBag size={18} />
            <span className="absolute -top-1.5 -right-2 text-[0.6rem] bg-cocoa text-cream rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-ivory">
          <nav className="container-luxe flex flex-col py-4 gap-3 text-[0.85rem] tracking-[0.18em] uppercase text-cocoa">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 border-b border-border/40">
                {n.label}
              </Link>
            ))}
            <div className="pt-3"><CurrencySwitcher /></div>
          </nav>
        </div>
      )}
    </header>
  );
}
