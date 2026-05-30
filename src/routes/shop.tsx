import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Heart, Star, SlidersHorizontal, ArrowRight } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { Price } from "@/lib/currency";
import colTextured from "@/assets/collection-textured.jpg";
import colUpart from "@/assets/collection-upart.jpg";
import colPonytail from "@/assets/collection-ponytail.jpg";
import colBundles from "@/assets/collection-bundles.jpg";
import textureCloseup from "@/assets/texture-closeup.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — MELANVÉE" },
      { name: "description", content: "Shop Melanvée — Back to Work edit, Hot Tools, U-Part, V-Part, Half Wigs and Crochet." },
      { property: "og:title", content: "Shop MELANVÉE" },
      { property: "og:description", content: "Back to Work edit, Hot Tools, U-Part, V-Part, Half Wigs and Crochet." },
    ],
  }),
  component: ShopPage,
});

type Construction = "U-Part" | "V-Part" | "Half Wig" | "Full Wig" | "Crochet" | "Hot Tools";
type Drop = "Back to Work" | "Summer Edit" | "Signature" | "Tools";

type Product = {
  name: string;
  price: number; // GBP
  length: string;
  img: string;
  rating: number;
  reviews: number;
  tag: string | null;
  construction: Construction;
  drop: Drop;
};

const items: Product[] = [
  // Back to Work — Autumn launch
  { name: "Zuri Kinky Straight", price: 295, length: "20\"", img: colUpart, rating: 4.9, reviews: 84, tag: "New", construction: "U-Part", drop: "Back to Work" },
  { name: "Lielle Yaki Straight", price: 275, length: "22\"", img: colUpart, rating: 4.9, reviews: 71, tag: "New", construction: "V-Part", drop: "Back to Work" },
  { name: "ISI Bouncy", price: 310, length: "20\"", img: colTextured, rating: 4.8, reviews: 96, tag: "New", construction: "Full Wig", drop: "Back to Work" },

  // Signature
  { name: "Kimi Curl", price: 289, length: "22\"", img: colTextured, rating: 4.9, reviews: 412, tag: "Bestseller", construction: "U-Part", drop: "Signature" },
  { name: "Zora Coil", price: 305, length: "20\"", img: textureCloseup, rating: 4.9, reviews: 244, tag: null, construction: "Half Wig", drop: "Signature" },
  { name: "Lola Bouncy", price: 280, length: "22\"", img: colTextured, rating: 4.8, reviews: 318, tag: "Loved", construction: "V-Part", drop: "Signature" },

  // Summer Edit
  { name: "Alima Bouncy", price: 270, length: "20\"", img: colTextured, rating: 4.8, reviews: 187, tag: null, construction: "Half Wig", drop: "Summer Edit" },
  { name: "Jaelle Bob Wig", price: 235, length: "12\"", img: colUpart, rating: 4.9, reviews: 221, tag: "Loved", construction: "Full Wig", drop: "Summer Edit" },
  { name: "Summer Water Wave", price: 260, length: "22\"", img: colBundles, rating: 4.8, reviews: 154, tag: null, construction: "U-Part", drop: "Summer Edit" },

  // Crochet
  { name: "Burmese Crochet", price: 145, length: "18\"", img: colPonytail, rating: 4.8, reviews: 92, tag: null, construction: "Crochet", drop: "Signature" },
  { name: "Summer Crochet", price: 135, length: "20\"", img: colPonytail, rating: 4.7, reviews: 78, tag: null, construction: "Crochet", drop: "Summer Edit" },

  // Hot Tools
  { name: "Signature Straightener", price: 120, length: "Pro", img: textureCloseup, rating: 4.9, reviews: 64, tag: "New", construction: "Hot Tools", drop: "Tools" },
  { name: "Curling Iron", price: 110, length: "32mm", img: textureCloseup, rating: 4.8, reviews: 47, tag: "New", construction: "Hot Tools", drop: "Tools" },
  { name: "2-in-1 Straightener & Curler", price: 145, length: "Hybrid", img: textureCloseup, rating: 4.9, reviews: 58, tag: "New", construction: "Hot Tools", drop: "Tools" },
  { name: "Automatic Curler", price: 165, length: "Auto", img: textureCloseup, rating: 4.8, reviews: 39, tag: "New", construction: "Hot Tools", drop: "Tools" },
];

const filters = ["All", "U/V Part Wigs", "Half Wig", "Full Wig", "Crochet", "Hot Tools"] as const;

function ShopPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const gridRef = useRef<HTMLDivElement | null>(null);

  const visible = useMemo(() => {
    if (active === "All") return items;
    if (active === "U/V Part Wigs") return items.filter((i) => i.construction === "U-Part" || i.construction === "V-Part");
    return items.filter((i) => i.construction === active);
  }, [active]);

  const backToWork = items.filter((i) => i.drop === "Back to Work");
  const hotTools = items.filter((i) => i.construction === "Hot Tools");

  const setFilter = (f: (typeof filters)[number]) => {
    setActive(f);
    setTimeout(() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <SiteLayout>
      <section className="bg-cream py-16 md:py-20">
        <div className="container-luxe text-center max-w-2xl mx-auto space-y-4">
          <div className="eyebrow">The Collection</div>
          <h1 className="font-serif text-5xl md:text-6xl text-espresso text-balance">The house, in full.</h1>
          <p className="text-muted-foreground">Two new launches, four ways to wear the rest. Hand-finished, small batch, worn by women who don't repeat themselves.</p>
        </div>
      </section>

      {/* SPOTLIGHT 01 — Back to Work */}
      <section className="bg-cocoa text-cream">
        <div className="container-luxe py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 space-y-6">
            <div className="eyebrow text-blush">Autumn Drop · No.05</div>
            <h2 className="font-serif text-4xl md:text-5xl text-balance leading-[1.05]">The Back to Work Edit.</h2>
            <p className="text-cream/75 max-w-md">Sleek, structured, quietly powerful. Three new textures built for boardrooms, school runs and the in-between.</p>
            <div className="flex flex-col gap-2 text-cream/70 text-sm">
              {backToWork.map((p) => (
                <div key={p.name} className="flex items-center justify-between border-b border-cream/15 pb-2">
                  <span className="font-serif text-cream text-lg">{p.name}</span>
                  <Price gbp={p.price} className="text-blush" />
                </div>
              ))}
            </div>
            <button onClick={() => setFilter("U/V Part Wigs")} className="inline-flex items-center gap-2 border-b border-cream pb-1 text-[0.72rem] tracking-[0.25em] uppercase hover:text-blush hover:border-blush transition">
              Shop the edit <ArrowRight size={14} />
            </button>
          </div>
          <div className="md:col-span-7 grid grid-cols-3 gap-3">
            {backToWork.map((p, idx) => (
              <div key={p.name} className={`overflow-hidden ${idx === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[3/4]"}`}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT 02 — Hot Tools */}
      <section className="bg-ivory">
        <div className="container-luxe py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 grid grid-cols-2 gap-3 order-2 md:order-1">
            {hotTools.map((p) => (
              <div key={p.name} className="aspect-[4/5] overflow-hidden bg-sand">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]" />
              </div>
            ))}
          </div>
          <div className="md:col-span-5 space-y-6 order-1 md:order-2">
            <div className="eyebrow">Just Landed</div>
            <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance leading-[1.05]">Hot Tools, finally ours.</h2>
            <p className="text-muted-foreground max-w-md">Salon-grade heat, built to be kind to texture. Four pieces — one ritual.</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {hotTools.map((p) => (
                <div key={p.name} className="flex flex-col">
                  <span className="font-serif text-espresso">{p.name}</span>
                  <Price gbp={p.price} className="text-cocoa text-xs" />
                </div>
              ))}
            </div>
            <button onClick={() => setFilter("Hot Tools")} className="inline-flex items-center gap-2 border-b border-cocoa pb-1 text-[0.72rem] tracking-[0.25em] uppercase text-cocoa hover:text-espresso transition">
              Shop hot tools <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Browse by construction */}
      <section ref={gridRef} className="container-luxe py-16 md:py-20">
        <div className="text-center mb-10 space-y-2">
          <div className="eyebrow">Browse</div>
          <h2 className="font-serif text-3xl md:text-4xl text-espresso">By construction.</h2>
          <p className="text-muted-foreground text-sm">Shop by how it installs — not by the season it dropped.</p>
        </div>

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4 border-b border-border pb-4">
          <div className="flex gap-1 md:gap-2 flex-wrap text-[0.7rem] tracking-[0.2em] uppercase">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 transition ${active === f ? "bg-cocoa text-cream" : "text-cocoa hover:bg-cream"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-[0.7rem] tracking-[0.25em] uppercase text-cocoa">
            <SlidersHorizontal size={14} /> Sort
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {visible.map(p => (
            <div key={p.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                {p.tag && (
                  <span className="absolute top-3 left-3 bg-ivory/90 backdrop-blur px-3 py-1 text-[0.6rem] tracking-[0.2em] uppercase text-cocoa">{p.tag}</span>
                )}
                <button aria-label="Wishlist" className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ivory/90 backdrop-blur flex items-center justify-center text-cocoa hover:bg-cocoa hover:text-cream transition">
                  <Heart size={14} />
                </button>
                <button className="absolute inset-x-3 bottom-3 bg-cocoa text-cream py-3 text-[0.65rem] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-espresso">
                  Quick add
                </button>
              </div>
              <div className="pt-4 space-y-1">
                <div className="flex items-center gap-1 text-cocoa">
                  {[1,2,3,4,5].map(i => <Star key={i} size={10} className={i <= Math.round(p.rating) ? "fill-cocoa" : "opacity-30"} />)}
                  <span className="text-[0.65rem] text-muted-foreground ml-1">({p.reviews})</span>
                </div>
                <div className="text-[0.6rem] tracking-[0.22em] uppercase text-muted-foreground">{p.construction}</div>
                <h3 className="font-serif text-lg text-espresso">{p.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{p.length}</span>
                  <Price gbp={p.price} className="text-cocoa font-medium" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/contact" className="text-[0.72rem] tracking-[0.25em] uppercase text-cocoa border-b border-cocoa pb-1">Not sure? Book a free texture match</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
