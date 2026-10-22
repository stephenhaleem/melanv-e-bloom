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
          "The story behind Melanvée — a textured hair house built for realism, softness, and the women who wear it.",
      },
      { property: "og:title", content: "About MELANVÉE" },
      {
        property: "og:description",
        content: "A textured hair house built for realism, softness, and the women who wear it.",
      },
      { property: "og:image", content: founder },
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
              "Melanvée was born in a London bathroom at 2am, with a wig that didn't fit and a woman who decided she'd had enough of pretending it did.",
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
            {text("about.founder.title", "A letter from Vée.")}
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              {text(
                "about.founder.paragraph1",
                "I started Melanvée because I was tired. Tired of bulky installs. Tired of unrealistic hairlines. Tired of pretending heavy meant luxury. I wanted something that felt like my own hair — only easier.",
              )}
            </p>
            <p>
              {text(
                "about.founder.paragraph2",
                "So I made it. One unit at a time, in small batches, with women I trust. We don't drop weekly. We don't chase trends. We make hair that disappears into you.",
              )}
            </p>
            <p>
              {text(
                "about.founder.paragraph3",
                "If you wear Melanvée, you are the brand. Thank you for letting us be part of your week.",
              )}
            </p>
            <p className="font-serif italic text-espresso text-lg pt-2">
              {text("about.founder.signature", "— Vée, founder")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cocoa text-cream py-24">
        <div className="container-luxe grid md:grid-cols-3 gap-12 text-center">
          {[
            [
              text("about.stat.1.value", "2021"),
              text("about.stat.1.description", "The year we started, in a London flat."),
            ],
            [
              text("about.stat.2.value", "42"),
              text("about.stat.2.description", "Countries we've shipped to since."),
            ],
            [
              text("about.stat.3.value", "1 of 1"),
              text("about.stat.3.description", "Every unit, finished by hand."),
            ],
          ].map(([k, v]) => (
            <div key={k} className="space-y-3">
              <div className="font-serif text-6xl text-blush">{k}</div>
              <p className="text-cream/80 text-sm max-w-xs mx-auto">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 order-2 lg:order-1">
          <div className="eyebrow">{text("about.beliefs.eyebrow", "What we believe")}</div>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso text-balance">
            {text("about.beliefs.title", "Luxury, quietly.")}
          </h2>
          <ul className="space-y-4 text-muted-foreground">
            {[
              text("about.belief.1", "Comfort is the new luxury."),
              text("about.belief.2", "Realism is more interesting than perfection."),
              text("about.belief.3", "Small batches mean better hair, kinder labour."),
              text("about.belief.4", "The community is the brand."),
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="text-cocoa">✦</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
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
