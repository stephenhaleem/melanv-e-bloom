import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, ChevronLeft, Check, Truck, Sparkles, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Price } from "@/lib/currency";
import { useCart } from "@/lib/cart";
import { ProductReviews } from "@/components/site/ProductReviews";
import {
  findVariant,
  getProductByHandle,
  getProductImage,
  getProducts,
  getStartingPrice,
  type ShopifyProduct,
} from "@/lib/shopify";

export const Route = createFileRoute("/shop/$slug")({
  loader: async ({ params }) => {
    const product = await getProductByHandle(params.slug);
    if (!product) throw notFound();
    const products = await getProducts(50);
    return {
      product,
      related: products.filter((candidate) => candidate.id !== product.id).slice(0, 4),
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} — MELANVÉE` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.title} — MELANVÉE` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: getProductImage(loaderData.product) },
          { name: "twitter:image", content: getProductImage(loaderData.product) },
        ]
      : [{ title: "Product — MELANVÉE" }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-luxe py-32 text-center space-y-4">
        <div className="eyebrow">Not found</div>
        <h1 className="font-serif text-4xl text-espresso">This piece has moved.</h1>
        <Link
          to="/shop"
          className="inline-block border-b border-cocoa pb-1 text-[0.72rem] tracking-[0.25em] uppercase text-cocoa"
        >
          Back to the shop
        </Link>
      </div>
    </SiteLayout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product, related }: { product: ShopifyProduct; related: ShopifyProduct[] } =
    Route.useLoaderData();
  const { add } = useCart();
  const firstVariant =
    product.variants.edges.find(({ node }) => node.availableForSale)?.node ??
    product.variants.edges[0]?.node;
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      (firstVariant?.selectedOptions ?? []).map(({ name, value }) => [name, value]),
    ),
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(getProductImage(product));
  const variant = findVariant(product, selectedOptions);
  const images = product.images.edges.map(({ node }) => node);

  useEffect(() => {
    setSelectedImage(getProductImage(product));
    setSelectedOptions(
      Object.fromEntries(
        (
          product.variants.edges.find(({ node }) => node.availableForSale)?.node.selectedOptions ??
          product.variants.edges[0]?.node.selectedOptions ??
          []
        ).map(({ name, value }) => [name, value]),
      ),
    );
  }, [product]);

  const onAdd = async () => {
    if (!variant?.availableForSale) return;
    setAdding(true);
    setAddError(false);
    try {
      await add(variant.id, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } catch (error) {
      console.error("[shopify] Could not add product to cart:", error);
      setAddError(true);
    } finally {
      setAdding(false);
    }
  };

  return (
    <SiteLayout>
      <div className="container-luxe pt-6 pb-2">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 text-[0.7rem] tracking-[0.22em] uppercase text-cocoa hover:text-espresso"
        >
          <ChevronLeft size={14} /> Shop
        </Link>
      </div>

      <section className="container-luxe py-8 md:py-12 grid md:grid-cols-2 gap-8 md:gap-16">
        {/* Image */}
        <div className="space-y-3">
          <div className="aspect-[4/5] bg-sand overflow-hidden">
            <img src={selectedImage} alt={product.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {images.map((image) => (
              <button
                key={image.url}
                type="button"
                onClick={() => setSelectedImage(image.url)}
                className={`aspect-square bg-sand overflow-hidden transition ${selectedImage === image.url ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
              >
                <img
                  src={image.url}
                  alt={image.altText ?? product.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-7 md:py-4">
          <div>
            <div className="eyebrow">{product.productType || "The Collection"}</div>
            <h1 className="font-serif text-4xl md:text-5xl text-espresso mt-3 leading-[1.05]">
              {product.title}
            </h1>
          </div>

          <Price
            gbp={variant ? Number(variant.price.amount) : getStartingPrice(product)}
            className="text-2xl font-serif text-espresso block"
          />

          <p className="text-muted-foreground leading-relaxed max-w-md">
            {product.description || "Discover the MELANVÉE signature collection."}
          </p>

          {product.options
            .filter((option) => option.values.length > 1)
            .map((option) => (
              <div key={option.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{option.name}</span>
                  <span className="text-[0.7rem] text-muted-foreground">
                    {selectedOptions[option.name]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setSelectedOptions((current) => ({ ...current, [option.name]: value }))
                      }
                      className={`px-4 py-3 text-xs border transition ${
                        selectedOptions[option.name] === value
                          ? "bg-cocoa text-cream border-cocoa"
                          : "bg-ivory text-cocoa border-border hover:border-cocoa"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

          <div className="space-y-3">
            <span className="eyebrow">Quantity</span>
            <div className="inline-flex items-center border border-border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 hover:bg-cream"
              >
                −
              </button>
              <span className="w-12 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 hover:bg-cream">
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => void onAdd()}
              disabled={!variant?.availableForSale || adding}
              className="flex-1 bg-cocoa text-cream py-4 text-[0.72rem] tracking-[0.3em] uppercase hover:bg-espresso transition flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : adding ? (
                "Adding…"
              ) : variant?.availableForSale ? (
                "Add to bag"
              ) : (
                "Sold out"
              )}
            </button>
            <button
              aria-label="Wishlist"
              className="w-14 h-14 border border-cocoa text-cocoa hover:bg-cocoa hover:text-cream transition flex items-center justify-center"
            >
              <Heart size={16} />
            </button>
          </div>
          {addError && (
            <p role="alert" className="text-sm text-destructive">
              We couldn’t add this item to your bag. Please try again.
            </p>
          )}

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border text-[0.7rem] tracking-[0.18em] uppercase text-cocoa">
            <li className="flex items-center gap-2">
              <Truck size={14} /> Free over £100
            </li>
            <li className="flex items-center gap-2">
              <Sparkles size={14} /> Hand-finished
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={14} /> 30-day care
            </li>
          </ul>
        </div>
      </section>

      <ProductReviews productId={product.id} />

      {related.length > 0 && (
        <section className="container-luxe py-16 md:py-20 border-t border-border mt-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="eyebrow">Pairs with</div>
              <h2 className="font-serif text-3xl text-espresso mt-2">More from the collection</h2>
            </div>
            <Link
              to="/shop"
              className="text-[0.7rem] tracking-[0.25em] uppercase text-cocoa border-b border-cocoa pb-1"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {related.map((p) => (
              <Link key={p.handle} to="/shop/$slug" params={{ slug: p.handle }} className="group">
                <div className="aspect-[4/5] bg-sand overflow-hidden">
                  <img
                    src={getProductImage(p)}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]"
                  />
                </div>
                <h3 className="font-serif text-lg text-espresso mt-3">{p.title}</h3>
                <Price gbp={getStartingPrice(p)} className="text-cocoa text-sm" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
