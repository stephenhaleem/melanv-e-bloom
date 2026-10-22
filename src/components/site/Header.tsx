import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { useCart } from "@/lib/cart";
import { COLLAB_URL } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

const DESKTOP_LEFT = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
] as const;

const DESKTOP_RIGHT = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { text } = useSiteContent();
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-ivory/95 backdrop-blur">
      <div className="bg-cocoa py-2 text-[0.68rem] uppercase tracking-[0.2em] text-cream">
        <div className="container-luxe flex items-center justify-between gap-4">
          <span className="hidden sm:block opacity-70">
            {text("header.promo.secondary", "Worldwide shipping · Klarna available")}
          </span>
          <span className="flex-1 text-center sm:flex-none">
            {text("header.promo.primary", "Complimentary shipping on orders over £100")}
          </span>
          <div className="hidden sm:block">
            <CurrencySwitcher tone="light" />
          </div>
        </div>
      </div>

      <div className="container-luxe flex h-[72px] items-center justify-between gap-4">
        <nav className="hidden flex-1 items-center gap-8 text-sm text-cocoa md:flex">
          {DESKTOP_LEFT.map((item) => (
            <Link key={item.to} to={item.to} className="transition-colors hover:text-espresso">
              {item.to === "/" ? text("nav.home", item.label) : text("nav.shop", item.label)}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="text-cocoa md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        <Link
          to="/"
          onClick={closeMenu}
          className="font-serif text-xl tracking-[0.26em] text-cocoa sm:text-2xl md:text-3xl"
        >
          MELANVÉE
        </Link>

        <div className="flex flex-1 items-center justify-end gap-5">
          <nav className="hidden items-center gap-8 text-sm text-cocoa md:flex">
            {DESKTOP_RIGHT.map((item) => (
              <Link key={item.to} to={item.to} className="transition-colors hover:text-espresso">
                {item.to === "/about"
                  ? text("nav.about", item.label)
                  : text("nav.contact", item.label)}
              </Link>
            ))}
            <a
              href={COLLAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-espresso"
            >
              {text("nav.collab", "Collab")}
            </a>
          </nav>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}
            className="relative text-cocoa transition-colors hover:text-espresso"
          >
            <ShoppingBag size={19} />
            <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cocoa text-[0.6rem] text-cream">
              {count}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-border/60 bg-ivory md:hidden">
          <nav className="container-luxe flex flex-col gap-3 py-4 text-[0.85rem] uppercase tracking-[0.18em] text-cocoa">
            <Link to="/" onClick={closeMenu} className="border-b border-border/40 py-2">
              {text("nav.home", "Home")}
            </Link>
            <Link to="/shop" onClick={closeMenu} className="border-b border-border/40 py-2">
              {text("nav.shop", "Shop")}
            </Link>
            <Link to="/about" onClick={closeMenu} className="border-b border-border/40 py-2">
              {text("nav.about", "About")}
            </Link>
            <a
              href={COLLAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="border-b border-border/40 py-2"
            >
              {text("nav.collab", "Collab")}
            </a>
            <Link to="/contact" onClick={closeMenu} className="border-b border-border/40 py-2">
              {text("nav.contact", "Contact")}
            </Link>
            <div className="pt-3">
              <CurrencySwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
