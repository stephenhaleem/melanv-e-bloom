import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Mail, MessageCircle, Instagram, Clock } from "lucide-react";
import { useState } from "react";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MELANVÉE" },
      {
        name: "description",
        content: "Reach MELANVÉE. WhatsApp us, email us, or send a message — we read every one.",
      },
      { property: "og:title", content: "Contact MELANVÉE" },
      {
        property: "og:description",
        content: "Reach MELANVÉE. WhatsApp us, email us, or send a message — we read every one.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { text } = useSiteContent();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formId = import.meta.env.VITE_FORMSPREE_CONTACT_ID;
    setStatus("sending");

    try {
      if (!formId) throw new Error("Missing VITE_FORMSPREE_CONTACT_ID.");
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(`Contact form submission failed: ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error("[contact] Form submission failed:", error);
      setStatus("error");
    }
  }

  return (
    <SiteLayout>
      <section className="container-luxe py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center space-y-5 mb-16 fade-up">
          <div className="eyebrow">{text("contact.eyebrow", "Concierge")}</div>
          <h1 className="font-serif text-5xl md:text-6xl text-espresso text-balance">
            {text("contact.title", "We're here, softly.")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {text(
              "contact.description",
              "Texture matching, install help, returns, or just hello — our concierge replies within the hour, Mon–Sat.",
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-cream p-8 space-y-5">
              <ContactRow icon={Mail} title="Email" value="customercare@melanvee.com" />
              <ContactRow icon={MessageCircle} title="WhatsApp" value="+44 7760 317 678" />
              <ContactRow icon={Instagram} title="Instagram" value="@melanvee" />

              <ContactRow
                icon={Clock}
                title="Reply time"
                value={text("contact.reply-time", "Within 1 hour · Mon–Sat 9–6 GMT")}
              />
            </div>
            <div className="bg-cocoa text-cream p-8 space-y-3">
              <div className="eyebrow text-blush">
                {text("contact.matching.eyebrow", "Texture matching")}
              </div>
              <h3 className="font-serif text-2xl">
                {text("contact.matching.title", "Not sure what suits you?")}
              </h3>
              <p className="text-cream/80 text-sm">
                {text(
                  "contact.matching.description",
                  "Send us a clear photo of your natural hair — we'll recommend the closest match from the house, free of charge.",
                )}
              </p>
              <a
                href="https://wa.me/447760317678"
                className="inline-block border-b border-cream pb-1 text-[0.72rem] tracking-[0.25em] uppercase mt-2 hover:text-blush hover:border-blush"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          <form
            onSubmit={(event) => void handleSubmit(event)}
            className="space-y-5 bg-ivory border border-border p-8"
          >
            <h2 className="font-serif text-2xl text-espresso">
              {text("contact.form.title", "Send a note")}
            </h2>
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Order number (optional)" name="order" required={false} />
            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="text-[0.7rem] tracking-[0.25em] uppercase text-cocoa"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full bg-cream/40 border border-border px-4 py-3 text-sm focus:outline-none focus:border-cocoa"
              />
            </div>
            {status === "sent" && (
              <p role="status" className="text-sm text-green-800">
                {text("contact.success", "Your message has been sent. We’ll be in touch shortly.")}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-sm text-destructive">
                {text(
                  "contact.failure",
                  "We couldn’t send your message. Please email customercare@melanvee.com.",
                )}
              </p>
            )}
            <button
              disabled={status === "sending"}
              className="w-full bg-cocoa text-cream py-4 text-[0.72rem] tracking-[0.28em] uppercase hover:bg-espresso transition disabled:opacity-50"
            >
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Send another message"
                  : "Send message"}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactRow({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <Icon size={18} strokeWidth={1.3} className="text-cocoa mt-1" />
      <div>
        <div className="text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
          {title}
        </div>
        <div className="text-espresso">{value}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        className="w-full bg-cream/40 border border-border px-4 py-3 text-sm focus:outline-none focus:border-cocoa"
      />
    </div>
  );
}
