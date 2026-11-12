import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import textureCloseup from "@/assets/texture-closeup.jpg";

const ROWS = [
  ["Curl pattern", "Matched to real 3C–4C texture", "Generic “afro” curl, one size fits all"],
  ["Blend", "Designed to melt into your leave-out", "Shine and texture that give it away"],
  ["Hairline", "Textures that match how our hair really grows", "Over-dense, flat, needs hours of work"],
  ["Blend", "Made to blend with your own leave-out", "Sits on top of your hair and looks like a wig"],
  ["Longevity", "Holds pattern wash after wash", "Frizzes and tangles within weeks"],
  ["Ready to wear", "Blends with your own leave-out", "Needs a stylist before it's wearable"],
  ["Care", "Personal guidance from our concierge", "No help after checkout"],
];

export const Route = createFileRoute("/why-our-curls")({
  beforeLoad: () => { throw redirect({ to: "/why-we-exist" }); },
  head: () => ({
    meta: [
      { title: "Why Our Curls Blend — MELANVÉE" },
      {
        name: "description",
        content:
          "How Melanvée textured hair differs from other brands — blend, curl pattern, comfort and longevity compared.",
      },
      { property: "og:title", content: "Why Our Curls Blend — MELANVÉE" },
      {
        property: "og:description",
        content: "Ours vs theirs: what makes Melanvée curls blend like your own.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhyPage,
});

function WhyPage() {
  return (
    <SiteLayout>
      <section className="container-luxe grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="space-y-6">
          <div className="eyebrow">Why our curls blend</div>
          <h1 className="font-serif text-5xl leading-[1.05] text-espresso md:text-6xl text-balance">
            Not just textured. <em className="text-burgundy">Your</em> texture.
          </h1>
          <p className="max-w-md leading-relaxed text-muted-foreground">
            Most brands make one curl and call it textured. We study the curl patterns, density
            and sheen of real natural hair, so ours sits next to your leave-out and nobody can
            tell where you end and it begins.
          </p>
        </div>
        <div className="aspect-[4/5] overflow-hidden bg-sand">
          <img
            src={textureCloseup}
            alt="Close-up of Melanvée curl texture"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-burgundy py-20 text-cream md:py-28">
        <div className="container-luxe">
          <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl">Ours vs theirs.</h2>
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-[1fr_1.3fr_1.3fr] gap-4 border-b border-cream/30 pb-4 text-[0.6rem] uppercase tracking-[0.28em] md:text-[0.7rem]">
              <span />
              <span>Melanvée</span>
              <span className="text-cream/60">Others</span>
            </div>
            {ROWS.map(([label, ours, theirs]) => (
              <div
                key={label}
                className="grid grid-cols-[1fr_1.3fr_1.3fr] gap-4 border-b border-cream/15 py-5 text-sm"
              >
                <span className="font-serif text-lg">{label}</span>
                <span className="flex gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                  {ours}
                </span>
                <span className="flex gap-2 text-cream/55">
                  <Minus size={16} className="mt-0.5 shrink-0" />
                  {theirs}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe py-20 text-center">
        <h2 className="font-serif text-4xl text-espresso">Feel the difference.</h2>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Link
            to="/shop"
            className="bg-burgundy px-10 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-cream hover:bg-burgundy-deep"
          >
            Shop textured hair
          </Link>
          <Link to="/shop" search={{ view: "texture" }} className="border-b border-burgundy pb-0.5 text-sm text-burgundy">
            Find your texture
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
