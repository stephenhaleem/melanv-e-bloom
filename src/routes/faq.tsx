import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — MELANVÉE" },
      {
        name: "description",
        content:
          "Shipping, care, returns, payment plans and texture matching — every answer the Melanvée community asks.",
      },
      { property: "og:title", content: "Melanvée FAQ" },
      {
        property: "og:description",
        content: "Everything about shipping, care, returns and texture matching.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FAQPage,
});

const GROUPS: { title: string; items: [string, string][] }[] = [
  {
    title: "Shipping & Delivery",
    items: [
      ["How quickly will my order ship?", "All orders ship within 1–3 business days."],
      [
        "How long does delivery take?",
        "After dispatch: UK 3–5 business days · USA & Canada 2–6 business days · Europe 3–7 business days · Rest of the world 3–8 business days.",
      ],
      ["Is shipping free?", "Complimentary shipping on all orders over £100."],
      [
        "Will I get tracking?",
        "Yes. Every order is tracked and you'll receive a tracking link by email as soon as it leaves us.",
      ],
      [
        "Will I pay customs or duties?",
        "Orders outside the UK may be subject to local import duties or taxes, which are the customer's responsibility.",
      ],
    ],
  },
  {
    title: "Choosing Your Hair",
    items: [
      [
        "Which texture should I choose?",
        "Pick the texture closest to your natural hair for the most seamless blend. Our Shop by Texture page groups everything into Curly, Straight, Bouncy and Coily.",
      ],
      [
        "What's the difference between a U/V part wig and a half wig?",
        "U/V part wigs leave a small section of your own hair out at the parting for a natural blend. Half wigs sit further back and blend with your hairline and front leave-out.",
      ],
      ["What lengths are available?", "Our hair comes in 14 to 26 inches."],
      [
        "I'm a beginner. Is this for me?",
        "Yes. Our units are pre-styled and glueless — most women install in minutes. Our concierge is happy to guide you.",
      ],
    ],
  },
  {
    title: "Hair Care",
    items: [
      [
        "How do I care for my curls?",
        "Co-wash with a sulphate-free conditioner, detangle gently with fingers or a wide-tooth comb, and air dry on a stand.",
      ],
      [
        "Can I use heat?",
        "Yes, on low to medium heat with a heat protectant. Our hot tools are designed to be kind to texture.",
      ],
      [
        "How long will my hair last?",
        "With proper care, our hair lasts many months of regular wear.",
      ],
      [
        "Can I colour my hair?",
        "We recommend a professional colourist. Coloured or altered hair cannot be returned.",
      ],
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      [
        "Can I return my order?",
        "Returns are accepted within 7 days of delivery on unopened, unworn pieces in original packaging.",
      ],
      [
        "Can I exchange for a different texture or length?",
        "Yes, within 7 days on unworn pieces. See our Policies page for full details.",
      ],
    ],
  },
  {
    title: "Payment & Currency",
    items: [
      [
        "Can I pay in instalments?",
        "Yes — Klarna and Clearpay are available at checkout.",
      ],
      [
        "Can I shop in my currency?",
        "Use the currency switcher at the top of the site to view prices in your currency. Payment is processed in GBP.",
      ],
    ],
  },
];

function FAQPage() {
  return (
    <SiteLayout>
      <section className="container-luxe py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center space-y-5 mb-16">
          <div className="eyebrow">Answered</div>
          <h1 className="font-serif text-5xl md:text-6xl text-espresso text-balance">
            Every quiet question.
          </h1>
          <p className="text-muted-foreground">
            Still need a human?{" "}
            <Link to="/contact" className="border-b border-cocoa pb-0.5 text-cocoa">
              Talk to the concierge
            </Link>
            .
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-14">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="font-serif text-2xl text-espresso mb-4 pb-3 border-b border-cocoa/20">
                {g.title}
              </h2>
              <div className="divide-y divide-border">
                {g.items.map(([q, a]) => (
                  <Item key={q} q={q} a={a} />
                ))}
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
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-6 text-left"
      >
        <span className="font-serif text-lg text-espresso">{q}</span>
        <ChevronDown
          size={18}
          className={`text-cocoa shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${open ? "max-h-60 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}
