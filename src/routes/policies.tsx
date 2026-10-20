import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Policies — MELANVÉE" },
      {
        name: "description",
        content: "MELANVÉE shipping, returns, exchanges, privacy and terms of service policies.",
      },
      { property: "og:title", content: "Policies — MELANVÉE" },
    ],
  }),
  component: PoliciesPage,
});

function PoliciesPage() {
  return (
    <SiteLayout>
      <section className="container-luxe py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-4xl space-y-4 border-b border-cocoa/20 pb-10 md:mb-16 md:pb-12">
          <div className="eyebrow">The details</div>
          <h1 className="font-serif text-4xl text-espresso text-balance md:text-5xl">Policies</h1>
          <p className="max-w-2xl text-muted-foreground">
            Everything you need to know about ordering with MELANVÉE.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-12 md:space-y-14">
          <PolicySection id="shipping" title="Shipping Policy">
            <p>All MELANVÉE orders are dispatched promptly upon processing.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Dispatch is within 24 to 72 hours of your order. Times may vary slightly during busy
                periods and weekends.
              </li>
              <li>UK and Europe delivery takes 3 to 5 working days after dispatch.</li>
              <li>Rest of world delivery takes 3 to 8 working days after dispatch.</li>
              <li>Free UK shipping on all orders over £100.</li>
              <li>Free international shipping on all orders over £100.</li>
            </ul>
            <p>
              All orders are tracked. We will email you a tracking link as soon as your order leaves
              us.
            </p>
          </PolicySection>

          <PolicySection id="returns" title="Returns Policy">
            <p>
              Because our wigs are intimate beauty products, we follow strict hygiene rules, but we
              want you to feel safe ordering.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Returns are accepted within 7 days of delivery on unopened, unworn pieces in their
                original packaging.
              </li>
              <li>
                All returns are subject to a quality inspection. Refunds are issued only after the
                piece passes inspection and shows no sign of wear, washing, styling, dye or
                alteration.
              </li>
              <li>
                Once a wig has been worn, installed, washed, dyed or altered, we cannot accept it
                back for hygiene reasons.
              </li>
              <li>
                Return shipping is the customer&apos;s responsibility, except for damaged or faulty
                items or if we sent the wrong piece. In those cases, we cover the full cost.
              </li>
              <li>
                Approved refunds are issued to your original payment method within 5 to 7 working
                days of our inspection team receiving and approving the return.
              </li>
            </ul>
            <p>
              To start a return, email{" "}
              <a
                className="text-cocoa underline underline-offset-4"
                href="mailto:hello@melanvee.com"
              >
                hello@melanvee.com
              </a>{" "}
              with your order number.
            </p>
          </PolicySection>

          <PolicySection id="exchanges" title="Exchange Policy">
            <p>Wrong texture? Wrong length? We will help you find the right one.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Exchanges are accepted within 7 days of delivery on unopened, unworn pieces in their
                original packaging.
              </li>
              <li>You can exchange for a different texture or length, or take store credit.</li>
              <li>
                The customer covers return shipping. We cover the cost of sending the new piece.
              </li>
              <li>
                If the new piece is more expensive, you will be invoiced for the difference. If it
                is cheaper, we will refund the difference.
              </li>
            </ul>
          </PolicySection>

          <PolicySection id="privacy" title="Privacy Policy">
            <p>
              We collect only what we need to fulfil your order: your name, email, delivery address
              and payment details. We never sell your data.
            </p>
            <p>
              If you sign up to our mailing list, you can unsubscribe at any time using the link in
              any email we send.
            </p>
          </PolicySection>

          <PolicySection id="terms" title="Terms of Service">
            <p>By placing an order with MELANVÉE, you agree to these terms.</p>
            <p>
              All prices are listed and charged in GBP at checkout. Your display currency may vary,
              but payment will always be processed in GBP.
            </p>
            <p>
              Our product images are professionally styled to showcase each texture at its best. As
              with all natural human hair, slight variations in shade or curl pattern between
              batches are completely normal and do not affect the quality of your hair.
            </p>
          </PolicySection>
        </div>
      </section>
    </SiteLayout>
  );
}

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4 text-sm leading-7 text-muted-foreground">
      <h2 className="border-b border-cocoa/20 pb-3 font-serif text-2xl text-espresso">{title}</h2>
      {children}
    </section>
  );
}
