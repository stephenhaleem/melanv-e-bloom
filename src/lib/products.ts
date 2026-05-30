import colTextured from "@/assets/collection-textured.jpg";
import colUpart from "@/assets/collection-upart.jpg";
import colPonytail from "@/assets/collection-ponytail.jpg";
import colBundles from "@/assets/collection-bundles.jpg";
import textureCloseup from "@/assets/texture-closeup.jpg";
import toolStraightener from "@/assets/tool-straightener.jpg";
import toolCurler from "@/assets/tool-curler.jpg";
import toolHybrid from "@/assets/tool-hybrid.jpg";
import toolAutoCurler from "@/assets/tool-auto-curler.jpg";

export type Segment =
  | "U/V Part Wigs"
  | "Half Wig"
  | "Crochet"
  | "Layered Wigs"
  | "Hot Tools";

export type Drop = "Back to Work" | "Summer Edit" | "Signature" | "Tools";

export type Product = {
  slug: string;
  name: string;
  price: number;
  img: string;
  rating: number;
  reviews: number;
  tag: string | null;
  segment: Segment;
  drop: Drop;
  /** Hair products: true (14–26"). Tools: false. */
  hasLengths: boolean;
  /** Short editorial description for PDP. */
  blurb: string;
};

export const LENGTHS = [14, 16, 18, 20, 22, 24, 26] as const;

