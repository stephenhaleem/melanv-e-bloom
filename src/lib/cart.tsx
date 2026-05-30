import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Price, useCurrency, formatPrice } from "./currency";
import { PRODUCTS, type Product } from "./products";

export type CartLine = {
  slug: string;
  length: number | null;
  qty: number;
};

type Ctx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, length: number | null, qty?: number) => void;
  remove: (slug: string, length: number | null) => void;
  setQty: (slug: string, length: number | null, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartCtx = createContext<Ctx | null>(null);

const KEY = "melanvee:cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<Ctx>(() => {
    const find = (slug: string, length: number | null) =>
      lines.findIndex((l) => l.slug === slug && l.length === length);

    const subtotal = lines.reduce((sum, l) => {
      const p = PRODUCTS.find((x) => x.slug === l.slug);
      return sum + (p ? p.price * l.qty : 0);
    }, 0);

    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal,
      open,
      setOpen,
      add: (slug, length, qty = 1) => {
        setLines((prev) => {
          const i = prev.findIndex((l) => l.slug === slug && l.length === length);
          if (i >= 0) {
            const next = [...prev];
            next[i] = { ...next[i], qty: next[i].qty + qty };
            return next;
          }
          return [...prev, { slug, length, qty }];
        });
        setOpen(true);
      },
      remove: (slug, length) =>
        setLines((prev) => prev.filter((l) => !(l.slug === slug && l.length === length))),
      setQty: (slug, length, qty) =>
        setLines((prev) => {
          const i = find(slug, length);
          if (i < 0) return prev;
          if (qty <= 0) return prev.filter((_, idx) => idx !== i);
          const next = [...prev];
          next[i] = { ...next[i], qty };
          return next;
        }),
      clear: () => setLines([]),
    };
  }, [lines, open]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, setQty, remove, count } = useCart();
  const { currency } = useCurrency();

  return (
    <>
      {/* overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-espresso/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-ivory shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <div className="eyebrow">Your Bag</div>
            <div className="font-serif text-2xl text-espresso mt-1">
              {count} {count === 1 ? "piece" : "pieces"}
            </div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" className="text-cocoa hover:text-espresso">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <div className="p-10 text-center space-y-4">
              <ShoppingBag size={24} className="mx-auto text-cocoa/40" />
              <p className="text-muted-foreground text-sm">Your bag is quiet.</p>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="inline-block border-b border-cocoa pb-1 text-[0.72rem] tracking-[0.25em] uppercase text-cocoa"
              >
                Browse the house
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {lines.map((line) => {
                const p = PRODUCTS.find((x) => x.slug === line.slug) as Product | undefined;
                if (!p) return null;
                return (
                  <li key={`${line.slug}-${line.length ?? "x"}`} className="flex gap-4 p-6">
                    <div className="w-20 h-24 bg-sand overflow-hidden flex-shrink-0">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-base text-espresso leading-tight">{p.name}</h3>
                          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                            {line.length ? `${line.length}"` : p.segment}
                          </p>
                        </div>
                        <Price gbp={p.price * line.qty} className="text-cocoa text-sm" />
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => setQty(line.slug, line.length, line.qty - 1)}
                            className="w-7 h-7 flex items-center justify-center text-cocoa hover:bg-cream"
                            aria-label="Decrease"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-7 text-center text-xs">{line.qty}</span>
                          <button
                            onClick={() => setQty(line.slug, line.length, line.qty + 1)}
                            className="w-7 h-7 flex items-center justify-center text-cocoa hover:bg-cream"
                            aria-label="Increase"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(line.slug, line.length)}
                          className="text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground hover:text-espresso"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border p-6 space-y-4 bg-cream">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-espresso">{formatPrice(subtotal, currency)}</span>
            </div>
            <p className="text-[0.7rem] text-muted-foreground">
              {subtotal >= 100
                ? "Complimentary shipping unlocked."
                : `Add ${formatPrice(100 - subtotal, currency)} for complimentary shipping.`}
            </p>
            <button className="w-full bg-cocoa text-cream py-4 text-[0.72rem] tracking-[0.3em] uppercase hover:bg-espresso transition">
              Checkout
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-full text-[0.7rem] tracking-[0.25em] uppercase text-cocoa hover:text-espresso"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
