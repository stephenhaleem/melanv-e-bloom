import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSiteContent } from "@/lib/site-content";

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
  const { text } = useSiteContent();
  const [activePolicy, setActivePolicy] = useState("shipping");
  const returnsContact = text(
    "policies.returns.p2",
    "To start a return, email hello@melanvee.com with your order number.",
  );
  const returnContactParts = returnsContact.split("hello@melanvee.com");

  useEffect(() => {
    const policyIds = ["shipping", "returns", "exchanges", "privacy", "terms"];
    const syncPolicyFromHash = () => {
      const policy = window.location.hash.slice(1);
      if (policyIds.includes(policy)) setActivePolicy(policy);
    };

    syncPolicyFromHash();
    window.addEventListener("hashchange", syncPolicyFromHash);
    return () => window.removeEventListener("hashchange", syncPolicyFromHash);
  }, []);

  const selectPolicy = (policy: string) => {
    setActivePolicy(policy);
    window.history.replaceState(null, "", `#${policy}`);
  };

  return (
    <SiteLayout>
      <section className="container-luxe py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-4xl space-y-4 border-b border-cocoa/20 pb-10 md:mb-16 md:pb-12">
          <div className="eyebrow">{text("policies.eyebrow", "The details")}</div>
          <h1 className="font-serif text-4xl text-espresso text-balance md:text-5xl">
            {text("policies.title", "Policies")}
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            {text(
              "policies.description",
              "Everything you need to know about ordering with MELANVÉE.",
            )}
          </p>
        </div>

        <Tabs value={activePolicy} onValueChange={selectPolicy} className="mx-auto max-w-4xl">
          <TabsList className="mb-8 grid h-auto w-full grid-cols-2 gap-1 rounded-none border-b border-cocoa/20 bg-transparent p-0 text-muted-foreground sm:grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="shipping" className="rounded-none px-2 py-3">
              Shipping
            </TabsTrigger>
            <TabsTrigger value="returns" className="rounded-none px-2 py-3">
              Returns
            </TabsTrigger>
            <TabsTrigger value="exchanges" className="rounded-none px-2 py-3">
              Exchanges
            </TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-none px-2 py-3">
              Privacy
            </TabsTrigger>
            <TabsTrigger value="terms" className="rounded-none px-2 py-3">
              Terms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shipping">
            <PolicySection id="shipping" title={text("policies.shipping.title", "Shipping Policy")}>
              <PolicyTable
                rows={[
                  {
                    topic: "Overview",
                    detail: text(
                      "policies.shipping.p1",
                      "All MELANVÉE orders are dispatched promptly upon processing.",
                    ),
                  },
                  {
                    topic: "Dispatch",
                    detail: text(
                      "policies.shipping.li1",
                      "Dispatch is within 24 to 72 hours of your order. Times may vary slightly during busy periods and weekends.",
                    ),
                  },
                  {
                    topic: "UK and Europe",
                    detail: text(
                      "policies.shipping.li2",
                      "UK and Europe delivery takes 3 to 5 working days after dispatch.",
                    ),
                  },
                  {
                    topic: "Rest of world",
                    detail: text(
                      "policies.shipping.li3",
                      "Rest of world delivery takes 3 to 8 working days after dispatch.",
                    ),
                  },
                  {
                    topic: "UK shipping",
                    detail: text(
                      "policies.shipping.li4",
                      "Free UK shipping on all orders over £100.",
                    ),
                  },
                  {
                    topic: "International shipping",
                    detail: text(
                      "policies.shipping.li5",
                      "Free international shipping on all orders over £100.",
                    ),
                  },
                  {
                    topic: "Tracking",
                    detail: text(
                      "policies.shipping.p2",
                      "All orders are tracked. We will email you a tracking link as soon as your order leaves us.",
                    ),
                  },
                ]}
              />
            </PolicySection>
          </TabsContent>

          <TabsContent value="returns">
            <PolicySection id="returns" title={text("policies.returns.title", "Returns Policy")}>
              <PolicyTable
                rows={[
                  {
                    topic: "Overview",
                    detail: text(
                      "policies.returns.p1",
                      "Because our wigs are intimate beauty products, we follow strict hygiene rules, but we want you to feel safe ordering.",
                    ),
                  },
                  {
                    topic: "Eligibility",
                    detail: text(
                      "policies.returns.li1",
                      "Returns are accepted within 7 days of delivery on unopened, unworn pieces in their original packaging.",
                    ),
                  },
                  {
                    topic: "Inspection",
                    detail: text(
                      "policies.returns.li2",
                      "All returns are subject to a quality inspection. Refunds are issued only after the piece passes inspection and shows no sign of wear, washing, styling, dye or alteration.",
                    ),
                  },
                  {
                    topic: "Hygiene",
                    detail: text(
                      "policies.returns.li3",
                      "Once a wig has been worn, installed, washed, dyed or altered, we cannot accept it back for hygiene reasons.",
                    ),
                  },
                  {
                    topic: "Return shipping",
                    detail: text(
                      "policies.returns.li4",
                      "Return shipping is the customer's responsibility, except for damaged or faulty items or if we sent the wrong piece. In those cases, we cover the full cost.",
                    ),
                  },
                  {
                    topic: "Refunds",
                    detail: text(
                      "policies.returns.li5",
                      "Approved refunds are issued to your original payment method within 5 to 7 working days of our inspection team receiving and approving the return.",
                    ),
                  },
                  {
                    topic: "Start a return",
                    detail:
                      returnContactParts.length > 1 ? (
                        <>
                          {returnContactParts[0]}
                          <a
                            className="text-cocoa underline underline-offset-4"
                            href="mailto:hello@melanvee.com"
                          >
                            hello@melanvee.com
                          </a>
                          {returnContactParts.slice(1).join("hello@melanvee.com")}
                        </>
                      ) : (
                        returnsContact
                      ),
                  },
                ]}
              />
            </PolicySection>
          </TabsContent>

          <TabsContent value="exchanges">
            <PolicySection
              id="exchanges"
              title={text("policies.exchanges.title", "Exchange Policy")}
            >
              <PolicyTable
                rows={[
                  {
                    topic: "Overview",
                    detail: text(
                      "policies.exchanges.p1",
                      "Wrong texture? Wrong length? We will help you find the right one.",
                    ),
                  },
                  {
                    topic: "Eligibility",
                    detail: text(
                      "policies.exchanges.li1",
                      "Exchanges are accepted within 7 days of delivery on unopened, unworn pieces in their original packaging.",
                    ),
                  },
                  {
                    topic: "Options",
                    detail: text(
                      "policies.exchanges.li2",
                      "You can exchange for a different texture or length, or take store credit.",
                    ),
                  },
                  {
                    topic: "Shipping",
                    detail: text(
                      "policies.exchanges.li3",
                      "The customer covers return shipping. We cover the cost of sending the new piece.",
                    ),
                  },
                  {
                    topic: "Price difference",
                    detail: text(
                      "policies.exchanges.li4",
                      "If the new piece is more expensive, you will be invoiced for the difference. If it is cheaper, we will refund the difference.",
                    ),
                  },
                ]}
              />
            </PolicySection>
          </TabsContent>

          <TabsContent value="privacy">
            <PolicySection id="privacy" title={text("policies.privacy.title", "Privacy Policy")}>
              <PolicyTable
                rows={[
                  {
                    topic: "Data collection",
                    detail: text(
                      "policies.privacy.p1",
                      "We collect only what we need to fulfil your order: your name, email, delivery address and payment details. We never sell your data.",
                    ),
                  },
                  {
                    topic: "Mailing list",
                    detail: text(
                      "policies.privacy.p2",
                      "If you sign up to our mailing list, you can unsubscribe at any time using the link in any email we send.",
                    ),
                  },
                ]}
              />
            </PolicySection>
          </TabsContent>

          <TabsContent value="terms">
            <PolicySection id="terms" title={text("policies.terms.title", "Terms of Service")}>
              <PolicyTable
                rows={[
                  {
                    topic: "Agreement",
                    detail: text(
                      "policies.terms.p1",
                      "By placing an order with MELANVÉE, you agree to these terms.",
                    ),
                  },
                  {
                    topic: "Pricing and currency",
                    detail: text(
                      "policies.terms.p2",
                      "All prices are listed and charged in GBP at checkout. Your display currency may vary, but payment will always be processed in GBP.",
                    ),
                  },
                  {
                    topic: "Product variations",
                    detail: text(
                      "policies.terms.p3",
                      "Our product images are professionally styled to showcase each texture at its best. As with all natural human hair, slight variations in shade or curl pattern between batches are completely normal and do not affect the quality of your hair.",
                    ),
                  },
                ]}
              />
            </PolicySection>
          </TabsContent>
        </Tabs>
      </section>
    </SiteLayout>
  );
}

function PolicyTable({ rows }: { rows: { topic: string; detail: React.ReactNode }[] }) {
  return (
    <Table className="border border-cocoa/20 text-sm leading-6">
      <TableHeader className="bg-cocoa/5">
        <TableRow className="hover:bg-transparent">
          <TableHead scope="col" className="w-1/3 px-4 py-3 text-espresso">
            Topic
          </TableHead>
          <TableHead scope="col" className="px-4 py-3 text-espresso">
            Details
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ topic, detail }) => (
          <TableRow key={topic}>
            <TableHead scope="row" className="px-4 py-3 font-medium text-espresso">
              {topic}
            </TableHead>
            <TableCell className="px-4 py-3 text-muted-foreground">{detail}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