export const PRODUCTS: Product[] = [
  // Back to Work — Autumn launch
  {
    slug: "zuri-kinky-straight",
    name: "Zuri Kinky Straight",
    price: 295,
    img: colUpart,
    rating: 4.9,
    reviews: 84,
    tag: "New",
    segment: "U/V Part Wigs",
    drop: "Back to Work",
    hasLengths: true,
    blurb:
      "A boardroom-ready U-part with a kinky-straight texture that blends like leave-out. Made for the woman who runs the room.",
  },
  {
    slug: "lielle-yaki-straight",
    name: "Lielle Yaki Straight",
    price: 275,
    img: colUpart,
    rating: 4.9,
    reviews: 71,
    tag: "New",
    segment: "U/V Part Wigs",
    drop: "Back to Work",
    hasLengths: true,
    blurb:
      "Silk-pressed yaki on a V-part construction. Soft, fluid movement with a finish that feels like your own.",
  },
  {
    slug: "isi-bouncy",
    name: "ISI Bouncy",
    price: 310,
    img: colTextured,
    rating: 4.8,
    reviews: 96,
    tag: "New",
    segment: "Layered Wigs",
    drop: "Back to Work",
    hasLengths: true,
    blurb:
      "Layered, bouncy, lifted at the root. A signature silhouette for autumn — body without effort.",
  },

  // Signature
  {
    slug: "kimi-curl",
    name: "Kimi Curl",
    price: 289,
    img: colTextured,
    rating: 4.9,
    reviews: 412,
    tag: "Bestseller",
    segment: "U/V Part Wigs",
    drop: "Signature",
    hasLengths: true,
    blurb:
      "Our most-loved curl pattern. A soft 3B coil with bounce and shine, built into a seamless U-part.",
  },
  {
    slug: "zora-coil",
    name: "Zora Coil",
    price: 305,
    img: textureCloseup,
    rating: 4.9,
    reviews: 244,
    tag: null,
    segment: "Half Wig",
    drop: "Signature",
    hasLengths: true,
    blurb:
      "A defined 4A coil on a half-wig base. Designed to blend with your natural leave-out for an undetectable finish.",
  },
  {
    slug: "lola-bouncy",
    name: "Lola Bouncy",
    price: 280,
    img: colTextured,
    rating: 4.8,
    reviews: 318,
    tag: "Loved",
    segment: "Layered Wigs",
    drop: "Signature",
    hasLengths: true,
    blurb:
      "A layered bouncy blowout — the everyday hero. Soft volume, weightless feel, full glam in minutes.",
  },

  // Summer Edit
  {
    slug: "alima-bouncy",
    name: "Alima Bouncy",
    price: 270,
    img: colTextured,
    rating: 4.8,
    reviews: 187,
    tag: null,
    segment: "Half Wig",
    drop: "Summer Edit",
    hasLengths: true,
    blurb:
      "Lightweight, breezy bounce on a half-wig base. Built for warm days and humidity-proof confidence.",
  },
  {
    slug: "jaelle-bob-wig",
    name: "Jaelle Bob Wig",
    price: 235,
    img: colUpart,
    rating: 4.9,
    reviews: 221,
    tag: "Loved",
    segment: "Layered Wigs",
    drop: "Summer Edit",
    hasLengths: true,
    blurb:
      "The chop, refined. A layered bob with sharp lines and soft movement — editorial without effort.",
  },
  {
    slug: "summer-water-wave",
    name: "Summer Water Wave",
    price: 260,
    img: colBundles,
    rating: 4.8,
    reviews: 154,
    tag: null,
    segment: "U/V Part Wigs",
    drop: "Summer Edit",
    hasLengths: true,
    blurb:
      "Loose, fluid water wave on a U-part. Wet-set or air-dry — both look unreal.",
  },

  // Crochet
  {
    slug: "burmese-crochet",
    name: "Burmese Crochet",
    price: 145,
    img: colPonytail,
    rating: 4.8,
    reviews: 92,
    tag: null,
    segment: "Crochet",
    drop: "Signature",
    hasLengths: true,
    blurb:
      "A soft Burmese curl, pre-looped and ready to install. Protective styling, premium feel.",
  },
  {
    slug: "summer-crochet",
    name: "Summer Crochet",
    price: 135,
    img: colPonytail,
    rating: 4.7,
    reviews: 78,
    tag: null,
    segment: "Crochet",
    drop: "Summer Edit",
    hasLengths: true,
    blurb:
      "A breezy water-wave crochet for low-effort summer days. Lightweight, soft, holiday-ready.",
  },

  // Hot Tools
  {
    slug: "signature-straightener",
    name: "Signature Straightener",
    price: 120,
    img: toolStraightener,
    rating: 4.9,
    reviews: 64,
    tag: "New",
    segment: "Hot Tools",
    drop: "Tools",
    hasLengths: false,
    blurb:
      "Ceramic-tourmaline plates, even heat distribution, kind to texture. Salon glide at home.",
  },
  {
    slug: "curling-iron",
    name: "Curling Iron",
    price: 110,
    img: toolCurler,
    rating: 4.8,
    reviews: 47,
    tag: "New",
    segment: "Hot Tools",
    drop: "Tools",
    hasLengths: false,
    blurb:
      "A 32mm wand for soft, bouncy curls that hold all night. Lightweight, fast-heating, intuitive.",
  },
  {
    slug: "2-in-1-straightener-curler",
    name: "2-in-1 Straightener & Curler",
    price: 145,
    img: toolHybrid,
    rating: 4.9,
    reviews: 58,
    tag: "New",
    segment: "Hot Tools",
    drop: "Tools",
    hasLengths: false,
    blurb:
      "One tool, two finishes. Silk-press or soft curl — flip the switch, change the look.",
  },
  {
    slug: "automatic-curler",
    name: "Automatic Curler",
    price: 165,
    img: toolAutoCurler,
    rating: 4.8,
    reviews: 39,
    tag: "New",
    segment: "Hot Tools",
    drop: "Tools",
    hasLengths: false,
    blurb:
      "Self-rotating barrel for effortless, uniform curls. Pro-level results without the technique.",
  },
];

export const SEGMENTS: Segment[] = [
  "U/V Part Wigs",
  "Half Wig",
  "Crochet",
  "Layered Wigs",
  "Hot Tools",
];

export const SEGMENT_COPY: Record<Segment, { tagline: string; description: string }> = {
  "U/V Part Wigs": {
    tagline: "Seamless leave-out, undetectable finish",
    description: "U-part and V-part constructions for women who want speed, blend and zero compromise.",
  },
  "Half Wig": {
    tagline: "Half the install, all the impact",
    description: "Slip on, blend with your own leave-out, go. Built for ease and effortless realism.",
  },
  Crochet: {
    tagline: "Protective styling, premium texture",
    description: "Pre-looped crochet hair, soft enough to wear long-term and luxe enough to feel signature.",
  },
  "Layered Wigs": {
    tagline: "Sculpted shape, soft movement",
    description: "Hand-cut layers for body, lift and silhouette — full wigs that look like a salon blowout.",
  },
  "Hot Tools": {
    tagline: "Salon-grade heat, kind to texture",
    description: "Our first hot tools collection. Engineered to refine, not to damage.",
  },
};

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
