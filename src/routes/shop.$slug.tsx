import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Star, ChevronLeft, Check, Truck, Sparkles, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Price } from "@/lib/currency";
import { useCart } from "@/lib/cart";
import { getProduct, LENGTHS, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — MELANVÉE` },
          { name: "description", content: loaderData.product.blurb },
          { property: "og:title", content: `${loaderData.product.name} — MELANVÉE` },
          { property: "og:description", content: loaderData.product.blurb },
          { property: "og:image", content: loaderData.product.img },
          { name: "twitter:image", content: loaderData.product.img },
        ]
      : [{ title: "Product — MELANVÉE" }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-luxe py-32 text-center space-y-4">
        <div className="eyebrow">Not found</div>
        <h1 className="font-serif text-4xl text-espresso">This piece has moved.</h1>
        <Link to="/shop" className="inline-block border-b border-cocoa pb-1 text-[0.72rem] tracking-[0.25em] uppercase text-cocoa">
          Back to the shop
        </Link>
      </div>
    </SiteLayout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [length, setLength] = useState<number | null>(product.hasLengths ? 20 : null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(product.slug, length, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const related = PRODUCTS.filter((p) => p.segment === product.segment && p.slug !== product.slug).slice(0, 4);

  return (
    <SiteLayout>
      <div className="container-luxe pt-6 pb-2">
        <Link to="/shop" className="inline-flex items-center gap-1 text-[0.7rem] tracking-[0.22em] uppercase text-cocoa hover:text-espresso">
          <ChevronLeft size={14} /> Shop
        </Link>
      </div>

      <section className="container-luxe py-8 md:py-12 grid md:grid-cols-2 gap-8 md:gap-16">
        {/* Image */}
        <div className="space-y-3">
          <div className="aspect-[4/5] bg-sand overflow-hidden">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[product.img, product.img, product.img, product.img].map((src, i) => (
              <div key={i} className="aspect-square bg-sand overflow-hidden opacity-70 hover:opacity-100 transition">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-7 md:py-4">
          <div>
            <div className="eyebrow">{product.segment}</div>
            <h1 className="font-serif text-4xl md:text-5xl text-espresso mt-3 leading-[1.05]">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-0.5 text-cocoa">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} className={i <= Math.round(product.rating) ? "fill-cocoa" : "opacity-30"} />
                ))}
              </div>
              <span className="text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>
          </div>

          <Price gbp={product.price} className="text-2xl font-serif text-espresso block" />

          <p className="text-muted-foreground leading-relaxed max-w-md">{product.blurb}</p>

          {product.hasLengths && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Length</span>
                <span className="text-[0.7rem] text-muted-foreground">{length}"</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {LENGTHS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLength(l)}
                    className={`py-3 text-xs border transition ${
                      length === l
                        ? "bg-cocoa text-cream border-cocoa"
                        : "bg-ivory text-cocoa border-border hover:border-cocoa"
                    }`}
                  >
                    {l}"
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <span className="eyebrow">Quantity</span>
            <div className="inline-flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 hover:bg-cream">−</button>
              <span className="w-12 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 hover:bg-cream">+</button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onAdd}
              className="flex-1 bg-cocoa text-cream py-4 text-[0.72rem] tracking-[0.3em] uppercase hover:bg-espresso transition flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                "Add to bag"
              )}
            </button>
            <button
              aria-label="Wishlist"
              className="w-14 h-14 border border-cocoa text-cocoa hover:bg-cocoa hover:text-cream transition flex items-center justify-center"
            >
              <Heart size={16} />
            </button>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border text-[0.7rem] tracking-[0.18em] uppercase text-cocoa">
            <li className="flex items-center gap-2"><Truck size={14} /> Free over £100</li>
            <li className="flex items-center gap-2"><Sparkles size={14} /> Hand-finished</li>
            <li className="flex items-center gap-2"><ShieldCheck size={14} /> 30-day care</li>
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-luxe py-16 md:py-20 border-t border-border mt-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="eyebrow">Pairs with</div>
              <h2 className="font-serif text-3xl text-espresso mt-2">More from {product.segment}</h2>
            </div>
            <Link to="/shop" className="text-[0.7rem] tracking-[0.25em] uppercase text-cocoa border-b border-cocoa pb-1">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {related.map((p) => (
              <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="group">
                <div className="aspect-[4/5] bg-sand overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                </div>
                <h3 className="font-serif text-lg text-espresso mt-3">{p.name}</h3>
                <Price gbp={p.price} className="text-cocoa text-sm" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
