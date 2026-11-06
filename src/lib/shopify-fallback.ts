/**
 * MELANVÉE — Built-in catalog fallback
 *
 * When no Shopify Storefront credentials are configured, the site serves the
 * built-in product catalog from `@/lib/products` and keeps the shopping bag
 * in localStorage, so the storefront remains fully browsable. As soon as
 * VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN are set, every call
 * in shopify.ts routes to Shopify instead and this module is bypassed.
 */

import { PRODUCTS, LENGTHS, type Product } from "@/lib/products";
import colUpart from "@/assets/collection-upart.jpg";
import colPonytail from "@/assets/collection-ponytail.jpg";
import colBundles from "@/assets/collection-bundles.jpg";
import colTextured from "@/assets/collection-textured.jpg";
import toolStraightener from "@/assets/tool-straightener.jpg";
import type {
  ShopifyCart,
  ShopifyCartLine,
  ShopifyCollection,
  ShopifyCollectionWithProducts,
  ShopifyImage,
  ShopifyProduct,
  ShopifyVariant,
} from "./shopify";

const COLLECTION_META: Record<Product["segment"], { handle: string; description: string; image: string }> = {
  "U/V Part Wigs": {
    handle: "u-v-part-wigs",
    description: "U-part and V-part wigs that blend like leave-out.",
    image: colUpart,
  },
  "Half Wig": {
    handle: "half-wigs",
    description: "Quick, lightweight coverage that slides on and goes.",
    image: colPonytail,
  },
  Crochet: {
    handle: "crochet",
    description: "Protective crochet installs with soft, natural movement.",
    image: colBundles,
  },
  "Layered Wigs": {
    handle: "layered-wigs",
    description: "Full lace-free layers with body, lift and bounce.",
    image: colTextured,
  },
  "Hot Tools": {
    handle: "hot-tools",
    description: "The finishing tools behind every MELANVÉE style.",
    image: toolStraightener,
  },
};

const SEGMENT_ORDER: Product["segment"][] = [
  "U/V Part Wigs",
  "Half Wig",
  "Crochet",
  "Layered Wigs",
  "Hot Tools",
];

const gbp = (n: number) => n.toFixed(2);

const toImage = (url: string, alt: string): ShopifyImage => ({
  url,
  altText: alt,
  width: 1200,
  height: 1500,
});

function variantTitleFor(product: Product, value: string): string {
  return product.hasLengths ? value : "One size";
}

function variantIdFor(product: Product, value: string): string {
  return `local:variant:${product.slug}:${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function toShopifyProduct(product: Product): ShopifyProduct {
  const image = toImage(product.img, product.name);
  const optionName = product.hasLengths ? "Length" : "Style";
  const optionValues = product.hasLengths
    ? LENGTHS.map((length) => `${length}"`)
    : ["Signature"];

  const variants: ShopifyVariant[] = optionValues.map((value) => ({
    id: variantIdFor(product, value),
    title: variantTitleFor(product, value),
    availableForSale: true,
    price: { amount: gbp(product.price), currencyCode: "GBP" },
    compareAtPrice: null,
    selectedOptions: [{ name: optionName, value }],
    image,
  }));

  return {
    id: `local:product:${product.slug}`,
    handle: product.slug,
    title: product.name,
    description: product.blurb,
    descriptionHtml: `<p>${product.blurb}</p>`,
    tags: [product.drop, ...(product.tag ? [product.tag] : [])],
    productType: product.segment,
    priceRange: {
      minVariantPrice: { amount: gbp(product.price), currencyCode: "GBP" },
      maxVariantPrice: { amount: gbp(product.price), currencyCode: "GBP" },
    },
    images: { edges: [{ node: image }] },
    variants: { edges: variants.map((node) => ({ node })) },
    options: [{ name: optionName, values: optionValues }],
  };
}

export function localProducts(first = 20): ShopifyProduct[] {
  return PRODUCTS.slice(0, first).map(toShopifyProduct);
}

export function localProductByHandle(handle: string): ShopifyProduct | null {
  const product = PRODUCTS.find((p) => p.slug === handle);
  return product ? toShopifyProduct(product) : null;
}

export function localCollections(first = 10): ShopifyCollection[] {
  return SEGMENT_ORDER.slice(0, first).map((segment) => ({
    id: `local:collection:${COLLECTION_META[segment].handle}`,
    handle: COLLECTION_META[segment].handle,
    title: segment,
    description: COLLECTION_META[segment].description,
    image: toImage(COLLECTION_META[segment].image, segment),
  }));
}

