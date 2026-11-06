import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import founder from "@/assets/founder.jpg";
import textureCloseup from "@/assets/texture-closeup.jpg";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MELANVÉE" },
      {
        name: "description",
        content:
          "The story behind Melanvée — textured hair made so women of colour can wear their own textures, beautifully blended.",
      },
      { property: "og:title", content: "About MELANVÉE" },
      {
        property: "og:description",
        content: "Why Becca started Melanvée: textured hair that looks like the hair we grow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { text, image } = useSiteContent();
  return (
    <SiteLayout>
      <section className="bg-cream py-20 md:py-28">
        <div className="container-luxe text-center max-w-3xl mx-auto space-y-6 fade-up">
          <div className="eyebrow">{text("about.eyebrow", "Our story")}</div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-espresso text-balance">
            {text("about.title", "Built quietly. Worn loudly.")}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {text(
              "about.intro",
              "Melanvée started with a simple wish: that women of colour could wear hair that looks like the hair we actually grow — kinky, coily, curly, bouncy — and have it blend so naturally that it simply looks like you.",
            )}
          </p>
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-center">
        <div className="aspect-[4/5] overflow-hidden bg-sand">
          <img
            src={image("image.about.founder", founder)}
            alt="Founder of Melanvée"
            width={1200}
            height={1400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <div className="eyebrow">{text("about.founder.eyebrow", "The founder's note")}</div>
          <h2 className="font-serif text-4xl text-espresso text-balance">
            {text("about.founder.title", "A note from Becca.")}
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              {text(
                "about.founder.paragraph1",
                "For a long time, the hair I could buy never looked like the hair on my head. It was beautiful, but it wasn't mine, and you could tell. I wanted to wear my own texture, give my hair a rest, and still feel like myself.",
              )}
            </p>
            <p>
              {text(
                "about.founder.paragraph2",
                "So I started looking for hair that matched ours. U/V part wigs and half wigs that blend with your leave-out, crochet hair and bundles in textures we recognise. It took time to get right, and I'm still learning with every piece we send out.",
              )}
            </p>
            <p>
              {text(
                "about.founder.paragraph3",
                "If you're wearing Melanvée, thank you for trusting me with your hair. I hope it feels like you on your best day.",
              )}
            </p>
            <p className="font-serif italic text-espresso text-lg pt-2">
              {text("about.founder.signature", "— Becca, founder")}
            </p>
          </div>
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 order-2 lg:order-1">
          <div className="eyebrow">{text("about.beliefs.eyebrow", "What we believe")}</div>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance">
            {text("about.beliefs.title", "What I believe.")}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed border-l border-cocoa/30 pl-6">
            <p>{text("about.belief.1", "I believe our hair deserves to be seen as it is. Not smoothed out, not swapped for something else.")}</p>
            <p>{text("about.belief.2", "I believe a protective style should still look like you, so nobody needs to ask.")}</p>
            <p>{text("about.belief.3", "And I believe you should be able to change it up — curly one week, stretched the next — without giving up your own texture.")}</p>
          </div>
          <Link
            to="/shop"
            className="inline-block bg-cocoa text-cream px-8 py-4 text-[0.72rem] tracking-[0.28em] uppercase hover:bg-espresso transition"
          >
            Shop the house
          </Link>
        </div>
        <div className="aspect-[4/5] overflow-hidden order-1 lg:order-2 bg-sand">
          <img
            src={image("image.about.texture", textureCloseup)}
            alt="Texture detail"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </SiteLayout>
  );
}
