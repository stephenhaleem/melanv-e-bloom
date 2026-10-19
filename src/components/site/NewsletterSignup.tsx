import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/newsletter";

type NewsletterSignupProps = {
  className: string;
  inputClassName: string;
  buttonClassName: string;
  buttonLabel: string;
};

export function NewsletterSignup({
  className,
  inputClassName,
  buttonClassName,
  buttonLabel,
}: NewsletterSignupProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "duplicate" | "error">(
    "idle",
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    try {
      const email = String(new FormData(form).get("email") ?? "");
      const result = await subscribeToNewsletter(email);
      if (!result.ok) throw new Error("Newsletter subscription was not accepted.");
      form.reset();
      setStatus(result.duplicate ? "duplicate" : "success");
    } catch (error) {
      console.error("[newsletter] Subscription failed:", error);
      setStatus("error");
    }
  }

  return (
    <form className={className} onSubmit={(event) => void handleSubmit(event)}>
      <input
        name="email"
        type="email"
        required
        maxLength={255}
        placeholder="Your email address"
        aria-label="Email address"
        className={inputClassName}
      />
      <button type="submit" disabled={status === "submitting"} className={buttonClassName}>
        {status === "submitting" ? "Joining…" : buttonLabel}
      </button>
      {status === "success" && (
        <p role="status" className="basis-full text-sm">
          You’re on the list — welcome.
        </p>
      )}
      {status === "duplicate" && (
        <p role="status" className="basis-full text-sm">
          This email is already subscribed.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="basis-full text-sm">
          We couldn’t subscribe you. Please try again.
        </p>
      )}
    </form>
  );
}
