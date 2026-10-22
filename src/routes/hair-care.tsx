import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Droplets, Sun, Wind, Sparkles, Flame, Box } from "lucide-react";
import textureCloseup from "@/assets/texture-closeup.jpg";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/hair-care")({
  head: () => ({
    meta: [
      { title: "Hair Care Guide — MELANVÉE" },
      {
        name: "description",
        content:
          "Wash, style, store and protect your Melanvée unit. A care ritual designed to extend the life of textured hair.",
      },
      { property: "og:title", content: "Melanvée Hair Care Guide" },
      { property: "og:description", content: "Wash, style, store and protect your Melanvée unit." },
      { property: "og:image", content: textureCloseup },
    ],
  }),
  component: HairCarePage,
});

function HairCarePage() {
  const { text, image } = useSiteContent();
  const tips = [
    {
      icon: Droplets,
      t: text("hair-care.tip.1.title", "Wash gently"),
      d: text(
        "hair-care.tip.1.description",
        "Co-wash every 2 weeks with sulphate-free product. Squeeze, don't scrub. Cool water from root to tip.",
      ),
    },
    {
      icon: Sparkles,
      t: text("hair-care.tip.2.title", "Detangle with care"),
      d: text(
        "hair-care.tip.2.description",
        "Always detangle from ends upward, using a wide-tooth comb or fingers. Mist with a leave-in first.",
      ),
    },
    {
      icon: Sun,
      t: text("hair-care.tip.3.title", "Air dry first"),
      d: text(
        "hair-care.tip.3.description",
        "Let her air-dry on a mannequin stand. If short on time, low cool airflow only, never direct heat on damp hair.",
      ),
    },
    {
      icon: Flame,
      t: text("hair-care.tip.4.title", "Heat with respect"),
      d: text(
        "hair-care.tip.4.description",
        "150°C max. Always heat-protect. Curly textures stay curlier longer when you skip the iron entirely.",
      ),
    },
    {
      icon: Box,
      t: text("hair-care.tip.5.title", "Store quietly"),
      d: text(
        "hair-care.tip.5.description",
        "On a satin-lined stand or in the silk pouch she arrived in. Out of sunlight. Away from radiators.",
      ),
    },
    {
      icon: Wind,
      t: text("hair-care.tip.6.title", "Refresh, don't redo"),
      d: text(
        "hair-care.tip.6.description",
        "A light mist of water + leave-in revives most styles. Re-installing daily ages her faster than wear ever will.",
      ),
    },
  ];
  const installSteps = Array.from({ length: 5 }, (_, index) =>
    text(`hair-care.install.step${index + 1}`, ""),
  );
  return (
    <SiteLayout>
      <section className="bg-cream py-20 md:py-28">
        <div className="container-luxe text-center max-w-2xl mx-auto space-y-5">
          <div className="eyebrow">{text("hair-care.eyebrow", "The ritual")}</div>
          <h1 className="font-serif text-5xl md:text-6xl text-espresso text-balance">
            {text("hair-care.title", "Care like she's yours. Because she is.")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {text(
              "hair-care.description",
              "A simple, soft care ritual to keep your unit feeling like the day she arrived — for years, not weeks.",
            )}
          </p>
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {tips.map(({ icon: Icon, t, d }) => (
            <div key={t} className="space-y-3">
              <Icon size={28} strokeWidth={1.2} className="text-cocoa" />
              <h3 className="font-serif text-xl text-espresso">{t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-espresso text-cream py-24 md:py-32">
        <div className="container-luxe grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={image("image.hair-care.texture", textureCloseup)}
              alt="Curl detail"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="eyebrow text-blush">
              {text("hair-care.install.eyebrow", "Beginner install")}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-balance">
              {text("hair-care.install.title", "Five minutes. No glue. No tears.")}
            </h2>
            <ol className="space-y-4 text-cream/85">
              {installSteps.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-serif text-blush text-2xl leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
