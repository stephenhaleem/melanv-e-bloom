import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HAIR_QUANTITIES } from "@/lib/hair-quantity";
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
      ["Do you ship worldwide?", "Yes, we ship to the UK, USA, Canada, Europe and most of the rest of the world."],
      ["Can I change my delivery address after ordering?", "Email customercare@melanvee.com as soon as possible. If your order hasn't shipped yet, we'll update it."],
      ["My parcel is late. What should I do?", "Check your tracking link first. If it hasn't moved for a few days, email us with your order number and we'll chase it."],
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
      ["What products do you sell?", "U/V part wigs, half wigs, crochet hair and bundles, plus hot tools for styling."],
      ["Will the hair blend with my natural hair?", "That's the whole idea. Our textures are chosen to look like natural textured hair, so they blend with your leave-out."],
      ["How much leave-out do I need?", "For U/V part wigs, a small section at your parting. For half wigs, your front hairline and edges."],
      ["How many packs or bundles do I need?", `For crochet hair, you need ${HAIR_QUANTITIES.crochet.standard} packs for a full look, or ${HAIR_QUANTITIES.crochet.extra} for extra fullness. For bundles, choose ${HAIR_QUANTITIES.bundles.standard} or ${HAIR_QUANTITIES.bundles.extra}. Message us if you would like help choosing.`],
      ["Can I add a special request to my order?", "Yes. Open your bag and use the order note box before checkout. We read every note before packing."],
      ["Can I see the hair before I buy?", "Message us on WhatsApp and we can share extra photos or videos of the texture."],
      [
        "Which texture should I choose?",
        "Pick the texture closest to your natural hair for the most seamless blend. In Shop, choose Shop by Texture to browse into Curly, Straight, Bouncy and Coily.",
      ],
      [
        "What's the difference between a U/V part wig and a half wig?",
        "U/V part wigs leave a small section of your own hair out at the parting for a natural blend. Half wigs sit further back and blend with your hairline and front leave-out.",
      ],
      ["What lengths are available?", "Our hair comes in 14 to 26 inches."],
      [
        "I'm a beginner. Is this for me?",
        "Yes. U/V part and half wigs are some of the easiest styles to learn, and we are happy to guide you through your first install.",
      ],
    ],
  },
  {
    title: "Hair Care",
    items: [
      ["How often should I wash my hair?", "Every 1–2 weeks with regular wear, or when you notice product build-up."],
      ["How do I store it?", "Detangled, dry and loosely in its bag or on a stand, away from direct heat and sunlight."],
      ["Will it tangle or shed?", "A little natural shedding is normal. Keep it moisturised and detangle gently to keep it at its best."],
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
      ["My order arrived damaged or wrong. What now?", "Email customercare@melanvee.com within 48 hours with photos and your order number and we'll put it right at no cost to you."],
      ["How long do refunds take?", "Once your return passes inspection, refunds are issued to your original payment method, usually within 5–10 business days."],
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
    title: "Collabs & Contact",
    items: [
      ["How can I contact you?", "Email customercare@melanvee.com or message us on WhatsApp using the green button."],
      ["Can I collaborate with Melanvée?", "Yes, we'd love to hear from you. Use the Collab link in the menu to apply."],
      ["Do you offer wholesale?", "Email customercare@melanvee.com with details of your business and we'll be in touch."],
    ],
  },
  {
    title: "Payment & Currency",
    items: [
      ["Which payment methods do you accept?", "Major debit and credit cards, Apple Pay, Klarna and Clearpay."],
      ["Is my payment secure?", "Yes. Payments are processed through a secure, encrypted checkout."],
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
        <div className="max-w-3xl mx-auto space-y-5 mb-16 border-b border-border pb-10">
          <div className="eyebrow">Answered</div>
          <h1 className="font-display text-5xl md:text-6xl text-espresso text-balance">
            Choosing, caring, wearing.
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
          {[GROUPS[1], GROUPS[0], ...GROUPS.slice(2)].map((g) => (
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
      <Button variant="ghost"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="h-auto w-full whitespace-normal px-0 py-0 flex justify-between items-center gap-6 text-left hover:bg-transparent"
      >
        <span className="font-serif text-lg text-espresso">{q}</span>
        <ChevronDown
          size={18}
          className={`text-cocoa shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>
      <div
        className={`overflow-hidden transition-all duration-500 ${open ? "max-h-[600px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}
