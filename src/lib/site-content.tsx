import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import homeHero from "@/assets/3AAB18E63E27A2827D03-IMG_7567.png";
import founderPortrait from "@/assets/founder.jpg";
import textureCloseup from "@/assets/texture-closeup.jpg";
import customer1 from "@/assets/ugc-1.jpg";
import customer2 from "@/assets/ugc-2.jpg";
import customer3 from "@/assets/ugc-3.jpg";
import customer4 from "@/assets/ugc-4.jpg";

export const SITE_COPY_FIELDS = {
  "home.hero.eyebrow": {
    page: "Home",
    label: "Hero eyebrow",
    value: "The Burgundy Collection · No.04",
  },
  "home.hero.title": { page: "Home", label: "Hero heading", value: "Made to feel like yours." },
  "home.hero.description": {
    page: "Home",
    label: "Hero paragraph",
    value:
      "Textured wigs and protective styles, crafted with quiet luxury in mind — designed for the woman who values her time as much as her aesthetic.",
  },
  "home.collections.eyebrow": { page: "Home", label: "Collections eyebrow", value: "Edits" },
  "home.collections.title": {
    page: "Home",
    label: "Collections heading",
    value: "A wardrobe of textures. Yours to live in.",
  },
  "home.shop-spotlight.title": {
    page: "Shop",
    label: "Seasonal spotlight heading",
    value: "The Back to Work Edit.",
  },
  "home.shop-spotlight.description": {
    page: "Shop",
    label: "Seasonal spotlight paragraph",
    value:
      "Sleek, structured, quietly powerful. Three new textures built for boardrooms, school runs and the in-between.",
  },
  "home.value.1.title": { page: "Home", label: "Value 1 heading", value: "Natural-looking blends" },
  "home.value.1.description": {
    page: "Home",
    label: "Value 1 paragraph",
    value: "HD lace and melted hairlines, made to disappear.",
  },
  "home.value.2.title": { page: "Home", label: "Value 2 heading", value: "Lightweight comfort" },
  "home.value.2.description": {
    page: "Home",
    label: "Value 2 paragraph",
    value: "Built airy. Built to wear all day, every day.",
  },
  "home.value.3.title": { page: "Home", label: "Value 3 heading", value: "Beginner friendly" },
  "home.value.3.description": {
    page: "Home",
    label: "Value 3 paragraph",
    value: "Pre-styled, pre-plucked, ready out of the box.",
  },
  "home.value.4.title": { page: "Home", label: "Value 4 heading", value: "Protective styling" },
  "home.value.4.description": {
    page: "Home",
    label: "Value 4 paragraph",
    value: "Looks like your own hair while you grow your own.",
  },
  "home.value.5.title": { page: "Home", label: "Value 5 heading", value: "Effortless installs" },
  "home.value.5.description": {
    page: "Home",
    label: "Value 5 paragraph",
    value: "Glueless. Adjustable. On in under 5 minutes.",
  },
  "home.value.6.title": { page: "Home", label: "Value 6 heading", value: "Premium quality" },
  "home.value.6.description": {
    page: "Home",
    label: "Value 6 paragraph",
    value: "Sourced, wefted and styled in small batches.",
  },
  "home.bestsellers.eyebrow": { page: "Home", label: "Bestsellers eyebrow", value: "Bestsellers" },
  "home.bestsellers.title": {
    page: "Home",
    label: "Bestsellers heading",
    value: "Quietly loved. Constantly re-ordered.",
  },
  "home.why.eyebrow": { page: "Home", label: "Why Melanvée eyebrow", value: "Why Melanvée" },
  "home.why.title": {
    page: "Home",
    label: "Why Melanvée heading",
    value: "Hair that feels like you wrote it.",
  },
  "home.why.description": {
    page: "Home",
    label: "Why Melanvée paragraph",
    value:
      "We make textured hair for the woman who's done compromising. The kind of softness that doesn't announce itself. The kind of realism your sister second-guesses. The kind of confidence that lives in your shoulders before it ever reaches your face.",
  },
  "home.before-after.eyebrow": {
    page: "Home",
    label: "Customer installs eyebrow",
    value: "Real installs",
  },
  "home.before-after.title": {
    page: "Home",
    label: "Customer installs heading",
    value: "Worn by her. Filmed in her bathroom.",
  },
  "home.before-after.description": {
    page: "Home",
    label: "Customer installs paragraph",
    value: "Customer transformations — unedited, unfiltered, on real schedules.",
  },
  "home.community.eyebrow": { page: "Home", label: "Community eyebrow", value: "#MelanveeMuse" },
  "home.community.title": {
    page: "Home",
    label: "Community heading",
    value: "Styled by the Melanvée community.",
  },
  "home.community.description": {
    page: "Home",
    label: "Community paragraph",
    value: "Tag us on Instagram & TikTok for a chance to be featured.",
  },
  "home.testimonial.1.quote": {
    page: "Home",
    label: "Testimonial 1 quote",
    value:
      "I've worn it for three weeks straight and forgot it wasn't mine. The hairline blends into my actual skin.",
  },
  "home.testimonial.1.name": { page: "Home", label: "Testimonial 1 name", value: "Amara O." },
  "home.testimonial.1.style": {
    page: "Home",
    label: "Testimonial 1 style",
    value: 'Cocoa Curl 22"',
  },
  "home.testimonial.2.quote": {
    page: "Home",
    label: "Testimonial 2 quote",
    value: "Genuinely the softest unit I've ever owned. I cried a little. No notes.",
  },
  "home.testimonial.2.name": { page: "Home", label: "Testimonial 2 name", value: "Joelle K." },
  "home.testimonial.2.style": {
    page: "Home",
    label: "Testimonial 2 style",
    value: "Honey Body Wave",
  },
  "home.testimonial.3.quote": {
    page: "Home",
    label: "Testimonial 3 quote",
    value: "Installed it in 4 minutes before a meeting. People kept asking what I changed.",
  },
  "home.testimonial.3.name": { page: "Home", label: "Testimonial 3 name", value: "Bisi A." },
  "home.testimonial.3.style": {
    page: "Home",
    label: "Testimonial 3 style",
    value: "Ivory Straight U-part",
  },
  "home.how-it-works.eyebrow": {
    page: "Home",
    label: "How it works eyebrow",
    value: "How it works",
  },
  "home.how-it-works.title": {
    page: "Home",
    label: "How it works heading",
    value: "Four quiet steps. One you.",
  },
  "home.how-it-works.step1.title": {
    page: "Home",
    label: "Step 1 heading",
    value: "Choose your texture",
  },
  "home.how-it-works.step1.description": {
    page: "Home",
    label: "Step 1 paragraph",
    value: "Match her natural pattern or try something new — coily, curly, wavy, sleek.",
  },
  "home.how-it-works.step2.title": {
    page: "Home",
    label: "Step 2 heading",
    value: "Install effortlessly",
  },
  "home.how-it-works.step2.description": {
    page: "Home",
    label: "Step 2 paragraph",
    value: "Glueless, adjustable, pre-styled. Ready in under five minutes.",
  },
  "home.how-it-works.step3.title": {
    page: "Home",
    label: "Step 3 heading",
    value: "Blend naturally",
  },
  "home.how-it-works.step3.description": {
    page: "Home",
    label: "Step 3 paragraph",
    value: "Melted HD lace and a feather edge that disappears into the skin.",
  },
  "home.how-it-works.step4.title": { page: "Home", label: "Step 4 heading", value: "Go." },
  "home.how-it-works.step4.description": {
    page: "Home",
    label: "Step 4 paragraph",
    value: "Wear her to work, the gym, the wedding, the weekend. Repeat.",
  },
  "home.faq.eyebrow": { page: "Home", label: "FAQ eyebrow", value: "Answered" },
  "home.faq.title": { page: "Home", label: "FAQ heading", value: "The things she always asks." },
  "home.faq.description": {
    page: "Home",
    label: "FAQ paragraph",
    value: "Can't find what you need? Reach our concierge — we usually reply within an hour.",
  },
  "home.faq.q1": {
    page: "Home",
    label: "Homepage FAQ 1 question",
    value: "How long does shipping take?",
  },
  "home.faq.a1": {
    page: "Home",
    label: "Homepage FAQ 1 answer",
    value:
      "UK orders arrive in 2–4 business days. International in 5–10. Express options at checkout.",
  },
  "home.faq.q2": {
    page: "Home",
    label: "Homepage FAQ 2 question",
    value: "Are the wigs beginner-friendly?",
  },
  "home.faq.a2": {
    page: "Home",
    label: "Homepage FAQ 2 answer",
    value:
      "Yes — every wig ships pre-plucked, pre-styled and glueless. Most customers install in under 5 minutes.",
  },
  "home.faq.q3": {
    page: "Home",
    label: "Homepage FAQ 3 question",
    value: "How do I care for my hair?",
  },
  "home.faq.a3": {
    page: "Home",
    label: "Homepage FAQ 3 answer",
    value:
      "Co-wash every 2 weeks, air dry, and store on a satin-lined stand. See our full Hair Care Guide.",
  },
  "home.faq.q4": {
    page: "Home",
    label: "Homepage FAQ 4 question",
    value: "Do you ship internationally?",
  },
  "home.faq.a4": {
    page: "Home",
    label: "Homepage FAQ 4 answer",
    value: "We ship to 42+ countries with tracked, duty-clear delivery.",
  },
  "home.faq.q5": {
    page: "Home",
    label: "Homepage FAQ 5 question",
    value: "Do you offer payment plans?",
  },
  "home.faq.a5": {
    page: "Home",
    label: "Homepage FAQ 5 answer",
    value: "Klarna and Clearpay are available at checkout in supported regions.",
  },
  "home.faq.q6": {
    page: "Home",
    label: "Homepage FAQ 6 question",
    value: "What if my texture doesn't match?",
  },
  "home.faq.a6": {
    page: "Home",
    label: "Homepage FAQ 6 answer",
    value: "We offer free texture matching with our concierge — message us on WhatsApp.",
  },
  "home.newsletter.title": {
    page: "Home",
    label: "Newsletter heading",
    value: "Join the Melanvée community.",
  },
  "home.newsletter.description": {
    page: "Home",
    label: "Newsletter paragraph",
    value: "Restock alerts, early access to drops, and a £15 welcome credit on your first order.",
  },
  "about.eyebrow": { page: "About", label: "Story eyebrow", value: "Our story" },
  "about.title": { page: "About", label: "Story heading", value: "Built quietly. Worn loudly." },
  "about.intro": {
    page: "About",
    label: "Story paragraph",
    value:
      "Melanvée was born in a London bathroom at 2am, with a wig that didn't fit and a woman who decided she'd had enough of pretending it did.",
  },
  "about.founder.eyebrow": {
    page: "About",
    label: "Founder note eyebrow",
    value: "The founder's note",
  },
  "about.founder.title": {
    page: "About",
    label: "Founder note heading",
    value: "A letter from Vée.",
  },
  "about.founder.paragraph1": {
    page: "About",
    label: "Founder letter paragraph 1",
    value:
      "I started Melanvée because I was tired. Tired of bulky installs. Tired of unrealistic hairlines. Tired of pretending heavy meant luxury. I wanted something that felt like my own hair — only easier.",
  },
  "about.founder.paragraph2": {
    page: "About",
    label: "Founder letter paragraph 2",
    value:
      "So I made it. One unit at a time, in small batches, with women I trust. We don't drop weekly. We don't chase trends. We make hair that disappears into you.",
  },
  "about.founder.paragraph3": {
    page: "About",
    label: "Founder letter paragraph 3",
    value:
      "If you wear Melanvée, you are the brand. Thank you for letting us be part of your week.",
  },
  "about.beliefs.eyebrow": { page: "About", label: "Beliefs eyebrow", value: "What we believe" },
  "about.beliefs.title": { page: "About", label: "Beliefs heading", value: "Luxury, quietly." },
  "about.stat.1.value": { page: "About", label: "Brand fact 1 value", value: "2021" },
  "about.stat.1.description": {
    page: "About",
    label: "Brand fact 1 description",
    value: "The year we started, in a London flat.",
  },
  "about.stat.2.value": { page: "About", label: "Brand fact 2 value", value: "42" },
  "about.stat.2.description": {
    page: "About",
    label: "Brand fact 2 description",
    value: "Countries we've shipped to since.",
  },
  "about.stat.3.value": { page: "About", label: "Brand fact 3 value", value: "1 of 1" },
  "about.stat.3.description": {
    page: "About",
    label: "Brand fact 3 description",
    value: "Every unit, finished by hand.",
  },
  "about.belief.1": { page: "About", label: "Belief 1", value: "Comfort is the new luxury." },
  "about.belief.2": {
    page: "About",
    label: "Belief 2",
    value: "Realism is more interesting than perfection.",
  },
  "about.belief.3": {
    page: "About",
    label: "Belief 3",
    value: "Small batches mean better hair, kinder labour.",
  },
  "about.belief.4": { page: "About", label: "Belief 4", value: "The community is the brand." },
  "faq.eyebrow": { page: "FAQ", label: "FAQ eyebrow", value: "Answered" },
  "faq.title": { page: "FAQ", label: "FAQ heading", value: "Every quiet question." },
  "faq.description": {
    page: "FAQ",
    label: "FAQ paragraph",
    value: "Still need a human?",
  },
  "faq.group.1.title": { page: "FAQ", label: "FAQ group 1 heading", value: "Shipping & Delivery" },
  "faq.group.1.q1": {
    page: "FAQ",
    label: "FAQ shipping question 1",
    value: "How long does processing take?",
  },
  "faq.group.1.a1": {
    page: "FAQ",
    label: "FAQ shipping answer 1",
    value:
      "Orders are processed within 1–2 business days. Pre-orders ship as stated on the product page.",
  },
  "faq.group.1.q2": {
    page: "FAQ",
    label: "FAQ shipping question 2",
    value: "Do you ship internationally?",
  },
  "faq.group.1.a2": {
    page: "FAQ",
    label: "FAQ shipping answer 2",
    value: "Yes — we ship to 42+ countries, fully tracked and duty-clear where possible.",
  },
  "faq.group.1.q3": {
    page: "FAQ",
    label: "FAQ shipping question 3",
    value: "When will my order arrive?",
  },
  "faq.group.1.a3": {
    page: "FAQ",
    label: "FAQ shipping answer 3",
    value: "UK: 2–4 business days. EU: 4–7. North America: 5–8. Rest of world: 7–10.",
  },
  "faq.group.1.q4": { page: "FAQ", label: "FAQ shipping question 4", value: "Is shipping free?" },
  "faq.group.1.a4": {
    page: "FAQ",
    label: "FAQ shipping answer 4",
    value: "Complimentary shipping on UK orders over £100 and international orders over £200.",
  },
  "faq.group.2.title": { page: "FAQ", label: "FAQ group 2 heading", value: "Hair Care" },
  "faq.group.2.q1": {
    page: "FAQ",
    label: "FAQ hair care question 1",
    value: "How often should I wash my unit?",
  },
  "faq.group.2.a1": {
    page: "FAQ",
    label: "FAQ hair care answer 1",
    value: "Co-wash every 2 weeks for daily wear. Deep condition monthly.",
  },
  "faq.group.2.q2": { page: "FAQ", label: "FAQ hair care question 2", value: "Can I use heat?" },
  "faq.group.2.a2": {
    page: "FAQ",
    label: "FAQ hair care answer 2",
    value: "Yes — we recommend 150°C max with heat protectant. All units are heat-friendly.",
  },
  "faq.group.2.q3": {
    page: "FAQ",
    label: "FAQ hair care question 3",
    value: "How do I store my wig?",
  },
  "faq.group.2.a3": {
    page: "FAQ",
    label: "FAQ hair care answer 3",
    value: "On a satin-lined mannequin stand or in the original silk pouch. Avoid sunlight.",
  },
  "faq.group.2.q4": {
    page: "FAQ",
    label: "FAQ hair care question 4",
    value: "How long will it last?",
  },
  "faq.group.2.a4": {
    page: "FAQ",
    label: "FAQ hair care answer 4",
    value: "With proper care, 12–24 months of regular wear.",
  },
  "faq.group.3.title": { page: "FAQ", label: "FAQ group 3 heading", value: "Returns & Exchanges" },
  "faq.group.3.q1": {
    page: "FAQ",
    label: "FAQ returns question",
    value: "What is your return policy?",
  },
  "faq.group.3.a1": {
    page: "FAQ",
    label: "FAQ returns answer",
    value:
      "Unworn, unaltered units in original packaging may be returned within 14 days for store credit.",
  },
  "faq.group.3.q2": {
    page: "FAQ",
    label: "FAQ exchanges question",
    value: "Can I exchange for a different length?",
  },
  "faq.group.3.a2": {
    page: "FAQ",
    label: "FAQ exchanges answer",
    value: "Yes — within 14 days, subject to availability. Concierge will arrange.",
  },
  "faq.group.4.title": { page: "FAQ", label: "FAQ group 4 heading", value: "Payment & Plans" },
  "faq.group.4.q1": {
    page: "FAQ",
    label: "FAQ payment question",
    value: "What payment methods do you accept?",
  },
  "faq.group.4.a1": {
    page: "FAQ",
    label: "FAQ payment answer",
    value: "Visa, Mastercard, Amex, Apple Pay, Google Pay, PayPal, Klarna, Clearpay.",
  },
  "faq.group.4.q2": {
    page: "FAQ",
    label: "FAQ payment plans question",
    value: "Do you offer pay-in-4?",
  },
  "faq.group.4.a2": {
    page: "FAQ",
    label: "FAQ payment plans answer",
    value: "Yes — Klarna and Clearpay are available at checkout in supported regions.",
  },
  "faq.group.5.title": { page: "FAQ", label: "FAQ group 5 heading", value: "Texture & Beginners" },
  "faq.group.5.q1": {
    page: "FAQ",
    label: "FAQ texture question",
    value: "I'm a beginner — which wig should I start with?",
  },
  "faq.group.5.a1": {
    page: "FAQ",
    label: "FAQ texture answer",
    value: "Our glueless U-part and pre-styled curl units are designed for first installs.",
  },
  "faq.group.5.q2": {
    page: "FAQ",
    label: "FAQ texture match question",
    value: "Can you help me match my natural texture?",
  },
  "faq.group.5.a2": {
    page: "FAQ",
    label: "FAQ texture match answer",
    value: "Yes, free of charge. Message us a clear photo on WhatsApp and our team will recommend.",
  },
  "hair-care.eyebrow": { page: "Hair care", label: "Hair care eyebrow", value: "The ritual" },
  "hair-care.title": {
    page: "Hair care",
    label: "Hair care heading",
    value: "Care like she's yours. Because she is.",
  },
  "hair-care.description": {
    page: "Hair care",
    label: "Hair care paragraph",
    value:
      "A simple, soft care ritual to keep your unit feeling like the day she arrived — for years, not weeks.",
  },
  "hair-care.install.eyebrow": {
    page: "Hair care",
    label: "Install eyebrow",
    value: "Beginner install",
  },
  "hair-care.install.title": {
    page: "Hair care",
    label: "Install heading",
    value: "Five minutes. No glue. No tears.",
  },
  "hair-care.tip.1.title": { page: "Hair care", label: "Care tip 1 heading", value: "Wash gently" },
  "hair-care.tip.1.description": {
    page: "Hair care",
    label: "Care tip 1 paragraph",
    value:
      "Co-wash every 2 weeks with sulphate-free product. Squeeze, don't scrub. Cool water from root to tip.",
  },
  "hair-care.tip.2.title": {
    page: "Hair care",
    label: "Care tip 2 heading",
    value: "Detangle with care",
  },
  "hair-care.tip.2.description": {
    page: "Hair care",
    label: "Care tip 2 paragraph",
    value:
      "Always detangle from ends upward, using a wide-tooth comb or fingers. Mist with a leave-in first.",
  },
  "hair-care.tip.3.title": {
    page: "Hair care",
    label: "Care tip 3 heading",
    value: "Air dry first",
  },
  "hair-care.tip.3.description": {
    page: "Hair care",
    label: "Care tip 3 paragraph",
    value:
      "Let her air-dry on a mannequin stand. If short on time, low cool airflow only, never direct heat on damp hair.",
  },
  "hair-care.tip.4.title": {
    page: "Hair care",
    label: "Care tip 4 heading",
    value: "Heat with respect",
  },
  "hair-care.tip.4.description": {
    page: "Hair care",
    label: "Care tip 4 paragraph",
    value:
      "150°C max. Always heat-protect. Curly textures stay curlier longer when you skip the iron entirely.",
  },
  "hair-care.tip.5.title": {
    page: "Hair care",
    label: "Care tip 5 heading",
    value: "Store quietly",
  },
  "hair-care.tip.5.description": {
    page: "Hair care",
    label: "Care tip 5 paragraph",
    value:
      "On a satin-lined stand or in the silk pouch she arrived in. Out of sunlight. Away from radiators.",
  },
  "hair-care.tip.6.title": {
    page: "Hair care",
    label: "Care tip 6 heading",
    value: "Refresh, don't redo",
  },
  "hair-care.tip.6.description": {
    page: "Hair care",
    label: "Care tip 6 paragraph",
    value:
      "A light mist of water + leave-in revives most styles. Re-installing daily ages her faster than wear ever will.",
  },
  "hair-care.install.step1": {
    page: "Hair care",
    label: "Install step 1",
    value: "Braid your natural hair down and slip on a matching wig cap.",
  },
  "hair-care.install.step2": {
    page: "Hair care",
    label: "Install step 2",
    value: "Try the unit on — adjust the elastic band at the nape.",
  },
  "hair-care.install.step3": {
    page: "Hair care",
    label: "Install step 3",
    value: "Place the lace along your hairline; press the band into place.",
  },
  "hair-care.install.step4": {
    page: "Hair care",
    label: "Install step 4",
    value: "Use a light setting spray along the hairline; let dry 30 seconds.",
  },
  "hair-care.install.step5": {
    page: "Hair care",
    label: "Install step 5",
    value: "Part, style, go. That's it.",
  },
  "contact.eyebrow": { page: "Contact", label: "Contact eyebrow", value: "Concierge" },
  "contact.title": { page: "Contact", label: "Contact heading", value: "We're here, softly." },
  "contact.description": {
    page: "Contact",
    label: "Contact paragraph",
    value:
      "Texture matching, install help, returns, or just hello — our concierge replies within the hour, Mon–Sat.",
  },
  "contact.matching.eyebrow": {
    page: "Contact",
    label: "Texture matching eyebrow",
    value: "Texture matching",
  },
  "contact.matching.title": {
    page: "Contact",
    label: "Texture matching heading",
    value: "Not sure what suits you?",
  },
  "contact.matching.description": {
    page: "Contact",
    label: "Texture matching paragraph",
    value:
      "Send us a clear photo of your natural hair — we'll recommend the closest match from the house, free of charge.",
  },
  "contact.form.title": { page: "Contact", label: "Contact form heading", value: "Send a note" },
  "contact.reply-time": {
    page: "Contact",
    label: "Contact reply time",
    value: "Within 1 hour · Mon–Sat 9–6 GMT",
  },
  "contact.success": {
    page: "Contact",
    label: "Form success message",
    value: "Your message has been sent. We’ll be in touch shortly.",
  },
  "contact.failure": {
    page: "Contact",
    label: "Form failure message",
    value: "We couldn’t send your message. Please email customercare@melanvee.com.",
  },
  "collab.eyebrow": {
    page: "Collaborations",
    label: "Partnerships eyebrow",
    value: "Partnerships",
  },
  "collab.title": {
    page: "Collaborations",
    label: "Partnerships heading",
    value: "Let's make something quietly loud.",
  },
  "collab.description": {
    page: "Collaborations",
    label: "Partnerships paragraph",
    value:
      "Creators, hair stylists, salons and complementary brands — we partner with people who share our taste for softness, realism and intention. Tell us about you.",
  },
  "collab.form.title": {
    page: "Collaborations",
    label: "Application heading",
    value: "Collaboration application",
  },
  "collab.success.eyebrow": { page: "Collaborations", label: "Success eyebrow", value: "Received" },
  "collab.success.title": {
    page: "Collaborations",
    label: "Success heading",
    value: "Thank you — we'll be in touch.",
  },
  "collab.success.description": {
    page: "Collaborations",
    label: "Success paragraph",
    value:
      "Our partnerships team reviews every application personally. Expect a reply within 5–7 business days.",
  },
  "policies.eyebrow": { page: "Policies", label: "Policies eyebrow", value: "The details" },
  "policies.title": { page: "Policies", label: "Policies heading", value: "Policies" },
  "policies.description": {
    page: "Policies",
    label: "Policies paragraph",
    value: "Everything you need to know about ordering with MELANVÉE.",
  },
  "policies.shipping.title": {
    page: "Policies",
    label: "Shipping heading",
    value: "Shipping Policy",
  },
  "policies.shipping.p1": {
    page: "Policies",
    label: "Shipping paragraph 1",
    value: "All MELANVÉE orders are dispatched promptly upon processing.",
  },
  "policies.shipping.li1": {
    page: "Policies",
    label: "Shipping detail 1",
    value:
      "Dispatch is within 24 to 72 hours of your order. Times may vary slightly during busy periods and weekends.",
  },
  "policies.shipping.li2": {
    page: "Policies",
    label: "Shipping detail 2",
    value: "UK and Europe delivery takes 3 to 5 working days after dispatch.",
  },
  "policies.shipping.li3": {
    page: "Policies",
    label: "Shipping detail 3",
    value: "Rest of world delivery takes 3 to 8 working days after dispatch.",
  },
  "policies.shipping.li4": {
    page: "Policies",
    label: "Shipping detail 4",
    value: "Free UK shipping on all orders over £100.",
  },
  "policies.shipping.li5": {
    page: "Policies",
    label: "Shipping detail 5",
    value: "Free international shipping on all orders over £100.",
  },
  "policies.shipping.p2": {
    page: "Policies",
    label: "Shipping paragraph 2",
    value:
      "All orders are tracked. We will email you a tracking link as soon as your order leaves us.",
  },
  "policies.returns.title": { page: "Policies", label: "Returns heading", value: "Returns Policy" },
  "policies.returns.p1": {
    page: "Policies",
    label: "Returns paragraph 1",
    value:
      "Because our wigs are intimate beauty products, we follow strict hygiene rules, but we want you to feel safe ordering.",
  },
  "policies.returns.li1": {
    page: "Policies",
    label: "Returns detail 1",
    value:
      "Returns are accepted within 7 days of delivery on unopened, unworn pieces in their original packaging.",
  },
  "policies.returns.li2": {
    page: "Policies",
    label: "Returns detail 2",
    value:
      "All returns are subject to a quality inspection. Refunds are issued only after the piece passes inspection and shows no sign of wear, washing, styling, dye or alteration.",
  },
  "policies.returns.li3": {
    page: "Policies",
    label: "Returns detail 3",
    value:
      "Once a wig has been worn, installed, washed, dyed or altered, we cannot accept it back for hygiene reasons.",
  },
  "policies.returns.li4": {
    page: "Policies",
    label: "Returns detail 4",
    value:
      "Return shipping is the customer's responsibility, except for damaged or faulty items or if we sent the wrong piece. In those cases, we cover the full cost.",
  },
  "policies.returns.li5": {
    page: "Policies",
    label: "Returns detail 5",
    value:
      "Approved refunds are issued to your original payment method within 5 to 7 working days of our inspection team receiving and approving the return.",
  },
  "policies.returns.p2": {
    page: "Policies",
    label: "Returns paragraph 2",
    value: "To start a return, email hello@melanvee.com with your order number.",
  },
  "policies.exchanges.title": {
    page: "Policies",
    label: "Exchanges heading",
    value: "Exchange Policy",
  },
  "policies.exchanges.p1": {
    page: "Policies",
    label: "Exchanges paragraph",
    value: "Wrong texture? Wrong length? We will help you find the right one.",
  },
  "policies.exchanges.li1": {
    page: "Policies",
    label: "Exchanges detail 1",
    value:
      "Exchanges are accepted within 7 days of delivery on unopened, unworn pieces in their original packaging.",
  },
  "policies.exchanges.li2": {
    page: "Policies",
    label: "Exchanges detail 2",
    value: "You can exchange for a different texture or length, or take store credit.",
  },
  "policies.exchanges.li3": {
    page: "Policies",
    label: "Exchanges detail 3",
    value: "The customer covers return shipping. We cover the cost of sending the new piece.",
  },
  "policies.exchanges.li4": {
    page: "Policies",
    label: "Exchanges detail 4",
    value:
      "If the new piece is more expensive, you will be invoiced for the difference. If it is cheaper, we will refund the difference.",
  },
  "policies.privacy.title": { page: "Policies", label: "Privacy heading", value: "Privacy Policy" },
  "policies.privacy.p1": {
    page: "Policies",
    label: "Privacy paragraph 1",
    value:
      "We collect only what we need to fulfil your order: your name, email, delivery address and payment details. We never sell your data.",
  },
  "policies.privacy.p2": {
    page: "Policies",
    label: "Privacy paragraph 2",
    value:
      "If you sign up to our mailing list, you can unsubscribe at any time using the link in any email we send.",
  },
  "policies.terms.title": { page: "Policies", label: "Terms heading", value: "Terms of Service" },
  "policies.terms.p1": {
    page: "Policies",
    label: "Terms paragraph 1",
    value: "By placing an order with MELANVÉE, you agree to these terms.",
  },
  "policies.terms.p2": {
    page: "Policies",
    label: "Terms paragraph 2",
    value:
      "All prices are listed and charged in GBP at checkout. Your display currency may vary, but payment will always be processed in GBP.",
  },
  "policies.terms.p3": {
    page: "Policies",
    label: "Terms paragraph 3",
    value:
      "Our product images are professionally styled to showcase each texture at its best. As with all natural human hair, slight variations in shade or curl pattern between batches are completely normal and do not affect the quality of your hair.",
  },
  "shop.eyebrow": { page: "Shop", label: "Shop eyebrow", value: "The Collection" },
  "shop.title": { page: "Shop", label: "Shop heading", value: "The house, in full." },
  "shop.description": {
    page: "Shop",
    label: "Shop paragraph",
    value: "Hand-finished, small batch, worn by women who don't repeat themselves.",
  },
  "shop.spotlight.eyebrow": {
    page: "Shop",
    label: "Spotlight eyebrow",
    value: "Autumn Drop · No.05",
  },
  "shop.consultation.eyebrow": { page: "Shop", label: "Consultation eyebrow", value: "Not sure?" },
  "shop.consultation.title": {
    page: "Shop",
    label: "Consultation heading",
    value: "A texture match, on us.",
  },
  "product.not-found.eyebrow": {
    page: "Shop",
    label: "Unavailable product eyebrow",
    value: "Not found",
  },
  "product.not-found.title": {
    page: "Shop",
    label: "Unavailable product heading",
    value: "This piece has moved.",
  },
  "product.customization.note": {
    page: "Shop",
    label: "Product customization paragraph",
    value: "Looking to customize your order? Message hello@melanvee.com.",
  },
  "product.related.eyebrow": {
    page: "Shop",
    label: "Related products eyebrow",
    value: "Pairs with",
  },
  "product.related.title": {
    page: "Shop",
    label: "Related products heading",
    value: "More from the collection",
  },
  "product.related.link": { page: "Shop", label: "Related products link", value: "View all" },
  "about.founder.signature": { page: "About", label: "Founder sign-off", value: "— Vée, founder" },
  "faq.concierge.link": {
    page: "FAQ",
    label: "Concierge link label",
    value: "Talk to the concierge",
  },
  "footer.shop.title": { page: "Footer", label: "Shop links heading", value: "Shop" },
  "footer.shop.1": { page: "Footer", label: "Shop link 1", value: "Back to Work" },
  "footer.shop.2": { page: "Footer", label: "Shop link 2", value: "Signature Wigs" },
  "footer.shop.3": { page: "Footer", label: "Shop link 3", value: "Summer Edit" },
  "footer.shop.4": { page: "Footer", label: "Shop link 4", value: "Crochet" },
  "footer.shop.5": { page: "Footer", label: "Shop link 5", value: "Hot Tools" },
  "footer.care.title": { page: "Footer", label: "Care links heading", value: "Care" },
  "footer.care.1": { page: "Footer", label: "Care link 1", value: "Hair Care Guide" },
  "footer.care.2": { page: "Footer", label: "Care link 2", value: "FAQ" },
  "footer.care.3": { page: "Footer", label: "Care link 3", value: "Track Order" },
  "footer.care.4": { page: "Footer", label: "Care link 4", value: "Shipping Policy" },
  "footer.care.5": { page: "Footer", label: "Care link 5", value: "Returns Policy" },
  "footer.care.6": { page: "Footer", label: "Care link 6", value: "Exchange Policy" },
  "footer.house.title": { page: "Footer", label: "House links heading", value: "House" },
  "footer.house.1": { page: "Footer", label: "House link 1", value: "About Us" },
  "footer.house.2": { page: "Footer", label: "House link 2", value: "Collab With Us" },
  "footer.house.3": { page: "Footer", label: "House link 3", value: "Contact" },
  "footer.house.4": { page: "Footer", label: "House link 4", value: "Privacy Policy" },
  "footer.house.5": { page: "Footer", label: "House link 5", value: "Terms of Service" },
  "footer.newsletter.button": { page: "Footer", label: "Newsletter button", value: "Join" },
  "footer.description": {
    page: "Footer",
    label: "Footer paragraph",
    value:
      "Effortless beauty, made to feel like yours. Premium textured hair, designed for the women who wear it.",
  },
  "header.promo.secondary": {
    page: "Header",
    label: "Secondary announcement",
    value: "Worldwide shipping · Klarna available",
  },
  "header.promo.primary": {
    page: "Header",
    label: "Primary announcement",
    value: "Complimentary shipping on orders over £100",
  },
  "nav.home": { page: "Header", label: "Home navigation label", value: "Home" },
  "nav.shop": { page: "Header", label: "Shop navigation label", value: "Shop" },
  "nav.about": { page: "Header", label: "About navigation label", value: "About" },
  "nav.contact": { page: "Header", label: "Contact navigation label", value: "Contact" },
  "nav.collab": { page: "Header", label: "Collaboration navigation label", value: "Collab" },
  "nav.all-products": {
    page: "Header",
    label: "All products navigation label",
    value: "All products",
  },
  "nav.collections": {
    page: "Header",
    label: "Collections navigation label",
    value: "Collections",
  },
  "nav.shop-now": { page: "Header", label: "Shop now navigation label", value: "Shop now" },
  "footer.copyright": {
    page: "Footer",
    label: "Copyright text",
    value: "Melanvée. All rights reserved.",
  },
  "footer.payment.title": {
    page: "Footer",
    label: "Payment methods heading",
    value: "Secure payment methods",
  },
  "footer.payment.description": {
    page: "Footer",
    label: "Payment methods paragraph",
    value: "Choose your preferred way to pay at checkout.",
  },
} as const;

