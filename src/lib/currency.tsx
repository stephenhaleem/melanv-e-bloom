import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CurrencyCode = "GBP" | "USD" | "EUR" | "NGN" | "CAD" | "AUD";

// Approximate GBP-base conversion rates (display only — not for checkout)
export const RATES: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  GBP: { symbol: "£", rate: 1, label: "GBP · £" },
  USD: { symbol: "$", rate: 1.27, label: "USD · $" },
  EUR: { symbol: "€", rate: 1.17, label: "EUR · €" },
  NGN: { symbol: "₦", rate: 2050, label: "NGN · ₦" },
  CAD: { symbol: "C$", rate: 1.74, label: "CAD · C$" },
  AUD: { symbol: "A$", rate: 1.93, label: "AUD · A$" },
};

type Ctx = { currency: CurrencyCode; setCurrency: (c: CurrencyCode) => void };
const CurrencyCtx = createContext<Ctx>({ currency: "GBP", setCurrency: () => {} });

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("GBP");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("melanvee:currency") : null;
    if (saved && saved in RATES) setCurrency(saved as CurrencyCode);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("melanvee:currency", currency);
  }, [currency]);

  return <CurrencyCtx.Provider value={{ currency, setCurrency }}>{children}</CurrencyCtx.Provider>;
}

export const useCurrency = () => useContext(CurrencyCtx);

export function formatPrice(gbp: number, code: CurrencyCode) {
  const { symbol, rate } = RATES[code];
  const value = gbp * rate;
  if (code === "NGN") return `${symbol}${Math.round(value).toLocaleString()}`;
  return `${symbol}${value.toFixed(value < 100 ? 2 : 0)}`;
}

export function Price({ gbp, className }: { gbp: number; className?: string }) {
  const { currency } = useCurrency();
  return <span className={className}>{formatPrice(gbp, currency)}</span>;
}
