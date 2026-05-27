import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency, RATES, type CurrencyCode } from "@/lib/currency";

export function CurrencySwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);

  const color = tone === "light" ? "text-cream hover:text-blush" : "text-cocoa hover:text-espresso";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-[0.68rem] tracking-[0.2em] uppercase ${color}`}
        aria-label="Change currency"
      >
        {RATES[currency].symbol} {currency} <ChevronDown size={11} className={open ? "rotate-180 transition" : "transition"} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-ivory border border-border shadow-lg z-50 min-w-[10rem]">
          {(Object.keys(RATES) as CurrencyCode[]).map((c) => (
            <button
              key={c}
              onClick={() => { setCurrency(c); setOpen(false); }}
              className={`block w-full text-left px-4 py-2.5 text-[0.7rem] tracking-[0.18em] uppercase hover:bg-cream ${currency === c ? "bg-cream text-cocoa" : "text-espresso"}`}
            >
              {RATES[c].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