export const SITE_IMAGE_FIELDS = [
  { key: "image.home.hero", page: "Home", label: "Homepage hero", fallback: homeHero },
  {
    key: "image.about.founder",
    page: "About",
    label: "Founder portrait",
    fallback: founderPortrait,
  },
  {
    key: "image.about.texture",
    page: "About",
    label: "About texture image",
    fallback: textureCloseup,
  },
  {
    key: "image.hair-care.texture",
    page: "Hair care",
    label: "Hair care texture image",
    fallback: textureCloseup,
  },
  {
    key: "image.home.texture",
    page: "Home",
    label: "Homepage texture image",
    fallback: textureCloseup,
  },
  { key: "image.home.customer.1", page: "Home", label: "Customer photo 1", fallback: customer1 },
  { key: "image.home.customer.2", page: "Home", label: "Customer photo 2", fallback: customer2 },
  { key: "image.home.customer.3", page: "Home", label: "Customer photo 3", fallback: customer3 },
  { key: "image.home.customer.4", page: "Home", label: "Customer photo 4", fallback: customer4 },
] as const;

type SiteContentValue = {
  values: Record<string, string>;
  text: (key: string, fallback?: string) => string;
  image: (key: string, fallback: string) => string;
  refresh: () => Promise<void>;
};

const SiteContentContext = createContext<SiteContentValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const refresh = async () => {
    const { data, error } = await supabase.from("site_copy").select("key, value");
    if (error) {
      console.error("[site-content] Could not load published content:", error.message);
      return;
    }
    setValues(Object.fromEntries(data.map(({ key, value }) => [key, value])));
  };

  useEffect(() => {
    void refresh();
  }, []);

  const value = useMemo<SiteContentValue>(
    () => ({
      values,
      text: (key, fallback = "") => values[key] ?? fallback,
      image: (key, fallback) => values[key] || fallback,
      refresh,
    }),
    [values],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

// Shared hook for components outside this provider module.
// eslint-disable-next-line react-refresh/only-export-components
export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) throw new Error("useSiteContent must be used within SiteContentProvider.");
  return context;
}
