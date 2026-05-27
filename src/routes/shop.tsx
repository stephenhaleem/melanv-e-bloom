import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Heart, Star, SlidersHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
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
      { name: "description", content: "Shop the Melanvée collection — Back to Work, Signature wigs, Summer edit, Crochet styles and Hot Tools." },
      { property: "og:title", content: "Shop MELANVÉE" },
      { property: "og:description", content: "Back to Work, Signature wigs, Summer edit, Crochet and Hot Tools." },
    ],
  }),
  component: ShopPage,
});

type Category = "Back to Work" | "Signature" | "Summer Edit" | "Crochet" | "Hot Tools";

type Product = {
  name: string;
  price: number; // GBP
  length: string;
  img: string;
  rating: number;
  reviews: number;
  tag: string | null;
  category: Category;
};

const items: Product[] = [
  // Back to Work — Autumn launch
  { name: "Zuri Kinky Straight", price: 295, length: "20\"", img: colUpart, rating: 4.9, reviews: 84, tag: "Autumn", category: "Back to Work" },
  { name: "Lielle Yaki Straight", price: 275, length: "22\"", img: colUpart, rating: 4.9, reviews: 71, tag: "New", category: "Back to Work" },
  { name: "ISI Bouncy", price: 310, length: "20\"", img: colTextured, rating: 4.8, reviews: 96, tag: "New", category: "Back to Work" },

  // Signature — year-round
  { name: "Kimi Curl", price: 289, length: "22\"", img: colTextured, rating: 4.9, reviews: 412, tag: "Bestseller", category: "Signature" },
  { name: "Zora Coil", price: 305, length: "20\"", img: textureCloseup, rating: 4.9, reviews: 244, tag: null, category: "Signature" },
  { name: "Lola Bouncy", price: 280, length: "22\"", img: colTextured, rating: 4.8, reviews: 318, tag: "Loved", category: "Signature" },

  // Summer Edit
  { name: "Alima Bouncy", price: 270, length: "20\"", img: colTextured, rating: 4.8, reviews: 187, tag: null, category: "Summer Edit" },
  { name: "Jaelle Bob Wig", price: 235, length: "12\"", img: colUpart, rating: 4.9, reviews: 221, tag: "Loved", category: "Summer Edit" },
  { name: "Summer Water Wave", price: 260, length: "22\"", img: colBundles, rating: 4.8, reviews: 154, tag: null, category: "Summer Edit" },

  // Crochet
  { name: "Burmese Crochet", price: 145, length: "18\"", img: colPonytail, rating: 4.8, reviews: 92, tag: null, category: "Crochet" },
  { name: "Summer Crochet", price: 135, length: "20\"", img: colPonytail, rating: 4.7, reviews: 78, tag: null, category: "Crochet" },

  // Hot Tools
  { name: "Signature Straightener", price: 120, length: "Pro", img: textureCloseup, rating: 4.9, reviews: 64, tag: "Tool", category: "Hot Tools" },
  { name: "Curling Iron", price: 110, length: "32mm", img: textureCloseup, rating: 4.8, reviews: 47, tag: "Tool", category: "Hot Tools" },
  { name: "2-in-1 Straightener & Curler", price: 145, length: "Hybrid", img: textureCloseup, rating: 4.9, reviews: 58, tag: "New", category: "Hot Tools" },
  { name: "Automatic Curler", price: 165, length: "Auto", img: textureCloseup, rating: 4.8, reviews: 39, tag: "New", category: "Hot Tools" },
];

const filters = ["All", "Back to Work", "Signature", "Summer Edit", "Crochet", "Hot Tools"] as const;

function ShopPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [active]
  );

  return (
    <SiteLayout>
      <section className="bg-cream py-16 md:py-20">
        <div className="container-luxe text-center max-w-2xl mx-auto space-y-4">
          <div className="eyebrow">The Collection</div>
          <h1 className="font-serif text-5xl md:text-6xl text-espresso text-balance">The house, in full.</h1>
          <p className="text-muted-foreground">Five chapters. One feeling. Small batches, hand-finished, worn by women who don't repeat themselves.</p>
        </div>
      </section>

      {/* Featured: Back to Work hero */}
      {active === "All" && (
        <section className="bg-cocoa text-cream">
          <div className="container-luxe py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="eyebrow text-blush">Autumn · No.05</div>
              <h2 className="font-serif text-4xl md:text-5xl text-balance">The Back to Work Edit.</h2>
              <p className="text-cream/80 max-w-md">Sleek, structured, quietly powerful. Three new textures built for boardrooms, school runs and the in-between.</p>
              <button onClick={() => setActive("Back to Work")} className="border-b border-cream pb-1 text-[0.72rem] tracking-[0.25em] uppercase hover:text-blush hover:border-blush">Shop the edit</button>
            </div>
            <div className="aspect-[5/4] overflow-hidden">
              <img src={colTextured} alt="Back to Work edit" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      <section className="container-luxe py-12">
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
                <div className="text-[0.6rem] tracking-[0.22em] uppercase text-muted-foreground">{p.category}</div>
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
