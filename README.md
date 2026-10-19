# MELANVÉE Bloom

Build a luxury, modern, community-driven e-commerce website for a textured hair and beauty brand called MELANVÉE.

BRAND OVERVIEW:
MELANVÉE is a premium hair brand focused on natural-looking textured wigs, protective styles, effortless beauty, and confidence for women who want realism, softness, comfort, and convenience. The brand should feel luxurious but approachable. Think warm, editorial, feminine, intentional, modern, community-driven, and emotionally connected.

The overall feeling should be:
“Luxury without trying too hard.”
“Effortless beauty.”
“Made to feel like yours.”

The website should NOT feel:
- overly corporate
- cheap beauty supply store
- overly pink/feminine influencer aesthetic
- cluttered or chaotic
- generic Shopify template

VISUAL DIRECTION:
Primary colour:
- Rich cocoa brown (#4B2E2B style tone)

Secondary colours:
- Warm cream / ivory
- Soft dusty blush accents used minimally
- Deep espresso accents for depth

Typography:
- Elegant serif font for headings
- Clean modern sans serif for body text
- Editorial luxury fashion aesthetic

DESIGN STYLE:
- Minimal but emotionally rich
- High-end fashion campaign feel
- Soft shadows and warm lighting
- Clean spacing and premium layouts
- Large imagery and cinematic visuals
- Mobile-first responsive design
- Smooth animations and transitions
- Sophisticated but easy to navigate

TARGET AUDIENCE:
Women who:
- want natural-looking hair
- are tired of bulky installs and unrealistic wigs
- love effortless beauty
- want luxury but also comfort
- want protective styles that still look like their own hair
- are busy professionals, students, creators, gym girls, and everyday women

MAIN WEBSITE GOALS:
- Build trust immediately
- Feel emotionally connected and community-driven
- Increase conversions and add-to-cart rate
- Make products feel premium and worth the price
- Encourage repeat customers
- Create a recognizable luxury brand identity

HOMEPAGE STRUCTURE:

1. HERO SECTION
- Full-width cinematic banner/video
- Beautiful textured hair model
- Warm cocoa aesthetic
- Emotional headline:
“Made to feel like yours.”
- Subheading focused on realism, comfort, and effortless beauty
- CTA buttons:
“Shop Collection”
“Explore Textures”

2. TRUST/BRAND VALUE SECTION
Highlight:
- Natural-looking blends
- Lightweight comfort
- Beginner-friendly
- Protective styling
- Effortless installs
- Premium quality

Use clean luxury icons.

3. FEATURED COLLECTIONS
Display categories:
- Textured wigs
- U-part wigs
- V-part wigs
- Bundles
- Ponytails
- Styling tools
- Protective styles

4. BESTSELLERS SECTION
Include:
- Product reviews
- Star ratings
- Add-to-cart buttons
- Quick view functionality
- Wishlist option

5. “WHY MELANVÉE?” SECTION
Emotional storytelling section explaining:
- realism
- softness
- comfort
- confidence
- effortless beauty
- hair that feels like your own

6. BEFORE & AFTER / RESULTS SECTION
- User-generated content
- Customer transformations
- Realistic installs
- TikTok/reels integration

7. COMMUNITY SECTION
Show:
- Instagram feed
- TikTok feed
- Customer photos/videos
- “Styled by the MELANVÉE community”

8. TESTIMONIALS
Luxury carousel testimonials with customer photos.

9. HOW IT WORKS SECTION
Simple steps:
1. Choose texture
2. Install effortlessly
3. Blend naturally
4. Go

10. FAQ SECTION
Include:
- Shipping
- Processing times
- Hair care
- Wig maintenance
- Returns
- International shipping
- Payment plans
- Texture matching
- Beginner guidance

11. EMAIL/SMS SIGNUP
Offer:
“Join the MELANVÉE community”

12. FOOTER
Include:
- Shop
- About Us
- Contact
- FAQ
- Shipping Policy
- Refund Policy
- Privacy Policy
- Terms & Conditions
- Hair Care Guide
- Track Order
- Social links
- Newsletter signup

ESSENTIAL PAGES:

ABOUT US PAGE:
Tell a warm founder-led story about creating realistic, effortless hair solutions that feel personal, confidence-boosting, and community-driven.

CONTACT PAGE:
Include:
- contact form
- customer care email
- WhatsApp support button
- response time expectations
- social links

FAQ PAGE:
Well-organized accordion style FAQs.

HAIR CARE / HOW TO PAGE:
Include:
- maintenance tips
- washing instructions
- styling tutorials
- storage advice
- heat care guidance
- beginner install tutorials

PRODUCT PAGES:
Must include:
- luxury gallery
- zoom functionality
- video demonstrations
- realistic texture closeups
- density details
- length guide
- care instructions
- estimated delivery times
- reviews
- related products
- FAQ dropdown
- “Complete the look” recommendations

CHECKOUT EXPERIENCE:
- Smooth and premium
- Minimal distractions
- Apple Pay
- Klarna/Clearpay
- PayPal
- Guest checkout
- Trust badges
- Abandoned cart recovery

FUNCTIONALITY REQUIREMENTS:
- WhatsApp floating icon
- Live chat support
- Mobile optimized
- Fast loading
- SEO optimized
- Email marketing integration
- TikTok pixel
- Meta pixel
- Analytics dashboard
- Wishlist feature
- Reviews integration
- Bundles and upsells
- Inventory management
- Discount code support
- Loyalty/rewards program
- Affiliate/referral system
- Currency converter
- International shipping support

BRAND TONE:
Warm, refined, community-driven, confident, soft luxury.

The website should feel like:
“A luxury beauty brand designed by someone who genuinely understands textured hair and the women wearing it.”

Avoid generic stock aesthetics.
Everything should feel intentional, editorial, emotionally warm, and premium.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e0339a7d-cba2-412a-8ace-f937aa68448b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and Bun.

```powershell
git clone https://github.com/stephenhaleem/melanv-e-bloom.git
Set-Location melanv-e-bloom
bun install
Copy-Item .env.example .env.local
bun run dev
```

Set the values from `.env.example` in `.env.local` for local development and in the deployment provider’s environment settings for production. `.env.local` is ignored by Git. The shop and cart use the live Shopify catalog; product reviews use the existing Supabase project; newsletter, contact, and collaboration forms use Klaviyo and Formspree.
