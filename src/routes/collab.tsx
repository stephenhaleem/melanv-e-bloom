import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";
import { z } from "zod";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/collab")({
  head: () => ({
    meta: [
      { title: "Collab with MELANVÉE — Creator & Brand Partnerships" },
      {
        name: "description",
        content:
          "Apply to collaborate with Melanvée. Creators, stylists, brands and muses — we'd love to hear from you.",
      },
      { property: "og:title", content: "Collab with MELANVÉE" },
      {
        property: "og:description",
        content: "Creator, stylist and brand partnerships with Melanvée.",
      },
    ],
  }),
  component: CollabPage,
});

const Schema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  instagram: z.string().trim().min(1).max(80),
  tiktok: z.string().trim().max(80).optional().or(z.literal("")),
  followers: z.string().min(1).max(40),
  location: z.string().trim().min(1).max(80),
  type: z.string().min(1),
  pitch: z.string().trim().min(20).max(1200),
});

function CollabPage() {
  const { text } = useSiteContent();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = Schema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setError(null);
    setSending(true);
    try {
      const formId = import.meta.env.VITE_FORMSPREE_COLLAB_ID;
      if (!formId) throw new Error("Missing VITE_FORMSPREE_COLLAB_ID.");
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (!response.ok) throw new Error(`Collaboration submission failed: ${response.status}`);
      form.reset();
      setSent(true);
    } catch (submissionError) {
      console.error("[collab] Form submission failed:", submissionError);
      setError(
        "We couldn’t submit your application. Please try again or email customercare@melanvee.com.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <SiteLayout>
      <section className="bg-cream py-20 md:py-28">
        <div className="container-luxe max-w-3xl mx-auto text-center space-y-5">
          <div className="eyebrow">{text("collab.eyebrow", "Partnerships")}</div>
          <h1 className="font-serif text-5xl md:text-6xl text-espresso text-balance">
            {text("collab.title", "Let's make something quietly loud.")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {text(
              "collab.description",
              "Creators, hair stylists, salons and complementary brands — we partner with people who share our taste for softness, realism and intention. Tell us about you.",
            )}
          </p>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="max-w-2xl mx-auto">
          {sent ? (
            <div className="bg-cocoa text-cream p-12 text-center space-y-4">
              <div className="eyebrow text-blush">{text("collab.success.eyebrow", "Received")}</div>
              <h2 className="font-serif text-3xl">
                {text("collab.success.title", "Thank you — we'll be in touch.")}
              </h2>
              <p className="text-cream/80 text-sm">
                {text(
                  "collab.success.description",
                  "Our partnerships team reviews every application personally. Expect a reply within 5–7 business days.",
                )}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(event) => void onSubmit(event)}
              className="space-y-5 bg-ivory border border-border p-8 md:p-10"
            >
              <h2 className="font-serif text-2xl text-espresso">
                {text("collab.form.title", "Collaboration application")}
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Full name" name="fullName" />
                <Field label="Email" name="email" type="email" />
                <Field label="Instagram handle" name="instagram" placeholder="@yourhandle" />
                <Field
                  label="TikTok handle (optional)"
                  name="tiktok"
                  required={false}
                  placeholder="@yourhandle"
                />
                <Field label="Total following" name="followers" placeholder="e.g. 25k combined" />
                <Field label="Location" name="location" placeholder="City, Country" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.7rem] tracking-[0.25em] uppercase text-cocoa">
                  Collaboration type
                </label>
                <select
                  name="type"
                  required
                  className="w-full bg-cream/40 border border-border px-4 py-3 text-sm focus:outline-none focus:border-cocoa"
                >
                  <option value="">Select an option</option>
                  <option>Content creator / UGC</option>
                  <option>Brand ambassador</option>
                  <option>Stylist / salon partnership</option>
                  <option>Affiliate programme</option>
                  <option>Brand x brand collaboration</option>
                  <option>Press / editorial</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.7rem] tracking-[0.25em] uppercase text-cocoa">
                  Why Melanvée?
                </label>
                <textarea
                  name="pitch"
                  required
                  rows={6}
                  maxLength={1200}
                  placeholder="Tell us a little about you, your audience and what you'd love to create with us."
                  className="w-full bg-cream/40 border border-border px-4 py-3 text-sm focus:outline-none focus:border-cocoa"
                />
              </div>

              {error && <div className="text-sm text-destructive">{error}</div>}

              <button
                disabled={sending}
                className="w-full bg-cocoa text-cream py-4 text-[0.72rem] tracking-[0.28em] uppercase hover:bg-espresso transition disabled:opacity-50"
              >
                {sending ? "Submitting…" : "Submit application"}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Or email us directly at{" "}
                <a
                  className="border-b border-cocoa text-cocoa"
                  href="mailto:customercare@melanvee.com"
                >
                  customercare@melanvee.com
                </a>
              </p>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-[0.7rem] tracking-[0.25em] uppercase text-cocoa">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={255}
        className="w-full bg-cream/40 border border-border px-4 py-3 text-sm focus:outline-none focus:border-cocoa"
      />
    </div>
  );
}
