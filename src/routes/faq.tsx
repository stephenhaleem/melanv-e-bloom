import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — MELANVÉE" },
      { name: "description", content: "Shipping, care, returns, payment plans and texture matching — every answer the Melanvée community asks." },
      { property: "og:title", content: "Melanvée FAQ" },
      { property: "og:description", content: "Everything about shipping, care, returns and texture matching." },
    ],
  }),
  component: FAQPage,
});

const groups: { title: string; items: [string, string][] }[] = [
  {
    title: "Shipping & Delivery",
    items: [
      ["How long does processing take?", "Orders are processed within 1–2 business days. Pre-orders ship as stated on the product page."],
      ["Do you ship internationally?", "Yes — we ship to 42+ countries, fully tracked and duty-clear where possible."],
      ["When will my order arrive?", "UK: 2–4 business days. EU: 4–7. North America: 5–8. Rest of world: 7–10."],
      ["Is shipping free?", "Complimentary shipping on UK orders over £120 and international orders over £200."],
    ],
  },
  {
    title: "Hair Care",
    items: [
      ["How often should I wash my unit?", "Co-wash every 2 weeks for daily wear. Deep condition monthly."],
      ["Can I use heat?", "Yes — we recommend 150°C max with heat protectant. All units are heat-friendly."],
      ["How do I store my wig?", "On a satin-lined mannequin stand or in the original silk pouch. Avoid sunlight."],
      ["How long will it last?", "With proper care, 12–24 months of regular wear."],
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      ["What is your return policy?", "Unworn, unaltered units in original packaging may be returned within 14 days for store credit."],
      ["Can I exchange for a different length?", "Yes — within 14 days, subject to availability. Concierge will arrange."],
    ],
  },
  {
    title: "Payment & Plans",
    items: [
      ["What payment methods do you accept?", "Visa, Mastercard, Amex, Apple Pay, Google Pay, PayPal, Klarna, Clearpay."],
      ["Do you offer pay-in-4?", "Yes — Klarna and Clearpay are available at checkout in supported regions."],
    ],
  },
  {
    title: "Texture & Beginners",
    items: [
      ["I'm a beginner — which wig should I start with?", "Our glueless U-part and pre-styled cocoa curl units are designed for first installs."],
      ["Can you help me match my natural texture?", "Yes, free of charge. Message us a clear photo on WhatsApp and our team will recommend."],
    ],
  },
];

export function FAQPage() {
  return (
    <SiteLayout>
      <section className="container-luxe py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center space-y-5 mb-16">
          <div className="eyebrow">Answered</div>
          <h1 className="font-serif text-5xl md:text-6xl text-espresso text-balance">Every quiet question.</h1>
          <p className="text-muted-foreground">Still need a human? <Link to="/contact" className="border-b border-cocoa pb-0.5 text-cocoa">Talk to the concierge</Link>.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-14">
          {groups.map(g => (
            <div key={g.title}>
              <h2 className="font-serif text-2xl text-espresso mb-4 pb-3 border-b border-cocoa/20">{g.title}</h2>
              <div className="divide-y divide-border">
                {g.items.map(([q, a]) => <Item key={q} q={q} a={a} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-5">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center gap-6 text-left">
        <span className="font-serif text-lg text-espresso">{q}</span>
        <ChevronDown size={18} className={`text-cocoa shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}
