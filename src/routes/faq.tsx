import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSiteContent } from "@/lib/site-content";

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
    ],
  }),
  component: FAQPage,
});

export function FAQPage() {
  const { text } = useSiteContent();
  const groupSizes = [4, 4, 2, 2, 2];
  const groups = groupSizes.map((size, groupIndex) => {
    const groupNumber = groupIndex + 1;
    return {
      title: text(`faq.group.${groupNumber}.title`, ""),
      items: Array.from({ length: size }, (_, itemIndex) => {
        const itemNumber = itemIndex + 1;
        return [
          text(`faq.group.${groupNumber}.q${itemNumber}`, ""),
          text(`faq.group.${groupNumber}.a${itemNumber}`, ""),
        ] as [string, string];
      }),
    };
  });
  return (
    <SiteLayout>
      <section className="container-luxe py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center space-y-5 mb-16">
          <div className="eyebrow">{text("faq.eyebrow", "Answered")}</div>
          <h1 className="font-serif text-5xl md:text-6xl text-espresso text-balance">
            {text("faq.title", "Every quiet question.")}
          </h1>
          <p className="text-muted-foreground">
            {text("faq.description", "Still need a human?")}{" "}
            <Link to="/contact" className="border-b border-cocoa pb-0.5 text-cocoa">
              {text("faq.concierge.link", "Talk to the concierge")}
            </Link>
            .
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-14">
          {groups.map((g) =>
            !g.title ? null : (
              <div key={g.title}>
                <h2 className="font-serif text-2xl text-espresso mb-4 pb-3 border-b border-cocoa/20">
                  {g.title}
                </h2>
                <div className="divide-y divide-border">
                  {g.items
                    .filter(([question]) => question)
                    .map(([q, a]) => (
                      <Item key={q} q={q} a={a} />
                    ))}
                </div>
              </div>
            ),
          )}
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
        className={`overflow-hidden transition-all duration-500 ${open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}
