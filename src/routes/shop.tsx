import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Heart, Star, SlidersHorizontal } from "lucide-react";
import colTextured from "@/assets/collection-textured.jpg";
import colUpart from "@/assets/collection-upart.jpg";
import colPonytail from "@/assets/collection-ponytail.jpg";
import colBundles from "@/assets/collection-bundles.jpg";
import textureCloseup from "@/assets/texture-closeup.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — MELANVÉE" },
      { name: "description", content: "Shop the Melanvée collection — textured wigs, U-part, V-part, bundles, ponytails and protective styles." },
      { property: "og:title", content: "Shop MELANVÉE" },
      { property: "og:description", content: "Textured wigs, bundles, ponytails and protective styles." },
    ],
  }),
  component: ShopPage,
});

const items = [
  { name: "Cocoa Curl Glueless", price: 289, length: "22\"", img: colTextured, rating: 4.9, reviews: 412, tag: "Bestseller" },
  { name: "Ivory Straight U-part", price: 215, length: "20\"", img: colUpart, rating: 4.8, reviews: 287, tag: "New" },
  { name: "Honey Body Wave Bundles", price: 340, length: "3×24\"", img: colBundles, rating: 4.9, reviews: 521, tag: null },
  { name: "Sleek Onyx Ponytail", price: 95, length: "26\"", img: colPonytail, rating: 4.7, reviews: 198, tag: "Loved" },
  { name: "Espresso Coil Glueless", price: 305, length: "20\"", img: textureCloseup, rating: 4.9, reviews: 244, tag: null },
  { name: "Cinnamon Body Wave U-part", price: 235, length: "22\"", img: colBundles, rating: 4.8, reviews: 167, tag: null },
  { name: "Sand Wave Bundles", price: 320, length: "3×22\"", img: colBundles, rating: 4.9, reviews: 311, tag: "Restocked" },
  { name: "Midnight Sleek Ponytail", price: 110, length: "30\"", img: colPonytail, rating: 4.7, reviews: 142, tag: null },
];

const filters = ["All", "Textured", "U-part", "V-part", "Bundles", "Ponytails", "Protective"];

function ShopPage() {
  return (
    <SiteLayout>
      <section className="bg-cream py-16 md:py-20">
        <div className="container-luxe text-center max-w-2xl mx-auto space-y-4">
          <div className="eyebrow">The Collection</div>
          <h1 className="font-serif text-5xl md:text-6xl text-espresso text-balance">The house, in full.</h1>
          <p className="text-muted-foreground">Small batches. Hand-finished. Worn by women who don't have time to repeat themselves.</p>
        </div>
      </section>

      <section className="container-luxe py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4 border-b border-border pb-4">
          <div className="flex gap-1 md:gap-2 flex-wrap text-[0.7rem] tracking-[0.2em] uppercase">
            {filters.map((f, i) => (
              <button key={f} className={`px-4 py-2 transition ${i === 0 ? "bg-cocoa text-cream" : "text-cocoa hover:bg-cream"}`}>
                {f}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-[0.7rem] tracking-[0.25em] uppercase text-cocoa">
            <SlidersHorizontal size={14} /> Sort
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {items.map(p => (
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
                <h3 className="font-serif text-lg text-espresso">{p.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{p.length}</span>
                  <span className="text-cocoa font-medium">£{p.price}</span>
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
