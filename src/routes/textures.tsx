import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Price } from "@/lib/currency";
import { getProductImage, getProducts, getStartingPrice } from "@/lib/shopify";

const TEXTURES = [
  {
    id: "curly",
    name: "Curly",
    line: "Defined curls with real bounce and body.",
    match: ["curl", "wave"],
  },
  {
    id: "straight",
    name: "Straight",
    line: "Kinky and yaki straights that blend like your own blow-out.",
    match: ["straight"],
  },
  {
    id: "bouncy",
    name: "Bouncy",
    line: "Soft volume and movement that holds all day.",
    match: ["bouncy", "bob"],
  },
  {
    id: "coily",
    name: "Coily",
    line: "Tight, springy coils true to 4-type texture.",
    match: ["coil", "kinky curl", "crochet"],
  },
];

export const Route = createFileRoute("/textures")({
  beforeLoad: () => { throw redirect({ to: "/shop", search: { view: "texture" } }); },
  loader: async () => ({ products: await getProducts(50) }),
  head: () => ({
    meta: [
      { title: "Shop by Texture — MELANVÉE" },
      {
        name: "description",
        content: "Find your style by texture: curly, straight, bouncy and coily textured wigs.",
      },
      { property: "og:title", content: "Shop by Texture — MELANVÉE" },
      {
        property: "og:description",
        content: "Curly, straight, bouncy or coily — find the Melanvée texture that matches yours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TexturesPage,
});

function TexturesPage() {
  const { products } = Route.useLoaderData();
  return (
    <SiteLayout>
      <section className="container-luxe py-20 text-center md:py-28">
        <div className="eyebrow mb-4">Find your style</div>
        <h1 className="font-serif text-5xl text-espresso md:text-6xl text-balance">
          Shop by texture.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
          Start with the texture closest to your own. Everything else falls into place.
        </p>
        <nav className="mt-10 flex flex-wrap justify-center gap-3">
          {TEXTURES.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="border border-burgundy px-6 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-burgundy transition-colors hover:bg-burgundy hover:text-cream"
            >
              {t.name}
            </a>
          ))}
        </nav>
      </section>

      {TEXTURES.map((t, i) => {
        const list = products.filter(
          (p) =>
            p.productType !== "Hot Tools" &&
            t.match.some((m) => p.title.toLowerCase().includes(m)),
        );
        return (
          <section
            key={t.id}
            id={t.id}
            className={`scroll-mt-28 py-20 ${i % 2 === 0 ? "bg-cream" : "bg-ivory"}`}
          >
            <div className="container-luxe">
              <div className="mb-10 flex flex-col gap-2 border-b border-burgundy/20 pb-6 md:flex-row md:items-end md:justify-between">
                <h2 className="font-serif text-4xl text-espresso md:text-5xl">{t.name}</h2>
                <p className="text-sm text-muted-foreground">{t.line}</p>
              </div>
              {list.length === 0 ? (
                <p className="text-sm text-muted-foreground">New styles arriving soon.</p>
              ) : (
                <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
                  {list.map((p) => (
                    <Link
                      key={p.id}
                      to="/shop/$slug"
                      params={{ slug: p.handle }}
                      className="group block"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-sand">
                        <img
                          src={getProductImage(p)}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="pt-4">
                        <h3 className="font-serif text-lg text-espresso">{p.title}</h3>
                        <Price gbp={getStartingPrice(p)} className="text-sm text-cocoa" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </SiteLayout>
  );
}
