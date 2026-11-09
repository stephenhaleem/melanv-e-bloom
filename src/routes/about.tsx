import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import founder from "@/assets/founder.jpg";
import community1 from "@/assets/ugc-1.jpg";
import community2 from "@/assets/ugc-2.jpg";
import community3 from "@/assets/ugc-3.jpg";
import community4 from "@/assets/ugc-4.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — MELANVÉE" },
      {
        name: "description",
        content:
          "The story behind Melanvée — textured hair made so women of colour can wear their own textures, beautifully blended.",
      },
      { property: "og:title", content: "Our Story — MELANVÉE" },
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
  const { image } = useSiteContent();
  const portraits = [community1, community2, community3, community4];
  return (
    <SiteLayout>
      <section className="bg-cream py-10 md:py-16">
        <div className="container-luxe">
          <div className="grid grid-cols-2 items-center gap-4 md:grid-cols-[1fr_1fr_2.4fr_1fr_1fr] md:gap-6">
            {portraits.slice(0, 2).map((photo, index) => (
              <div key={photo} className="aspect-[3/4] overflow-hidden bg-sand md:translate-y-6">
                <img src={image(`image.community.${index + 1}`, photo)} alt="Black woman celebrating her natural texture" className="h-full w-full object-cover" />
              </div>
            ))}
            <div className="col-span-2 py-6 text-center md:col-span-1 md:py-16">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-burgundy">MELANVÉE</p>
              <h1 className="font-serif text-5xl leading-tight text-burgundy md:text-7xl">Our story</h1>
            </div>
            {portraits.slice(2).map((photo, index) => (
              <div key={photo} className="aspect-[3/4] overflow-hidden bg-sand md:-translate-y-6">
                <img src={image(`image.community.${index + 3}`, photo)} alt="Black woman expressing her style through textured hair" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <h2 className="mt-12 text-center font-serif text-3xl leading-snug text-burgundy md:mt-20 md:text-5xl">The perfect hair. <em>The perfect mission.</em></h2>
        </div>
      </section>
      <section className="container-luxe grid items-start gap-10 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="aspect-[4/5] overflow-hidden bg-sand lg:sticky lg:top-36">
          <img
            src={image("image.about.founder", founder)}
            alt="Portrait accompanying Becca’s founder letter"
            width={1200}
            height={1400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <div className="eyebrow">A letter from our founder</div>
          <h2 className="font-serif text-4xl leading-tight text-burgundy md:text-5xl">It all started with women like you</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>As more women began embracing their natural hair, one thing became clear to me: we wanted choices that celebrated our texture, not styles that made us feel we had to hide it. Our curls and kinks deserved to be seen as beautiful, just as they are.</p>
            <p>I wanted to create a way for women to explore protective styles without feeling they had to straighten or chemically change their own hair to fit in. I imagined a collection that reflected the textures we recognise in ourselves — hair that would celebrate, not conceal, our unique beauty.</p>
            <p>That is the intention behind MELANVÉE. U/V part wigs and half wigs that blend with your own leave-out, alongside crochet hair and bundles that give you different ways to wear the textures you love. A change in length, a different shape, a new mood — while still looking and feeling like you.</p>
            <p>Being natural does not mean being one thing. You can love your own hair and still want to change your look. You can choose a protective style and still want your texture to show. MELANVÉE is here to make room for all of that expression.</p>
            <p className="border-y border-burgundy/20 py-6 text-burgundy"><strong className="block font-semibold leading-relaxed">Through all that we do as a brand,<br />our promise is to always champion<br />the boundless beauty in that expression.</strong></p>
            <p>Thank you for being part of this story. I hope every piece you wear gives you the freedom to feel more like yourself.</p>
            <p className="font-serif italic text-burgundy text-2xl pt-2">From Becca<br /><span className="text-lg">CEO &amp; Founder of Melanvee</span></p>
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-burgundy py-16 text-center text-cream">
        <div className="container-luxe">
          <h2 className="font-serif text-3xl md:text-4xl">Your texture. Your next chapter.</h2>
          <Button asChild variant="secondary" className="mt-8 rounded-none px-8">
            <Link to="/shop">Shop textured hair <ArrowRight aria-hidden="true" /></Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
