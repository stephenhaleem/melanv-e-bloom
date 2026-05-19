import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Sparkles, Feather, HandHeart, Shield, Wand2, Gem, Star, Heart, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero-melanvee.jpg";
import textureCloseup from "@/assets/texture-closeup.jpg";
import colTextured from "@/assets/collection-textured.jpg";
import colUpart from "@/assets/collection-upart.jpg";
import colPonytail from "@/assets/collection-ponytail.jpg";
import colBundles from "@/assets/collection-bundles.jpg";
import ugc1 from "@/assets/ugc-1.jpg";
import ugc2 from "@/assets/ugc-2.jpg";
import ugc3 from "@/assets/ugc-3.jpg";
import ugc4 from "@/assets/ugc-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MELANVÉE — Made to feel like yours" },
      { name: "description", content: "Premium textured wigs, protective styles and effortless beauty for the modern woman. Realism. Softness. Confidence." },
      { property: "og:title", content: "MELANVÉE — Made to feel like yours" },
      { property: "og:description", content: "Premium textured wigs and protective styles designed for realism, comfort and effortless beauty." },
      { property: "og:image", content: hero },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Marquee />
      <ValueProps />
      <Collections />
      <Bestsellers />
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
function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-luxe grid lg:grid-cols-12 gap-10 lg:gap-16 pt-12 pb-20 lg:pt-20 lg:pb-32 items-center">
        <div className="lg:col-span-5 fade-up space-y-8 order-2 lg:order-1">
          <div className="eyebrow">The Cocoa Collection · No.04</div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-espresso text-balance">
            Made to feel<br />
            <em className="not-italic text-cocoa">like yours.</em>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
            Textured wigs, protective styles, and quietly luxurious hair — designed for the
            way she actually lives. Realism without effort. Softness without weight.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-cocoa text-cream px-8 py-4 text-[0.72rem] tracking-[0.28em] uppercase hover:bg-espresso transition-colors"
            >
              Shop the Collection
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center border border-cocoa text-cocoa px-8 py-4 text-[0.72rem] tracking-[0.28em] uppercase hover:bg-cocoa hover:text-cream transition-colors"
            >
              Explore Textures
            </Link>
          </div>
          <div className="flex items-center gap-6 pt-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-cocoa text-cocoa" />)}
              <span className="ml-1">4.9 · 2,800+ reviews</span>
            </div>
            <div className="hidden sm:block">Worn in 42 countries</div>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 relative">
          <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden">
            <img
              src={hero}
              alt="A woman wearing a Melanvée textured wig, photographed in warm cocoa light"
              className="w-full h-full object-cover"
              width={1600}
              height={1280}
              fetchPriority="high"
            />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-auto bg-ivory/90 backdrop-blur p-5 md:p-6 max-w-xs">
              <div className="eyebrow mb-2">Featured</div>
              <div className="font-serif text-xl text-espresso">Cocoa Curl — 22"</div>
              <div className="text-sm text-muted-foreground mt-1">Glueless · Pre-styled · Beginner friendly</div>
              <div className="mt-3 text-cocoa font-medium">£289</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- MARQUEE -------------------- */
