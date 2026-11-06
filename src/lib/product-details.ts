type Details = { intro: string; points: [string, string][] };

const HAIR_POINTS: [string, string][] = [
  ["Lengths", "Available from 14 to 26 inches. Choose your length above."],
  ["Blend", "Chosen to match natural textured hair, so it blends with your own leave-out."],
  ["Styling", "Can be worn as it comes, stretched, or straightened on low to medium heat with a heat protectant."],
  ["Care", "Co-wash with a sulphate-free conditioner, detangle gently from the ends up and air dry."],
  ["Shipping", "Ships within 1–3 business days. Free shipping on orders over £100."],
  ["Order notes", "Need something specific? Add a note in your bag before checkout and we'll read it before we pack your order."],
];

const BY_TYPE: Record<string, (name: string) => Details> = {
  "U/V Part Wigs": (n) => ({
    intro: `${n} is a U/V part wig: you leave out a small section of your own hair at the parting and blend it over the top. Because the texture is matched to natural hair, the finish looks like your hair, not a wig. It's a protective style that lets you rest your own hair while still wearing your texture.`,
    points: [["Construction", "U/V part wig with adjustable straps and combs for a secure fit."], ...HAIR_POINTS],
  }),
  "Half Wig": (n) => ({
    intro: `${n} is a half wig that sits behind your hairline and blends with your own edges and front leave-out. It's one of the quickest ways to switch your look while keeping your natural hairline on show.`,
    points: [["Construction", "Half wig with combs and an adjustable band."], ...HAIR_POINTS],
  }),
  Crochet: (n) => ({
    intro: `${n} is crochet hair for a protective install. Have it crocheted onto cornrows for a full, natural-looking style that can be worn for weeks while your own hair rests underneath.`,
    points: [["Install", "Crocheted onto braided cornrows, at home or by your stylist."], ...HAIR_POINTS],
  }),
  "Layered Wigs": (n) => ({
    intro: `${n} is cut with soft layers for movement and shape. The texture is chosen to look like natural hair, so it wears softly and moves the way real hair does.`,
    points: HAIR_POINTS,
  }),
  "Hot Tools": (n) => ({
    intro: `The ${n} is made for textured hair: adjustable heat settings let you style without overdoing it. Always use a heat protectant and the lowest heat that works for your hair.`,
    points: [
      ["Heat", "Adjustable temperature settings."],
      ["Use", "Suitable for natural hair and for styling your Melanvée pieces."],
      ["Shipping", "Ships within 1–3 business days. Free shipping on orders over £100."],
      ["Order notes", "Add a note in your bag before checkout if you need anything specific."],
    ],
  }),
};

export function getProductDetails(name: string, type: string): Details {
  return (BY_TYPE[type] ?? BY_TYPE["U/V Part Wigs"])(name);
}
