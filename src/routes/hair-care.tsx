import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Droplets, Sun, Wind, Sparkles, Flame, Box } from "lucide-react";
import textureCloseup from "@/assets/texture-closeup.jpg";

export const Route = createFileRoute("/hair-care")({
  head: () => ({
    meta: [
      { title: "Hair Care Guide — MELANVÉE" },
      { name: "description", content: "Wash, style, store and protect your Melanvée unit. A care ritual designed to extend the life of textured hair." },
      { property: "og:title", content: "Melanvée Hair Care Guide" },
      { property: "og:description", content: "Wash, style, store and protect your Melanvée unit." },
      { property: "og:image", content: textureCloseup },
    ],
  }),
  component: HairCarePage,
});

const tips = [
  { icon: Droplets, t: "Wash gently", d: "Co-wash every 2 weeks with sulphate-free product. Squeeze, don't scrub. Cool water from root to tip." },
  { icon: Sparkles, t: "Detangle with care", d: "Always detangle from ends upward, using a wide-tooth comb or fingers. Mist with a leave-in first." },
  { icon: Sun, t: "Air dry first", d: "Let her air-dry on a mannequin stand. If short on time, low cool airflow only, never direct heat on damp hair." },
  { icon: Flame, t: "Heat with respect", d: "150°C max. Always heat-protect. Curly textures stay curlier longer when you skip the iron entirely." },
  { icon: Box, t: "Store quietly", d: "On a satin-lined stand or in the silk pouch she arrived in. Out of sunlight. Away from radiators." },
  { icon: Wind, t: "Refresh, don't redo", d: "A light mist of water + leave-in revives most styles. Re-installing daily ages her faster than wear ever will." },
];

function HairCarePage() {
  return (
    <SiteLayout>
      <section className="bg-cream py-20 md:py-28">
        <div className="container-luxe text-center max-w-2xl mx-auto space-y-5">
          <div className="eyebrow">The ritual</div>
          <h1 className="font-serif text-5xl md:text-6xl text-espresso text-balance">Care like she's yours. <em className="not-italic text-cocoa">Because she is.</em></h1>
          <p className="text-muted-foreground text-lg">A simple, soft care ritual to keep your unit feeling like the day she arrived — for years, not weeks.</p>
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
            <img src={textureCloseup} alt="Curl detail" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <div className="eyebrow text-blush">Beginner install</div>
            <h2 className="font-serif text-4xl md:text-5xl text-balance">Five minutes. No glue. No tears.</h2>
            <ol className="space-y-4 text-cream/85">
              {[
                "Braid your natural hair down and slip on a matching wig cap.",
                "Try the unit on — adjust the elastic band at the nape.",
                "Place the lace along your hairline; press the band into place.",
                "Use a light setting spray along the hairline; let dry 30 seconds.",
                "Part, style, go. That's it.",
              ].map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-serif text-blush text-2xl leading-none">{String(i + 1).padStart(2, "0")}</span>
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
