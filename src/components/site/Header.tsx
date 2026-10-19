import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { useCart } from "@/lib/cart";
import { SEGMENTS } from "@/lib/products";
import { COLLAB_URL } from "@/lib/site";

const DESKTOP_LEFT = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
] as const;

const DESKTOP_RIGHT = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function segmentAnchor(segment: string) {
  return segment
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [shopExpanded, setShopExpanded] = useState(true);
  const { count, setOpen: setCartOpen } = useCart();

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-ivory/95 backdrop-blur">
      <div className="bg-cocoa py-2 text-[0.68rem] uppercase tracking-[0.2em] text-cream">
        <div className="container-luxe flex items-center justify-between gap-4">
          <span className="hidden sm:block opacity-70">Worldwide shipping · Klarna available</span>
          <span className="flex-1 text-center sm:flex-none">
            Complimentary shipping on orders over £100
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
              {item.label}
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
                {item.label}
              </Link>
            ))}
            <a
              href={COLLAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-espresso"
            >
              Collab
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
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-110px)] overflow-y-auto border-t border-border/70 bg-ivory shadow-xl md:hidden"
        >
          <nav className="container-luxe flex flex-col py-4 text-lg text-cocoa">
            <Link to="/" onClick={closeMenu} className="border-b border-border/60 py-4">
              Home
            </Link>

            <div className="border-b border-border/60 py-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShopExpanded((current) => !current)}
                  aria-expanded={shopExpanded}
                  className="font-medium text-espresso"
                >
                  Shop
                </button>
                <button
                  type="button"
                  onClick={() => setShopExpanded((current) => !current)}
                  aria-label={shopExpanded ? "Collapse shop links" : "Expand shop links"}
                  className="p-2 text-cocoa"
                >
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${shopExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {shopExpanded && (
                <div className="mt-4 ml-1 space-y-5 border-l border-border py-2 pl-5">
                  <Link to="/shop" onClick={closeMenu} className="block py-1 text-base">
                    All products
                  </Link>
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-cocoa/75">Collections</p>
                    {SEGMENTS.map((segment) => (
                      <a
                        key={segment}
                        href={`/shop#${segmentAnchor(segment)}`}
                        onClick={closeMenu}
                        className="block py-1 text-base"
                      >
                        {segment}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" onClick={closeMenu} className="border-b border-border/60 py-4">
              About
            </Link>
            <a
              href={COLLAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="border-b border-border/60 py-4"
            >
              Collab
            </a>
            <Link to="/contact" onClick={closeMenu} className="py-4">
              Contact
            </Link>
            <Link
              to="/shop"
              onClick={closeMenu}
              className="mt-3 inline-flex w-fit items-center justify-center bg-cocoa px-7 py-4 text-sm text-cream transition-colors hover:bg-espresso"
            >
              Shop now
            </Link>
            <div className="mt-5 border-t border-border/60 pt-4">
              <CurrencySwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