function Marquee() {
  const items = ["Pre-plucked HD lace", "Glueless ready", "100% raw textured hair", "Beginner friendly", "Free worldwide shipping over £120", "Klarna · Clearpay · Apple Pay"];
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
  const props = [
    { icon: Sparkles, t: "Natural-looking blends", d: "HD lace and melted hairlines, made to disappear." },
    { icon: Feather, t: "Lightweight comfort", d: "Built airy. Built to wear all day, every day." },
    { icon: HandHeart, t: "Beginner friendly", d: "Pre-styled, pre-plucked, ready out of the box." },
    { icon: Shield, t: "Protective styling", d: "Looks like your own hair while you grow your own." },
    { icon: Wand2, t: "Effortless installs", d: "Glueless. Adjustable. On in under 5 minutes." },
    { icon: Gem, t: "Premium quality", d: "Sourced, wefted and styled in small batches." },
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
function Collections() {
  const cats = [
    { img: colTextured, name: "Textured Wigs", count: "24 pieces" },
    { img: colUpart, name: "U-part Wigs", count: "12 pieces" },
    { img: colBundles, name: "Bundles", count: "18 pieces" },
    { img: colPonytail, name: "Ponytails", count: "9 pieces" },
  ];
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="eyebrow mb-3">Edits</div>
            <h2 className="font-serif text-4xl md:text-5xl text-espresso max-w-xl text-balance">
              A wardrobe of textures. Yours to live in.
            </h2>
          </div>
          <Link to="/shop" className="text-[0.72rem] tracking-[0.25em] uppercase text-cocoa border-b border-cocoa pb-1 self-start md:self-auto hover:text-espresso">
            View all collections
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {cats.map((c) => (
            <Link to="/shop" key={c.name} className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-sand">
                <img src={c.img} alt={c.name} loading="lazy" width={1000} height={1300} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out" />
              </div>
              <div className="pt-4 flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-lg md:text-xl text-espresso">{c.name}</h3>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.count}</div>
                </div>
                <Plus size={16} className="text-cocoa group-hover:rotate-90 transition-transform duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- BESTSELLERS -------------------- */
const products = [
  { name: "Cocoa Curl Glueless", price: 289, length: "22\"", img: colTextured, rating: 4.9, reviews: 412, tag: "Bestseller" },
  { name: "Ivory Straight U-part", price: 215, length: "20\"", img: colUpart, rating: 4.8, reviews: 287, tag: "New" },
  { name: "Honey Body Wave Bundles", price: 340, length: "3×24\"", img: colBundles, rating: 4.9, reviews: 521, tag: null },
  { name: "Sleek Onyx Ponytail", price: 95, length: "26\"", img: colPonytail, rating: 4.7, reviews: 198, tag: "Loved" },
];

function Bestsellers() {
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div>
          <div className="eyebrow mb-3">Bestsellers</div>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso max-w-xl text-balance">
            Quietly loved. Constantly re-ordered.
          </h2>
        </div>
        <Link to="/shop" className="text-[0.72rem] tracking-[0.25em] uppercase text-cocoa border-b border-cocoa pb-1 self-start md:self-auto hover:text-espresso">
          Shop bestsellers
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map(p => <ProductCard key={p.name} p={p} />)}
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: typeof products[number] }) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <img src={p.img} alt={p.name} loading="lazy" width={1000} height={1300} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
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
  );
}

/* -------------------- WHY MELANVÉE -------------------- */
function WhyMelanvee() {
  return (
    <section className="bg-cocoa text-cream py-24 md:py-36 relative overflow-hidden">
      <div className="container-luxe grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img src={textureCloseup} alt="Close-up of natural curls" loading="lazy" width={1200} height={1500} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-8">
          <div className="eyebrow text-blush">Why Melanvée</div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] text-balance">
            Hair that feels<br /><em className="not-italic text-blush">like you</em> wrote it.
          </h2>
          <p className="text-cream/80 text-lg leading-relaxed max-w-lg">
            We make textured hair for the woman who's done compromising. The kind of softness
            that doesn't announce itself. The kind of realism your sister second-guesses.
            The kind of confidence that lives in your shoulders before it ever reaches your face.
          </p>
          <ul className="space-y-3 text-cream/85">
            {[
              "Realism — blended to disappear at the hairline",
              "Softness — feather-light, breathable, comfortable for hours",
              "Confidence — quiet luxury you wear, not perform",
            ].map(s => (
              <li key={s} className="flex gap-3 text-sm">
                <span className="text-blush">✦</span> {s}
              </li>
            ))}
          </ul>
          <Link to="/about" className="inline-block border-b border-cream pb-1 text-[0.72rem] tracking-[0.25em] uppercase hover:text-blush hover:border-blush transition">
            Read our story
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------- BEFORE & AFTER -------------------- */
function BeforeAfter() {
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
        <div className="eyebrow">Real installs</div>
        <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance">
          Worn by her. Filmed in her bathroom.
        </h2>
        <p className="text-muted-foreground">Customer transformations — unedited, unfiltered, on real schedules.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {[ugc1, ugc2, ugc3, ugc4].map((src, i) => (
          <div key={i} className="relative aspect-[3/4] overflow-hidden bg-sand group">
            <img src={src} alt="Customer install" loading="lazy" width={900} height={1100} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
            <div className="absolute bottom-3 left-3 text-cream text-xs font-serif italic">@melanvee.muse</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- COMMUNITY -------------------- */
function Community() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-luxe text-center max-w-2xl mx-auto space-y-5">
        <div className="eyebrow">#MelanveeMuse</div>
        <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance">
          Styled by the Melanvée community.
        </h2>
        <p className="text-muted-foreground">Tag us on Instagram & TikTok for a chance to be featured.</p>
        <div className="flex gap-4 justify-center pt-2 text-[0.7rem] tracking-[0.25em] uppercase">
          <a href="#" className="border-b border-cocoa pb-1 text-cocoa hover:text-espresso">Instagram</a>
          <a href="#" className="border-b border-cocoa pb-1 text-cocoa hover:text-espresso">TikTok</a>
        </div>
      </div>
      <div className="mt-14 grid grid-cols-2 md:grid-cols-6 gap-2">
        {[ugc2, ugc3, ugc1, ugc4, ugc3, ugc2].map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden">
            <img src={src} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- TESTIMONIALS -------------------- */
function Testimonials() {
  const reviews = [
    { quote: "I've worn it for three weeks straight and forgot it wasn't mine. The hairline blends into my actual skin.", name: "Amara O.", style: "Cocoa Curl 22\"" },
    { quote: "Genuinely the softest unit I've ever owned. I cried a little. No notes.", name: "Joelle K.", style: "Honey Body Wave" },
    { quote: "Installed it in 4 minutes before a meeting. People kept asking what I changed.", name: "Bisi A.", style: "Ivory Straight U-part" },
  ];
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="grid md:grid-cols-3 gap-10 md:gap-16">
        {reviews.map(r => (
          <figure key={r.name} className="space-y-6">
            <div className="text-cocoa flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-cocoa" />)}
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
  const steps = [
    ["01", "Choose your texture", "Match her natural pattern or try something new — coily, curly, wavy, sleek."],
    ["02", "Install effortlessly", "Glueless, adjustable, pre-styled. Ready in under five minutes."],
    ["03", "Blend naturally", "Melted HD lace and a feather edge that disappears into the skin."],
    ["04", "Go.", "Wear her to work, the gym, the wedding, the weekend. Repeat."],
  ];
  return (
    <section className="bg-espresso text-cream py-24 md:py-32">
      <div className="container-luxe">
        <div className="text-center mb-16 space-y-4">
          <div className="eyebrow text-blush">How it works</div>
          <h2 className="font-serif text-4xl md:text-5xl text-balance">Four quiet steps. One you.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-10 md:gap-6">
          {steps.map(([n, t, d]) => (
            <div key={n} className="space-y-4 md:border-l md:first:border-l-0 md:border-cream/15 md:pl-6">
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
const faqs = [
  ["How long does shipping take?", "UK orders arrive in 2–4 business days. International in 5–10. Express options at checkout."],
  ["Are the wigs beginner-friendly?", "Yes — every wig ships pre-plucked, pre-styled and glueless. Most customers install in under 5 minutes."],
  ["How do I care for my hair?", "Co-wash every 2 weeks, air dry, and store on a satin-lined stand. See our full Hair Care Guide."],
  ["Do you ship internationally?", "We ship to 42+ countries with tracked, duty-clear delivery."],
  ["Do you offer payment plans?", "Klarna and Clearpay are available at checkout in supported regions."],
  ["What if my texture doesn't match?", "We offer free texture matching with our concierge — message us on WhatsApp."],
];

function FAQSection() {
  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="eyebrow">Answered</div>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance">The things she always asks.</h2>
          <p className="text-muted-foreground text-sm">Can't find what you need? Reach our concierge — we usually reply within an hour.</p>
          <Link to="/contact" className="inline-block border-b border-cocoa pb-1 text-[0.72rem] tracking-[0.25em] uppercase text-cocoa">Talk to us</Link>
        </div>
        <div className="md:col-span-2 divide-y divide-border">
          {faqs.map(([q, a]) => <FAQItem key={q} q={q} a={a} />)}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-5">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left gap-6">
        <span className="font-serif text-lg md:text-xl text-espresso">{q}</span>
        <ChevronDown size={18} className={`text-cocoa shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* -------------------- NEWSLETTER -------------------- */
function Newsletter() {
  return (
    <section className="bg-blush/40 py-24 md:py-32">
      <div className="container-luxe text-center max-w-2xl mx-auto space-y-6">
        <div className="eyebrow">The List</div>
        <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance">
          Join the Melanvée community.
        </h2>
        <p className="text-muted-foreground">
          Restock alerts, early access to drops, and a £15 welcome credit on your first order.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="Your email address"
            className="flex-1 bg-ivory border border-cocoa/20 px-5 py-4 text-sm focus:outline-none focus:border-cocoa"
          />
          <button className="bg-cocoa text-cream px-8 py-4 text-[0.7rem] tracking-[0.28em] uppercase hover:bg-espresso transition">
            Join us
          </button>
        </form>
      </div>
    </section>
  );
}
