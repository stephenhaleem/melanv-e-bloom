import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { Price } from "@/lib/currency";
import { useCart } from "@/lib/cart";
import {
  getCollections,
  getProductImage,
  getProducts,
  getStartingPrice,
  type ShopifyProduct,
} from "@/lib/shopify";
import {
  Sparkles,
  Feather,
  HandHeart,
  Shield,
  Wand2,
  Gem,
  Star,
  Heart,
  Plus,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import hero from "@/assets/3AAB18E63E27A2827D03-IMG_7567.png";
import textureCloseup from "@/assets/texture-closeup.jpg";
import ugc1 from "@/assets/ugc-1.jpg";
import ugc2 from "@/assets/ugc-2.jpg";
import ugc3 from "@/assets/ugc-3.jpg";
import ugc4 from "@/assets/ugc-4.jpg";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [products, collections] = await Promise.all([getProducts(4), getCollections()]);
    return { products, collections };
  },
  head: () => ({
    meta: [
      { title: "MELANVÉE — Made to feel like yours" },
      {
        name: "description",
        content:
          "Premium textured wigs, protective styles and effortless beauty for the modern woman. Realism. Softness. Confidence.",
      },
      { property: "og:title", content: "MELANVÉE — Made to feel like yours" },
      {
        property: "og:description",
        content:
          "Premium textured wigs and protective styles designed for realism, comfort and effortless beauty.",
      },
      { property: "og:image", content: hero },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { products, collections } = Route.useLoaderData();

  return (
    <SiteLayout>
      <Hero
        featured={products.find((product) => product.title.toLowerCase().includes("kimi curl"))}
      />
      <Marquee />
      <ValueProps />
      <Collections collections={collections} />
      <Bestsellers products={products} />
      <WhyMelanvee />
      <BeforeAfter />
      <Community />
      <Testimonials />
      <HowItWorks />
      <FAQSection />
      <Newsletter />
    </SiteLayout>
  );
}

/* -------------------- HERO -------------------- */
function Hero({ featured }: { featured?: ShopifyProduct }) {
  const { text, image } = useSiteContent();
  return (
    <section className="bg-ivory">
      {/* Mobile-first editorial composition */}
      <div className="container-luxe pt-4 pb-20 md:pt-8 md:pb-32">
        <div className="relative">
          <div className="aspect-[4/5] md:aspect-[16/10] w-full overflow-hidden bg-sand">
            <img
              src={image("image.home.hero", hero)}
              alt="A woman wearing a Melanvée textured wig, photographed in rich burgundy light"
              className="w-full h-full object-contain md:object-cover"
              width={1600}
              height={1280}
              fetchPriority="high"
            />
          </div>

          {/* Editorial product inset — offset, flush-right, hairline border */}
          <div className="absolute bottom-6 left-6 right-0 md:bottom-10 md:left-auto md:right-10 md:max-w-sm bg-ivory/95 backdrop-blur-md p-7 md:p-8 border-l border-border shadow-[0_30px_60px_-30px_rgba(44,24,16,0.18)]">
            <span className="block text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-medium">
              Signature Selection
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light italic leading-none mb-3 text-espresso">
              {featured?.title ?? "The MELANVÉE Collection"}
            </h2>
            <p className="text-[0.7rem] tracking-wide text-muted-foreground leading-relaxed mb-5 font-light">
              Glueless · Pre-styled · Beginner friendly
            </p>
            <div className="flex items-center justify-between">
              {featured && (
                <Price
                  gbp={getStartingPrice(featured)}
                  className="font-serif text-lg text-espresso"
                />
              )}
              {featured ? (
                <Link
                  to="/shop/$slug"
                  params={{ slug: featured.handle }}
                  className="text-[0.6rem] uppercase tracking-[0.2em] border-b border-espresso pb-1 text-espresso"
                >
                  View details
                </Link>
              ) : (
                <Link
                  to="/shop"
                  className="text-[0.6rem] uppercase tracking-[0.2em] border-b border-espresso pb-1 text-espresso"
                >
                  View details
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Editorial caption block — generous negative space */}
        <div className="mt-24 md:mt-32 max-w-xl md:px-4">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-6 bg-border" />
            <span className="text-[0.65rem] tracking-[0.32em] uppercase text-muted-foreground font-medium">
              {text("home.hero.eyebrow", "The Burgundy Collection · No.04")}
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] font-light text-espresso text-balance mb-8">
            {text("home.hero.title", "Made to feel like yours.")}
          </h1>
          <p className="text-muted-foreground text-[0.95rem] md:text-base leading-[1.9] font-light max-w-md mb-10">
            {text(
              "home.hero.description",
              "Textured wigs and protective styles, crafted with quiet luxury in mind — designed for the woman who values her time as much as her aesthetic.",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <Link
              to="/shop"
              className="flex-1 text-center px-10 py-4 border border-espresso text-[0.65rem] uppercase tracking-[0.28em] text-espresso hover:bg-espresso hover:text-cream transition-colors duration-500"
            >
              Discover the Collection
            </Link>
          </div>
          <div className="flex items-center gap-6 pt-10 text-[0.7rem] text-muted-foreground tracking-wide">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={10} className="fill-cocoa text-cocoa" />
              ))}
              <span className="ml-1">Loved by the MELANVÉE community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- MARQUEE -------------------- */
function Marquee() {
  const items = [
    "Pre-plucked HD lace",
    "Glueless ready",
    "100% raw textured hair",
    "Beginner friendly",
    "Complimentary shipping over £100",
    "Klarna · Clearpay · Apple Pay",
  ];
  return (
    <div className="bg-espresso text-cream py-4 overflow-hidden border-y border-cocoa/40">
      <div className="flex marquee whitespace-nowrap gap-12 text-[0.7rem] tracking-[0.3em] uppercase">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-blush/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------- VALUE PROPS -------------------- */
function ValueProps() {
  const { text } = useSiteContent();
  const props = [
    {
      icon: Sparkles,
      t: text("home.value.1.title", "Natural-looking blends"),
      d: text("home.value.1.description", "HD lace and melted hairlines, made to disappear."),
    },
    {
      icon: Feather,
      t: text("home.value.2.title", "Lightweight comfort"),
      d: text("home.value.2.description", "Built airy. Built to wear all day, every day."),
    },
    {
      icon: HandHeart,
      t: text("home.value.3.title", "Beginner friendly"),
      d: text("home.value.3.description", "Pre-styled, pre-plucked, ready out of the box."),
    },
    {
      icon: Shield,
      t: text("home.value.4.title", "Protective styling"),
      d: text("home.value.4.description", "Looks like your own hair while you grow your own."),
    },
    {
      icon: Wand2,
      t: text("home.value.5.title", "Effortless installs"),
      d: text("home.value.5.description", "Glueless. Adjustable. On in under 5 minutes."),
    },
    {
      icon: Gem,
      t: text("home.value.6.title", "Premium quality"),
      d: text("home.value.6.description", "Sourced, wefted and styled in small batches."),
    },
  ];
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="grid md:grid-cols-3 gap-x-12 gap-y-14">
        {props.map(({ icon: Icon, t, d }) => (
          <div key={t} className="space-y-3">
            <Icon strokeWidth={1.2} size={28} className="text-cocoa" />
            <h3 className="font-serif text-xl text-espresso">{t}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- COLLECTIONS -------------------- */
function Collections({ collections }: { collections: Awaited<ReturnType<typeof getCollections>> }) {
  const { text, image } = useSiteContent();
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="eyebrow mb-3">{text("home.collections.eyebrow", "Edits")}</div>
            <h2 className="font-serif text-4xl md:text-5xl text-espresso max-w-xl text-balance">
              {text("home.collections.title", "A wardrobe of textures. Yours to live in.")}
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-[0.72rem] tracking-[0.25em] uppercase text-cocoa border-b border-cocoa pb-1 self-start md:self-auto hover:text-espresso"
          >
            View all collections
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {collections.map((collection) => (
            <Link to="/shop" key={collection.id} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-sand">
                <img
                  src={collection.image?.url ?? image("image.home.texture", textureCloseup)}
                  alt={collection.image?.altText ?? collection.title}
                  loading="lazy"
                  width={1000}
                  height={1300}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                />
              </div>
              <div className="pt-4 flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-lg md:text-xl text-espresso">
                    {collection.title}
                  </h3>
                </div>
                <Plus
                  size={16}
                  className="text-cocoa group-hover:rotate-90 transition-transform duration-500"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- BESTSELLERS -------------------- */
function Bestsellers({ products }: { products: ShopifyProduct[] }) {
  const { text } = useSiteContent();
  const { add } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  async function quickAdd(product: ShopifyProduct) {
    const variant = product.variants.edges.find(({ node }) => node.availableForSale)?.node;
    if (!variant) return;
    setAddingId(product.id);
    setErrorId(null);
    try {
      await add(variant.id);
      setAddedId(product.id);
      window.setTimeout(() => setAddedId(null), 1800);
    } catch (error) {
      console.error("[shopify] Could not quick-add product:", error);
      setErrorId(product.id);
    } finally {
      setAddingId(null);
    }
  }

  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div>
          <div className="eyebrow mb-3">{text("home.bestsellers.eyebrow", "Bestsellers")}</div>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso max-w-xl text-balance">
            {text("home.bestsellers.title", "Quietly loved. Constantly re-ordered.")}
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-[0.72rem] tracking-[0.25em] uppercase text-cocoa border-b border-cocoa pb-1 self-start md:self-auto hover:text-espresso"
        >
          Shop bestsellers
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            adding={addingId === product.id}
            added={addedId === product.id}
            error={errorId === product.id}
            onQuickAdd={() => void quickAdd(product)}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  adding,
  added,
  error,
  onQuickAdd,
}: {
  product: ShopifyProduct;
  adding: boolean;
  added: boolean;
  error: boolean;
  onQuickAdd: () => void;
}) {
  const variant = product.variants.edges.find(({ node }) => node.availableForSale)?.node;

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Link to="/shop/$slug" params={{ slug: product.handle }} className="block h-full">
          <img
            src={getProductImage(product)}
            alt={product.title}
            loading="lazy"
            width={1000}
            height={1300}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]"
          />
        </Link>
        {product.tags[0] && (
          <span className="absolute top-3 left-3 bg-ivory/90 backdrop-blur px-3 py-1 text-[0.6rem] tracking-[0.2em] uppercase text-cocoa">
            {product.tags[0]}
          </span>
        )}
        <button
          aria-label="Wishlist"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ivory/90 backdrop-blur flex items-center justify-center text-cocoa hover:bg-cocoa hover:text-cream transition"
        >
          <Heart size={14} />
        </button>
        <button
          type="button"
          onClick={onQuickAdd}
          disabled={!variant || adding}
          className="absolute inset-x-3 bottom-3 bg-cocoa text-cream py-3 text-[0.65rem] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-espresso disabled:opacity-60"
        >
          {adding ? "Adding…" : added ? "Added" : variant ? "Quick add" : "Sold out"}
        </button>
      </div>
      <div className="pt-4 space-y-1">
        <Link to="/shop/$slug" params={{ slug: product.handle }} className="block">
          <h3 className="font-serif text-lg text-espresso">{product.title}</h3>
        </Link>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{product.productType || "The Collection"}</span>
          <Price gbp={getStartingPrice(product)} className="text-cocoa font-medium" />
        </div>
        {error && (
          <p role="alert" className="text-xs text-destructive">
            Couldn’t add to bag. Try again.
          </p>
        )}
      </div>
    </div>
  );
}

/* -------------------- WHY MELANVÉE -------------------- */
function WhyMelanvee() {
  const { text, image } = useSiteContent();
  return (
    <section className="bg-cocoa text-cream py-24 md:py-36 relative overflow-hidden">
      <div className="container-luxe grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={image("image.home.texture", textureCloseup)}
            alt="Close-up of natural curls"
            loading="lazy"
            width={1200}
            height={1500}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-8">
          <div className="eyebrow text-blush">{text("home.why.eyebrow", "Why Melanvée")}</div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] text-balance">
            {text("home.why.title", "Hair that feels like you wrote it.")}
          </h2>
          <p className="text-cream/80 text-lg leading-relaxed max-w-lg">
            {text(
              "home.why.description",
              "We make textured hair for the woman who's done compromising. The kind of softness that doesn't announce itself. The kind of realism your sister second-guesses. The kind of confidence that lives in your shoulders before it ever reaches your face.",
            )}
          </p>
          <ul className="space-y-3 text-cream/85">
            {[
              "Realism — blended to disappear at the hairline",
              "Softness — feather-light, breathable, comfortable for hours",
              "Confidence — quiet luxury you wear, not perform",
            ].map((s) => (
              <li key={s} className="flex gap-3 text-sm">
                <span className="text-blush">✦</span> {s}
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="inline-block border-b border-cream pb-1 text-[0.72rem] tracking-[0.25em] uppercase hover:text-blush hover:border-blush transition"
          >
            Read our story
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------- BEFORE & AFTER -------------------- */
function BeforeAfter() {
  const { text, image } = useSiteContent();
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
        <div className="eyebrow">{text("home.before-after.eyebrow", "Real installs")}</div>
        <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance">
          {text("home.before-after.title", "Worn by her. Filmed in her bathroom.")}
        </h2>
        <p className="text-muted-foreground">
          {text(
            "home.before-after.description",
            "Customer transformations — unedited, unfiltered, on real schedules.",
          )}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {[
          image("image.home.customer.1", ugc1),
          image("image.home.customer.2", ugc2),
          image("image.home.customer.3", ugc3),
          image("image.home.customer.4", ugc4),
        ].map((src, i) => (
          <div key={i} className="relative aspect-[3/4] overflow-hidden bg-sand group">
            <img
              src={src}
              alt="Customer install"
              loading="lazy"
              width={900}
              height={1100}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]"
            />
            <div className="absolute bottom-3 left-3 text-cream text-xs font-serif italic">
              @melanvee.muse
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- COMMUNITY -------------------- */
function Community() {
  const { text, image } = useSiteContent();
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-luxe text-center max-w-2xl mx-auto space-y-5">
        <div className="eyebrow">{text("home.community.eyebrow", "#MelanveeMuse")}</div>
        <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance">
          {text("home.community.title", "Styled by the Melanvée community.")}
        </h2>
        <p className="text-muted-foreground">
          {text(
            "home.community.description",
            "Tag us on Instagram & TikTok for a chance to be featured.",
          )}
        </p>
        <div className="flex gap-4 justify-center pt-2 text-[0.7rem] tracking-[0.25em] uppercase">
          <a
            href="https://instagram.com/melanveeofficial"
            className="border-b border-cocoa pb-1 text-cocoa hover:text-espresso"
          >
            Instagram
          </a>
          <a
            href="https://tiktok.com/@melanvee"
            className="border-b border-cocoa pb-1 text-cocoa hover:text-espresso"
          >
            TikTok
          </a>
        </div>
      </div>
      <div className="mt-14 grid grid-cols-2 md:grid-cols-6 gap-2">
        {[
          image("image.home.customer.2", ugc2),
          image("image.home.customer.3", ugc3),
          image("image.home.customer.1", ugc1),
          image("image.home.customer.4", ugc4),
          image("image.home.customer.3", ugc3),
          image("image.home.customer.2", ugc2),
        ].map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden">
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- TESTIMONIALS -------------------- */
function Testimonials() {
  const { text } = useSiteContent();
  const reviews = [
    {
      quote: text(
        "home.testimonial.1.quote",
        "I've worn it for three weeks straight and forgot it wasn't mine. The hairline blends into my actual skin.",
      ),
      name: text("home.testimonial.1.name", "Amara O."),
      style: text("home.testimonial.1.style", 'Cocoa Curl 22"'),
    },
    {
      quote: text(
        "home.testimonial.2.quote",
        "Genuinely the softest unit I've ever owned. I cried a little. No notes.",
      ),
      name: text("home.testimonial.2.name", "Joelle K."),
      style: text("home.testimonial.2.style", "Honey Body Wave"),
    },
    {
      quote: text(
        "home.testimonial.3.quote",
        "Installed it in 4 minutes before a meeting. People kept asking what I changed.",
      ),
      name: text("home.testimonial.3.name", "Bisi A."),
      style: text("home.testimonial.3.style", "Ivory Straight U-part"),
    },
  ];
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="grid md:grid-cols-3 gap-10 md:gap-16">
        {reviews.map((r) => (
          <figure key={r.name} className="space-y-6">
            <div className="text-cocoa flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={12} className="fill-cocoa" />
              ))}
            </div>
            <blockquote className="font-serif text-2xl md:text-[1.6rem] leading-snug text-espresso italic text-balance">
              "{r.quote}"
            </blockquote>
            <figcaption className="text-sm text-muted-foreground">
              <span className="text-cocoa font-medium not-italic">{r.name}</span> · {r.style}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* -------------------- HOW IT WORKS -------------------- */
function HowItWorks() {
  const { text } = useSiteContent();
  const steps = [
    [
      "01",
      text("home.how-it-works.step1.title", "Choose your texture"),
      text(
        "home.how-it-works.step1.description",
        "Match her natural pattern or try something new — coily, curly, wavy, sleek.",
      ),
    ],
    [
      "02",
      text("home.how-it-works.step2.title", "Install effortlessly"),
      text(
        "home.how-it-works.step2.description",
        "Glueless, adjustable, pre-styled. Ready in under five minutes.",
      ),
    ],
    [
      "03",
      text("home.how-it-works.step3.title", "Blend naturally"),
      text(
        "home.how-it-works.step3.description",
        "Melted HD lace and a feather edge that disappears into the skin.",
      ),
    ],
    [
      "04",
      text("home.how-it-works.step4.title", "Go."),
      text(
        "home.how-it-works.step4.description",
        "Wear her to work, the gym, the wedding, the weekend. Repeat.",
      ),
    ],
  ];
  return (
    <section className="bg-espresso text-cream py-24 md:py-32">
      <div className="container-luxe">
        <div className="text-center mb-16 space-y-4">
          <div className="eyebrow text-blush">
            {text("home.how-it-works.eyebrow", "How it works")}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-balance">
            {text("home.how-it-works.title", "Four quiet steps. One you.")}
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-10 md:gap-6">
          {steps.map(([n, t, d]) => (
            <div
              key={n}
              className="space-y-4 md:border-l md:first:border-l-0 md:border-cream/15 md:pl-6"
            >
              <div className="font-serif text-5xl text-blush">{n}</div>
              <h3 className="font-serif text-xl">{t}</h3>
              <p className="text-cream/70 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */
function FAQSection() {
  const { text } = useSiteContent();
  const faqs = Array.from({ length: 6 }, (_, index) => {
    const number = index + 1;
    return [text(`home.faq.q${number}`, ""), text(`home.faq.a${number}`, "")] as [string, string];
  }).filter(([question]) => question);
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="eyebrow">{text("home.faq.eyebrow", "Answered")}</div>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance">
            {text("home.faq.title", "The things she always asks.")}
          </h2>
          <p className="text-muted-foreground text-sm">
            {text(
              "home.faq.description",
              "Can't find what you need? Reach our concierge — we usually reply within an hour.",
            )}
          </p>
          <Link
            to="/contact"
            className="inline-block border-b border-cocoa pb-1 text-[0.72rem] tracking-[0.25em] uppercase text-cocoa"
          >
            Talk to us
          </Link>
        </div>
        <div className="md:col-span-2 divide-y divide-border">
          {faqs.map(([q, a]) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left gap-6"
      >
        <span className="font-serif text-lg md:text-xl text-espresso">{q}</span>
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

/* -------------------- NEWSLETTER -------------------- */
function Newsletter() {
  const { text } = useSiteContent();
  return (
    <section className="bg-blush/40 py-24 md:py-32">
      <div className="container-luxe text-center max-w-2xl mx-auto space-y-6">
        <div className="eyebrow">The List</div>
        <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance">
          {text("home.newsletter.title", "Join the Melanvée community.")}
        </h2>
        <p className="text-muted-foreground">
          {text(
            "home.newsletter.description",
            "Restock alerts, early access to drops, and a £15 welcome credit on your first order.",
          )}
        </p>
        <NewsletterSignup
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
          inputClassName="flex-1 bg-ivory border border-cocoa/20 px-5 py-4 text-sm focus:outline-none focus:border-cocoa"
          buttonClassName="bg-cocoa text-cream px-8 py-4 text-[0.7rem] tracking-[0.28em] uppercase hover:bg-espresso transition disabled:opacity-50"
          buttonLabel="Join us"
        />
      </div>
    </section>
  );
}