export function localCollectionsWithProducts(
  first = 10,
  productsFirst = 50,
): ShopifyCollectionWithProducts[] {
  return localCollections(first).map((collection) => ({
    ...collection,
    products: localProducts(productsFirst).filter(
      (product) => product.productType === collection.title,
    ),
  }));
}

// ─── Local cart (localStorage-backed) ──────────────────────────────────────

const CART_KEY = "melanvee_local_cart";

type LocalCart = ShopifyCart & { _note: string };

function readCart(): LocalCart {
  if (typeof window === "undefined") return emptyCart();
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as LocalCart;
      if (parsed && parsed.id) return parsed;
    }
  } catch {
    // corrupted storage — start fresh
  }
  return emptyCart();
}

function emptyCart(): LocalCart {
  return {
    id: "local:cart",
    checkoutUrl: "/contact",
    note: "",
    totalQuantity: 0,
    cost: {
      totalAmount: { amount: "0.00", currencyCode: "GBP" },
      subtotalAmount: { amount: "0.00", currencyCode: "GBP" },
    },
    lines: { edges: [] },
    _note: "",
  };
}

function writeCart(cart: LocalCart) {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // quota exceeded — cart stays in-memory for this session
    }
  }
  return cart;
}

function variantFor(merchandiseId: string): { variant: ShopifyVariant; product: ShopifyProduct } | null {
  for (const product of localProducts(50)) {
    const variant = product.variants.edges.map((e) => e.node).find((v) => v.id === merchandiseId);
    if (variant) return { variant, product };
  }
  return null;
}

function recalc(cart: LocalCart): LocalCart {
  const subtotal = cart.lines.edges.reduce(
    (sum, { node }) => sum + Number(node.merchandise.price.amount) * node.quantity,
    0,
  );
  cart.totalQuantity = cart.lines.edges.reduce((sum, { node }) => sum + node.quantity, 0);
  cart.cost = {
    totalAmount: { amount: gbp(subtotal), currencyCode: "GBP" },
    subtotalAmount: { amount: gbp(subtotal), currencyCode: "GBP" },
  };
  cart.note = cart._note;
  return cart;
}

export function localCreateCart(
  lines?: { merchandiseId: string; quantity: number }[],
): ShopifyCart {
  let cart = emptyCart();
  if (lines && lines.length > 0) {
    for (const line of lines) {
      cart = mergeLine(cart, line.merchandiseId, line.quantity);
    }
  }
  return writeCart(recalc(cart));
}

export function localGetCart(cartId: string): ShopifyCart | null {
  const cart = readCart();
  return cart.id === cartId ? cart : null;
}

function mergeLine(cart: LocalCart, merchandiseId: string, quantity: number): LocalCart {
  const existing = cart.lines.edges.find(({ node }) => node.merchandise.id === merchandiseId);
  if (existing) {
    existing.node.quantity += quantity;
    return cart;
  }

  const match = variantFor(merchandiseId);
  if (!match) return cart;

  const line: ShopifyCartLine = {
    id: `local:line:${merchandiseId}`,
    quantity,
    merchandise: {
      id: match.variant.id,
      title: match.variant.title,
      price: match.variant.price,
      product: {
        id: match.product.id,
        title: match.product.title,
        handle: match.product.handle,
        images: match.product.images,
      },
      selectedOptions: match.variant.selectedOptions,
    },
  };
  cart.lines.edges.push({ node: line });
  return cart;
}

export function localAddCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): ShopifyCart {
  let cart = readCart();
  if (cart.id !== cartId) cart = emptyCart();
  for (const line of lines) {
    cart = mergeLine(cart, line.merchandiseId, line.quantity);
  }
  return writeCart(recalc(cart));
}

export function localUpdateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
): ShopifyCart {
  let cart = readCart();
  if (cart.id !== cartId) cart = emptyCart();
  for (const { id, quantity } of lines) {
    const edge = cart.lines.edges.find(({ node }) => node.id === id);
    if (!edge) continue;
    if (quantity <= 0) {
      cart.lines.edges = cart.lines.edges.filter((e) => e !== edge);
    } else {
      edge.node.quantity = quantity;
    }
  }
  return writeCart(recalc(cart));
}

export function localRemoveCartLines(cartId: string, lineIds: string[]): ShopifyCart {
  let cart = readCart();
  if (cart.id !== cartId) cart = emptyCart();
  cart.lines.edges = cart.lines.edges.filter(({ node }) => !lineIds.includes(node.id));
  return writeCart(recalc(cart));
}

export function localUpdateCartNote(cartId: string, note: string): ShopifyCart {
  let cart = readCart();
  if (cart.id !== cartId) cart = emptyCart();
  cart._note = note;
  return writeCart(recalc(cart));
}
