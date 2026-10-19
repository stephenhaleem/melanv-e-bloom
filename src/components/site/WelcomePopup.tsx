import { useEffect, useState } from "react";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const STORAGE_KEY = "melanvee_welcome_seen_v1";
const DISCOUNT_CODE = "FEEL10";

type Stage = "form" | "submitting" | "code";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<Stage>("form");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const timeout = window.setTimeout(() => setOpen(true), 4000);
    return () => window.clearTimeout(timeout);
  }, []);

  function markSeen() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // The popup can still be dismissed when browser storage is unavailable.
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) markSeen();
    setOpen(nextOpen);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStage("submitting");
    setError(null);

    try {
      const result = await subscribeToNewsletter(email, "popup");
      if (!result.ok) throw new Error("Klaviyo did not accept the subscription.");

      markSeen();
      setStage("code");
    } catch (submissionError) {
      console.error("[newsletter] Welcome popup subscription failed:", submissionError);
      setError("Something went wrong. Please try again.");
      setStage("form");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-none border border-blush/30 bg-cocoa p-0 text-cream shadow-2xl sm:rounded-none">
        {stage === "code" ? (
          <div className="p-8 text-center sm:p-10">
            <p className="eyebrow mb-4 text-blush">Welcome to MELANVÉE</p>
            <DialogTitle className="font-serif text-3xl leading-tight text-cream">
              Your welcome code.
            </DialogTitle>
            <DialogDescription className="mt-4 text-sm leading-relaxed text-cream/70">
              Use this at checkout on your first order.
            </DialogDescription>
            <div className="mt-8 border border-blush/40 px-6 py-6">
              <p className="font-serif text-4xl tracking-[0.3em] text-blush">{DISCOUNT_CODE}</p>
            </div>
            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.18em] text-cream/60">
              First order only
            </p>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="mt-8 w-full bg-cream py-3 text-xs uppercase tracking-[0.25em] text-cocoa transition hover:bg-blush"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <div className="p-8 text-center sm:p-10">
            <p className="eyebrow mb-4 text-blush">First time here?</p>
            <DialogTitle className="font-serif text-3xl leading-tight text-cream">
              <span className="italic text-blush">10% off</span>
              <br />
              your first order.
            </DialogTitle>
            <DialogDescription className="mt-4 text-sm leading-relaxed text-cream/70">
              Join the MELANVÉE community for your welcome code and updates when new textures land.
              No spam, ever.
            </DialogDescription>
            <form onSubmit={(event) => void handleSubmit(event)} className="mt-8 space-y-3">
              <input
                type="email"
                required
                maxLength={255}
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                disabled={stage === "submitting"}
                className="w-full border border-cream/30 bg-transparent px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/45 focus:border-blush disabled:opacity-50"
              />
              {error && (
                <p role="alert" className="text-left text-sm text-blush">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={stage === "submitting"}
                className="w-full bg-cream py-3 text-xs uppercase tracking-[0.25em] text-cocoa transition hover:bg-blush disabled:cursor-not-allowed disabled:opacity-50"
              >
                {stage === "submitting" ? "Joining…" : "Get my 10% off"}
              </button>
            </form>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="mt-5 text-[0.65rem] uppercase tracking-[0.2em] text-cream/60 transition hover:text-cream"
            >
              No thanks
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
