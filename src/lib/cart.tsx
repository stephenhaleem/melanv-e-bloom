import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Price, useCurrency, formatPrice } from "./currency";
import { useShopifyCart } from "./shopify-cart";
import type { CartDisplayLine } from "./shopify-cart";

type Ctx = {
  lines: CartDisplayLine[];
  count: number;
  subtotal: number;
  note: string;
  add: (variantId: string, qty?: number) => Promise<void>;
  remove: (lineId: string) => Promise<void>;
  setQty: (lineId: string, qty: number) => Promise<void>;
  open: boolean;
  setOpen: (v: boolean) => void;
  checkout: (note: string) => Promise<void>;
  error: string | null;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useShopifyCart();
  const [open, setOpen] = useState(false);

  const value = useMemo<Ctx>(() => {
    return {
      lines: cart.lines,
      count: cart.count,
      subtotal: cart.totalGBP,
      note: cart.note,
      open,
      setOpen,
      add: async (variantId, qty = 1) => {
        await cart.addToCart(variantId, qty);
        setOpen(true);
      },
      remove: cart.removeLine,
      setQty: cart.updateQty,
      checkout: cart.checkout,
      error: cart.error,
    };
  }, [cart, open]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartDrawer() {
  const {
    open,
    setOpen,
    lines,
    subtotal,
    setQty,
    remove,
    count,
    note: cartNote,
    checkout,
    error,
  } = useCart();
  const { currency } = useCurrency();
  const [actionError, setActionError] = useState(false);
  const [note, setNote] = useState(cartNote);

  useEffect(() => setNote(cartNote), [cartNote]);

  async function performCartAction(action: () => Promise<void>) {
    setActionError(false);
    try {
      await action();
    } catch (error) {
      console.error("[shopify] Cart action failed:", error);
      setActionError(true);
    }
  }

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
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-cocoa hover:text-espresso"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {error && (
            <p role="alert" className="px-6 py-4 text-sm text-destructive">
              {error}
            </p>
          )}
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
                return (
                  <li key={line.lineId} className="flex gap-4 p-6">
                    <div className="w-20 h-24 bg-sand overflow-hidden flex-shrink-0">
                      <img
                        src={line.image}
                        alt={line.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-base text-espresso leading-tight">
                            {line.name}
                          </h3>
                          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                            {line.variantTitle}
                          </p>
                        </div>
                        <Price gbp={line.priceGBP * line.qty} className="text-cocoa text-sm" />
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() =>
                              void performCartAction(() => setQty(line.lineId, line.qty - 1))
                            }
                            className="w-7 h-7 flex items-center justify-center text-cocoa hover:bg-cream"
                            aria-label="Decrease"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-7 text-center text-xs">{line.qty}</span>
                          <button
                            onClick={() =>
                              void performCartAction(() => setQty(line.lineId, line.qty + 1))
                            }
                            className="w-7 h-7 flex items-center justify-center text-cocoa hover:bg-cream"
                            aria-label="Increase"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => void performCartAction(() => remove(line.lineId))}
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
            <label className="block space-y-2 text-[0.7rem] tracking-[0.18em] uppercase text-cocoa">
              Order note (optional)
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                maxLength={500}
                rows={3}
                placeholder="Add a note for your order"
                className="w-full resize-y bg-ivory border border-border px-3 py-3 text-sm normal-case tracking-normal text-espresso"
              />
            </label>
            {actionError && (
              <p role="alert" className="text-sm text-destructive">
                The cart couldn’t be updated. Please try again.
              </p>
            )}
            <button
              onClick={() => void performCartAction(() => checkout(note))}
              className="w-full bg-cocoa text-cream py-4 text-[0.72rem] tracking-[0.3em] uppercase hover:bg-espresso transition"
            >
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
