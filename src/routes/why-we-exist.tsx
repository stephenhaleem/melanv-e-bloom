import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import community from "@/assets/ugc-1.jpg";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/why-we-exist")({
  head: () => ({
    meta: [
      { title: "Why We Exist — MELANVÉE" },
      { name: "description", content: "Our purpose: textured hair that celebrates who you are, with the freedom to change your look without changing yourself." },
      { property: "og:title", content: "Why We Exist — MELANVÉE" },
      { property: "og:description", content: "Your texture. Your expression. Discover the purpose behind MELANVÉE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MissionPage,
});

function MissionPage() {
  const { image } = useSiteContent();
  return (
    <SiteLayout>
      <section className="bg-burgundy py-16 text-cream md:py-24">
        <div className="container-luxe text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.2em]">MELANVÉE</p>
          <h1 className="font-serif text-5xl md:text-7xl">Why we exist</h1>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-2xl leading-snug md:text-4xl">Change your look.<br /><em>Not who you are.</em></p>
        </div>
      </section>
      <section className="container-luxe grid items-center gap-10 py-16 md:grid-cols-2 md:gap-20 md:py-24">
        <div className="aspect-[4/5] overflow-hidden bg-sand">
          <img src={image("image.community.1", community)} alt="A Black woman wearing her curls with confidence" className="h-full w-full object-cover" />
        </div>
        <div className="space-y-6">
          <h2 className="font-serif text-4xl leading-tight text-burgundy md:text-5xl">Your texture is not something to hide.</h2>
          <div className="space-y-5 leading-relaxed text-muted-foreground">
            <p>Our curls, coils and kinks are part of us. They can be familiar, expressive, unpredictable and beautiful — sometimes all at once. Choosing a different hairstyle should never mean leaving that part of yourself behind.</p>
            <p>MELANVÉE exists for women who want more choice in how they wear their hair. More length, a fuller shape, a new look, or a protective style while their own hair rests. Hair that works with their texture, rather than asking them to change it.</p>
            <p>Through U/V part wigs, half wigs, crochet hair and bundles, we make room for different textures and different ways of being yourself. Whether you wear your natural hair every day or are finding your way back to it, you belong here.</p>
            <p>Our purpose is simple: to help you enjoy your texture and explore your style, on your own terms. Not to tell you what beauty should look like — but to celebrate what it looks like on you.</p>
          </div>
          <Button asChild variant="link" className="h-auto p-0 text-burgundy">
            <Link to="/about">Our story <ArrowRight aria-hidden="true" /></Link>
          </Button>
        </div>
      </section>
      <section className="border-y border-border bg-cream py-16 text-center md:py-20">
        <div className="container-luxe">
          <p className="mx-auto max-w-3xl font-serif text-3xl leading-snug text-burgundy md:text-5xl">The texture you love.<br /><em>The freedom to wear it your way.</em></p>
          <Button asChild className="mt-8 rounded-none px-8">
            <Link to="/textures">Find your texture <ArrowRight aria-hidden="true" /></Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}