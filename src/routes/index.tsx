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
  ArrowRight,
  Play,
} from "lucide-react";
import { useState } from "react";
import hero from "@/assets/3AAB18E63E27A2827D03-IMG_7567.png";
import colUpart from "@/assets/collection-upart.jpg";
import colTextured from "@/assets/collection-textured.jpg";
import colPonytail from "@/assets/collection-ponytail.jpg";
import colBundles from "@/assets/collection-bundles.jpg";
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
          "Textured U/V part wigs, half wigs, crochet hair and bundles made to blend with your natural hair.",
      },
      { property: "og:title", content: "MELANVÉE — Made to feel like yours" },
      {
        property: "og:description",
        content:
          "Textured hair made to blend with your own — U/V part wigs, half wigs, crochet and bundles.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const BESTSELLER_NAMES = [
  { name: "Kimi Curl", match: ["kimi curl"] },
  { name: "Kinky Curl Crochet Human Hair", match: ["kinky curl crochet", "kinky curl crotchet"] },
  { name: "Zuri Kinky Straight", match: ["zuri kinky straight", "zuri"] },
  { name: "Coco Curl", match: ["coco curl"] },
];

function HomePage() {
  const { products } = Route.useLoaderData();
  const bestsellers = BESTSELLER_NAMES.map((b) => ({
    name: b.name,
    product: products.find((p) => b.match.some((m) => p.title.toLowerCase().includes(m))),
  }));

  return (
    <SiteLayout>
      <Hero />
      <Collections />
      <ValueProps />
      <Bestsellers items={bestsellers} />
      <Marquee />
      <WhyMelanvee />
      <FilmSection />
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
function Hero() {
  const { image } = useSiteContent();
  return (
    <section className="bg-ivory">
      <div className="container-luxe pt-8 pb-16 md:pt-12 md:pb-24 text-center">
        <h1 className="font-serif text-[3.2rem] leading-none tracking-[0.18em] text-burgundy sm:text-7xl md:text-[7.5rem] md:tracking-[0.22em] fade-up">
          MELANVÉE
        </h1>
        <div className="mx-auto mt-4 mb-8 flex items-center justify-center gap-3 md:mb-10">
          <span className="h-px w-10 bg-burgundy/40" />
          <span className="text-[0.6rem] tracking-[0.4em] uppercase text-burgundy/70">London</span>
          <span className="h-px w-10 bg-burgundy/40" />
        </div>

        <div className="mx-auto aspect-[4/5] w-full max-w-5xl overflow-hidden bg-sand md:aspect-[16/9]">
          <img
            src={image("image.home.hero", hero)}
            alt="A woman wearing a Melanvée textured wig"
            className="h-full w-full object-cover"
            width={1600}
            height={1280}
            fetchPriority="high"
          />
        </div>

        <div className="mx-auto mt-12 max-w-2xl md:mt-16">
          <p className="text-[0.7rem] font-medium tracking-[0.38em] uppercase text-burgundy md:text-xs">
            Textured hair, considered differently
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-espresso text-balance md:text-6xl">
            The texture you love.{" "}
            <em className="text-burgundy">The freedom to wear it your way.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[0.95rem] leading-[1.85] text-muted-foreground">
            Discover textured wigs and protective styles designed for natural-looking blends,
            versatile styling and more freedom in your hair routine.
          </p>
          <div className="mt-10 flex flex-col items-center gap-6">
            <Link
              to="/shop"
              className="w-full max-w-sm bg-burgundy px-10 py-5 text-[0.7rem] uppercase tracking-[0.32em] text-cream shadow-[0_20px_40px_-20px_var(--burgundy)] transition-colors duration-500 hover:bg-burgundy-deep"
            >
              Shop textured hair
            </Link>
            <Link
              to="/textures"
              className="group inline-flex items-center gap-2 text-sm text-espresso"
            >
              Not sure where to start?{" "}
              <span className="border-b border-burgundy pb-0.5 text-burgundy">Find your style</span>
              <ArrowRight
                size={15}
                className="text-burgundy transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- FILM (video slot) -------------------- */
function FilmSection() {
  const { text, image } = useSiteContent();
  const videoUrl = text("home.film.url", "");
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="mb-10 text-center">
        <div className="eyebrow mb-3">The Film</div>
        <h2 className="font-serif text-4xl text-espresso md:text-5xl">See it move.</h2>
      </div>
      <div className="relative mx-auto aspect-[4/5] max-w-5xl overflow-hidden bg-burgundy-deep md:aspect-[21/9]">
        {videoUrl ? (
          <video
            src={videoUrl}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <>
            <img
              src={image("image.home.texture", textureCloseup)}
              alt="Melanvée curls in motion"
              loading="lazy"
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-cream">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/70">
                <Play size={20} className="ml-1" />
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.3em]">Coming soon</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* -------------------- MARQUEE -------------------- */
function Marquee() {
  const items = [
    "U/V part · half wigs · crochet · bundles",
    "Textures that blend with yours",
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
      d: text("home.value.1.description", "Textures matched to real hair, so the blend with your leave-out looks like you."),
    },
    {
      icon: Feather,
      t: text("home.value.2.title", "Your texture, honoured"),
      d: text("home.value.2.description", "Kinky, coily, curly and bouncy patterns that reflect the hair we actually grow."),
    },
    {
      icon: HandHeart,
      t: text("home.value.3.title", "Beginner friendly"),
      d: text("home.value.3.description", "Simple constructions — U/V part, half wig, crochet and bundles — easy to learn and wear."),
    },
    {
      icon: Shield,
      t: text("home.value.4.title", "Protective styling"),
      d: text("home.value.4.description", "Looks like your own hair while you grow your own."),
    },
    {
      icon: Wand2,
      t: text("home.value.5.title", "Freedom to switch"),
      d: text("home.value.5.description", "Wear it curly, stretched or straightened — style it your way, week to week."),
    },
    {
      icon: Gem,
      t: text("home.value.6.title", "Made with care"),
      d: text("home.value.6.description", "Every piece is checked by us before it leaves, so what arrives is what you saw."),
    },
  ];
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="mb-14 text-center">
        <div className="eyebrow mb-3">Why it's different</div>
        <h2 className="font-serif text-4xl text-espresso md:text-5xl text-balance">
          Made with intention, down to the strand.
        </h2>
      </div>
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
const HOME_COLLECTIONS = [
  { title: "U/V Part Wigs", note: "Seamless leave-out", img: colUpart },
  { title: "Half Wigs", note: "Half the install", img: colTextured },
  { title: "Crochet Hair", note: "Protective, premium", img: textureCloseup },
  { title: "4C Edges Wigs", note: "Edges that match yours", img: colPonytail },
  { title: "Bundles", note: "Raw textured weft", img: colBundles },
];

function Collections() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-luxe">
        <div className="mb-14 text-center">
          <div className="eyebrow mb-3">The collections</div>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance">
            Find your kind of hair.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-5">
          {HOME_COLLECTIONS.map((c) => (
            <Link to="/shop" key={c.title} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-sand">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  width={1000}
                  height={1300}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                />
              </div>
              <div className="pt-4 flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-lg md:text-xl text-espresso">{c.title}</h3>
                  <p className="text-xs text-muted-foreground">{c.note}</p>
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
function Bestsellers({ items }: { items: { name: string; product: ShopifyProduct | undefined }[] }) {
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
        {items.map(({ name, product }) =>
          product ? (
            <ProductCard
              key={name}
              product={product}
              adding={addingId === product.id}
              added={addedId === product.id}
              error={errorId === product.id}
              onQuickAdd={() => void quickAdd(product)}
            />
          ) : (
            <Link to="/shop" key={name} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-sand">
                <img
                  src={name.includes("Crochet") ? textureCloseup : ugc2}
                  alt={name}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]"
                />
              </div>
              <div className="pt-4">
                <h3 className="font-serif text-lg text-espresso">{name}</h3>
                <span className="text-sm text-muted-foreground">Coming to the shop soon</span>
              </div>
            </Link>
          ),
        )}
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
      <div className="overflow-hidden">
        <div className="flex w-max marquee gap-3 md:gap-5">
          {[...Array(4)].flatMap(() => [
            image("image.home.customer.1", ugc1),
            image("image.home.customer.2", ugc2),
            image("image.home.customer.3", ugc3),
            image("image.home.customer.4", ugc4),
          ]).map((src, i) => (
            <div key={i} className="relative aspect-[3/4] w-48 md:w-72 shrink-0 overflow-hidden bg-sand">
              <img src={src} alt="Customer wearing Melanvée" loading="lazy" width={900} height={1100} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 text-cream text-xs font-serif italic">@melanvee.muse</div>
            </div>
          ))}
        </div>
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
      text("home.how-it-works.step2.title", "Blend with your leave-out"),
      text(
        "home.how-it-works.step2.description",
        "Leave out a little of your own hair and blend it with the texture you chose.",
      ),
    ],
    [
      "03",
      text("home.how-it-works.step3.title", "Blend naturally"),
      text(
        "home.how-it-works.step3.description",
        "Because the texture matches yours, the finish looks like your own hair.",
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
