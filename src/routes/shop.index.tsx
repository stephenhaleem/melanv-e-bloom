import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Heart, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Price } from "@/lib/currency";
import {
  getCollectionsWithProducts,
  getProductImage,
  getStartingPrice,
  type ShopifyCollectionWithProducts,
  type ShopifyProduct,
} from "@/lib/shopify";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/shop/")({
  loader: () => getCollectionsWithProducts(),
  head: () => ({
    meta: [
      { title: "Shop — MELANVÉE" },
      {
        name: "description",
        content: "Shop MELANVÉE — U/V Part Wigs, Half Wigs, Crochet, Layered Wigs and Hot Tools.",
      },
      { property: "og:title", content: "Shop MELANVÉE" },
      {
        property: "og:description",
        content: "U/V Part Wigs, Half Wigs, Crochet, Layered Wigs and Hot Tools.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { text } = useSiteContent();
  const loadedCollections: ShopifyCollectionWithProducts[] = Route.useLoaderData();
  const collections = loadedCollections.filter((collection) => collection.products.length > 0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const products = Array.from(
    new Map(
      collections.flatMap((collection) => collection.products).map((p) => [p.id, p]),
    ).values(),
  );

  const scrollTo = (handle: string) => {
    sectionRefs.current[handle]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const spotlight = products.slice(0, 3);

  return (
    <SiteLayout>
      {/* Heading */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container-luxe text-center max-w-2xl mx-auto space-y-4">
          <div className="eyebrow">{text("shop.eyebrow", "The Collection")}</div>
          <h1 className="font-serif text-5xl md:text-6xl text-espresso text-balance">
            {text("shop.title", "The house, in full.")}
          </h1>
          <p className="text-muted-foreground">
            {text(
              "shop.description",
              "Hand-finished, small batch, worn by women who don't repeat themselves.",
            )}
          </p>
        </div>

        {/* Segment quick-jump */}
        <div className="container-luxe mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[0.7rem] tracking-[0.25em] uppercase">
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => scrollTo(collection.handle)}
              className="text-cocoa hover:text-espresso border-b border-transparent hover:border-cocoa pb-1 transition"
            >
              {collection.title}
            </button>
          ))}
        </div>
      </section>

      {/* SPOTLIGHT — Back to Work */}
      <section className="bg-cocoa text-cream">
        <div className="container-luxe py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 space-y-6">
            <div className="eyebrow text-blush">
              {text("shop.spotlight.eyebrow", "Autumn Drop · No.05")}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-balance leading-[1.05]">
              {text("home.shop-spotlight.title", "The Back to Work Edit.")}
            </h2>
            <p className="text-cream/75 max-w-md">
              {text(
                "home.shop-spotlight.description",
                "Sleek, structured, quietly powerful. Three new textures built for boardrooms, school runs and the in-between.",
              )}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              {spotlight.map((p) => (
                <Link
                  key={p.handle}
                  to="/shop/$slug"
                  params={{ slug: p.handle }}
                  className="flex items-center justify-between border-b border-cream/15 pb-2 hover:text-blush transition"
                >
                  <span className="font-serif text-cream text-lg">{p.title}</span>
                  <Price gbp={getStartingPrice(p)} className="text-blush" />
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-3 gap-3">
            {spotlight.map((p, idx) => (
              <Link
                key={p.handle}
                to="/shop/$slug"
                params={{ slug: p.handle }}
                className={`overflow-hidden block ${idx === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[3/4]"}`}
              >
                <img
                  src={getProductImage(p)}
                  alt={p.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEGMENTS */}
      {collections.map((collection, idx) => {
        const items = collection.products;
        if (items.length === 0) return null;
        const isDark = idx % 2 === 1;
        return (
          <section
            key={collection.id}
            id={collection.handle}
            ref={(el: HTMLElement | null) => {
              sectionRefs.current[collection.handle] = el;
            }}
            className={`scroll-mt-24 ${isDark ? "bg-cream" : "bg-ivory"}`}
          >
            <div className="container-luxe py-16 md:py-24">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14 border-b border-border pb-6">
                <div className="space-y-2 max-w-xl">
                  <div className="eyebrow">
                    No.0{idx + 1} · {items.length} {items.length === 1 ? "piece" : "pieces"}
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl text-espresso leading-[1.05]">
                    {collection.title}.
                  </h2>
                  {collection.description && (
                    <p className="text-muted-foreground text-sm md:text-base">
                      {collection.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {items.map((p) => (
                  <ProductCard key={p.handle} product={p} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-cocoa text-cream py-14">
        <div className="container-luxe flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="eyebrow text-blush">
              {text("shop.consultation.eyebrow", "Not sure?")}
            </div>
            <p className="font-serif text-2xl mt-2">
              {text("shop.consultation.title", "A texture match, on us.")}
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-cream px-8 py-4 text-[0.7rem] tracking-[0.3em] uppercase hover:bg-cream hover:text-cocoa transition"
          >
            Book a consultation <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function ProductCard({ product: p }: { product: ShopifyProduct }) {
  const image = getProductImage(p);
  const optionSummary = p.options
    .map((option) => option.name)
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="group">
      <Link
        to="/shop/$slug"
        params={{ slug: p.handle }}
        className="block relative aspect-[4/5] overflow-hidden bg-sand"
      >
        <img
          src={image}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]"
        />
        <button
          aria-label="Wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ivory/90 backdrop-blur flex items-center justify-center text-cocoa hover:bg-cocoa hover:text-cream transition"
        >
          <Heart size={14} />
        </button>
        <span className="absolute inset-x-3 bottom-3 bg-cocoa text-cream py-3 text-center text-[0.65rem] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          View details
        </span>
      </Link>
      <div className="pt-4 space-y-1">
        <Link to="/shop/$slug" params={{ slug: p.handle }} className="block">
          <h3 className="font-serif text-lg text-espresso hover:text-cocoa transition">
            {p.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground text-[0.7rem] tracking-[0.18em] uppercase">
            {optionSummary || "Available now"}
          </span>
          <Price gbp={getStartingPrice(p)} className="text-cocoa font-medium" />
        </div>
      </div>
    </div>
  );
}
