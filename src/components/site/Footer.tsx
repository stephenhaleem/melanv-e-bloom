import { Link } from "@tanstack/react-router";
import { Instagram, Music2, ShieldCheck, Youtube } from "lucide-react";
import { NewsletterSignup } from "./NewsletterSignup";
import { COLLAB_URL } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export function Footer() {
  const { text } = useSiteContent();
  return (
    <>
      <section
        aria-label="Accepted payment methods"
        className="mt-32 border-y border-cocoa/10 bg-cream/60"
      >
        <div className="container-luxe flex flex-col items-center gap-6 py-8 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} aria-hidden="true" className="shrink-0 text-cocoa" />
            <div>
              <h2 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-espresso">
                {text("footer.payment.title", "Secure payment methods")}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {text(
                  "footer.payment.description",
                  "Choose your preferred way to pay at checkout.",
                )}
              </p>
            </div>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-cocoa md:justify-end">
            {[
              "Apple Pay",
              "Google Pay",
              "VISA",
              "Mastercard",
              "Amex",
              "PayPal",
              "Klarna",
              "Clearpay",
            ].map((method) => (
              <li
                key={method}
                className="whitespace-nowrap rounded border border-cocoa/10 bg-white/80 px-2.5 py-1.5 text-xs tracking-tight"
                aria-label={method}
              >
                {method}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <footer className="bg-cocoa text-cream">
        <div className="container-luxe py-20 grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2 space-y-5">
            <div className="font-serif text-3xl tracking-[0.28em]">MELANVÉE</div>
            <p className="text-cream/70 max-w-sm text-sm leading-relaxed">
              {text(
                "footer.description",
                "Effortless beauty, made to feel like yours. Premium textured hair, designed for the women who wear it.",
              )}
            </p>
            <a
              href="mailto:customercare@melanvee.com"
              className="block text-sm text-cream/85 hover:text-blush"
            >
              customercare@melanvee.com
            </a>
            <NewsletterSignup
              className="flex flex-wrap gap-2 max-w-sm pt-2"
              inputClassName="flex-1 min-w-0 bg-transparent border-b border-cream/30 py-2 px-1 text-sm placeholder:text-cream/40 focus:outline-none focus:border-cream"
              buttonClassName="text-[0.7rem] tracking-[0.25em] uppercase border-b border-cream pb-2 hover:text-blush transition disabled:opacity-50"
              buttonLabel={text("footer.newsletter.button", "Join")}
            />
          </div>

          <FooterCol
            title={text("footer.shop.title", "Shop")}
            labels={[
              "footer.shop.1",
              "footer.shop.2",
              "footer.shop.3",
              "footer.shop.4",
              "footer.shop.5",
            ]}
            links={[
              ["Back to Work", "/shop"],
              ["Signature Wigs", "/shop"],
              ["Summer Edit", "/shop"],
              ["Crochet", "/shop"],
              ["Hot Tools", "/shop"],
            ]}
          />

          <FooterCol
            title={text("footer.care.title", "Care")}
            labels={[
              "footer.care.1",
              "footer.care.2",
              "footer.care.3",
              "footer.care.4",
              "footer.care.5",
              "footer.care.6",
            ]}
            links={[
              ["Hair Care Guide", "/hair-care"],
              ["FAQ", "/faq"],
              ["Track Order", "/contact"],
              ["Shipping Policy", "/policies#shipping"],
              ["Returns Policy", "/policies#returns"],
              ["Exchange Policy", "/policies#exchanges"],
            ]}
          />

          <FooterCol
            title={text("footer.house.title", "House")}
            labels={[
              "footer.house.1",
              "footer.house.2",
              "footer.house.3",
              "footer.house.4",
              "footer.house.5",
            ]}
            links={[
              ["About Us", "/about"],
              ["Collab With Us", COLLAB_URL],
              ["Contact", "/contact"],
              ["Privacy Policy", "/policies#privacy"],
              ["Terms of Service", "/policies#terms"],
            ]}
          />
        </div>

        <div className="border-t border-cream/15">
          <div className="container-luxe py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[0.7rem] tracking-[0.2em] uppercase text-cream/60">
            <div>
              © {new Date().getFullYear()}{" "}
              {text("footer.copyright", "Melanvée. All rights reserved.")}
            </div>
            <div className="flex gap-5 text-cream">
              <a
                href="https://instagram.com/melanveeofficial"
                aria-label="Instagram"
                className="hover:text-blush"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://tiktok.com/@melanvee"
                aria-label="TikTok"
                className="hover:text-blush"
              >
                <Music2 size={16} />
              </a>
              <a
                href="https://youtube.com/@melanvee"
                aria-label="YouTube"
                className="hover:text-blush"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterCol({
  title,
  links,
  labels,
}: {
  title: string;
  links: [string, string][];
  labels: string[];
}) {
  const { text } = useSiteContent();
  return (
    <div className="space-y-4">
      <h4 className="text-[0.7rem] tracking-[0.28em] uppercase text-cream/60 font-sans">{title}</h4>
      <ul className="space-y-2.5 text-sm text-cream/85">
        {links.map(([label, href], index) => {
          const visibleLabel = text(labels[index] ?? "", label);
          return (
            <li key={label}>
              {href.startsWith("https://") ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blush transition-colors"
                >
                  {visibleLabel}
                </a>
              ) : (
                <Link to={href} className="hover:text-blush transition-colors">
                  {visibleLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
