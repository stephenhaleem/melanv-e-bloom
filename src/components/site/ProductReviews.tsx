import { useEffect, useState } from "react";
import { fetchReviews, submitReview, type Review } from "@/lib/reviews";

export function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(false);

    fetchReviews(productId)
      .then((result) => {
        if (active) setReviews(result);
      })
      .catch((error: unknown) => {
        console.error("[reviews] Could not load reviews:", error);
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [productId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const photos = formData
      .getAll("photos")
      .filter((file): file is File => file instanceof File && file.size > 0);
    const videos = formData
      .getAll("videos")
      .filter((file): file is File => file instanceof File && file.size > 0);

    try {
      const review = await submitReview({
        productId,
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        rating: Number(formData.get("rating")),
        title: String(formData.get("title") ?? ""),
        body: String(formData.get("body") ?? ""),
        photos,
        videos,
      });
      setReviews((current) => [review, ...current]);
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("[reviews] Could not submit review:", error);
      setStatus("error");
    }
  }

  return (
    <section className="container-luxe py-16 md:py-20 border-t border-border">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="eyebrow">Customer notes</div>
          <h2 className="font-serif text-3xl text-espresso mt-2">Worn and loved.</h2>
          {loading && <p className="text-sm text-muted-foreground mt-6">Loading reviews…</p>}
          {loadError && (
            <p className="text-sm text-destructive mt-6">
              Reviews could not be loaded. Please refresh and try again.
            </p>
          )}
          {!loading && !loadError && reviews.length === 0 && (
            <p className="text-sm text-muted-foreground mt-6">
              No reviews yet. Be the first to share yours.
            </p>
          )}
          <div className="space-y-6 mt-6">
            {reviews.map((review) => (
              <article key={review.id} className="border-b border-border pb-6">
                <div className="flex justify-between gap-4">
                  <h3 className="font-serif text-lg text-espresso">
                    {review.title || "Customer review"}
                  </h3>
                  <span className="text-cocoa" aria-label={`${review.rating} out of 5 stars`}>
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{review.body}</p>
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground mt-3">
                  {review.name} · {new Date(review.createdAt).toLocaleDateString()}
                </p>
                {(review.photoUrls.length > 0 || review.videoUrls.length > 0) && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {review.photoUrls.map((url) => (
                      <img
                        key={url}
                        src={url}
                        alt={`Photo shared by ${review.name}`}
                        className="aspect-square object-cover"
                      />
                    ))}
                    {review.videoUrls.map((url) => (
                      <video key={url} src={url} controls className="aspect-square object-cover" />
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-cream p-6 md:p-8 space-y-4">
          <h3 className="font-serif text-2xl text-espresso">Leave a review</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="space-y-1 text-[0.7rem] tracking-[0.2em] uppercase text-cocoa">
              Name
              <input
                name="name"
                required
                maxLength={100}
                className="w-full bg-ivory border border-border px-3 py-3 text-sm normal-case tracking-normal"
              />
            </label>
            <label className="space-y-1 text-[0.7rem] tracking-[0.2em] uppercase text-cocoa">
              Email (optional)
              <input
                name="email"
                type="email"
                className="w-full bg-ivory border border-border px-3 py-3 text-sm normal-case tracking-normal"
              />
            </label>
          </div>
          <label className="block space-y-1 text-[0.7rem] tracking-[0.2em] uppercase text-cocoa">
            Rating
            <select
              name="rating"
              required
              defaultValue="5"
              className="w-full bg-ivory border border-border px-3 py-3 text-sm normal-case tracking-normal"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} out of 5
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1 text-[0.7rem] tracking-[0.2em] uppercase text-cocoa">
            Title (optional)
            <input
              name="title"
              maxLength={120}
              className="w-full bg-ivory border border-border px-3 py-3 text-sm normal-case tracking-normal"
            />
          </label>
          <label className="block space-y-1 text-[0.7rem] tracking-[0.2em] uppercase text-cocoa">
            Your review
            <textarea
              name="body"
              required
              rows={4}
              maxLength={2000}
              className="w-full bg-ivory border border-border px-3 py-3 text-sm normal-case tracking-normal"
            />
          </label>
          <label className="block space-y-1 text-[0.7rem] tracking-[0.2em] uppercase text-cocoa">
            Photos (optional)
            <input
              name="photos"
              type="file"
              accept="image/*"
              multiple
              className="block w-full text-sm normal-case tracking-normal"
            />
          </label>
          <label className="block space-y-1 text-[0.7rem] tracking-[0.2em] uppercase text-cocoa">
            Videos (optional)
            <input
              name="videos"
              type="file"
              accept="video/mp4,video/quicktime,video/webm,video/x-m4v"
              multiple
              className="block w-full text-sm normal-case tracking-normal"
            />
          </label>
          {status === "success" && (
            <p role="status" className="text-sm text-green-800">
              Thank you — your review has been received.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-destructive">
              Your review could not be submitted. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-cocoa text-cream py-4 text-[0.7rem] tracking-[0.25em] uppercase disabled:opacity-50"
          >
            {status === "submitting" ? "Submitting…" : "Submit review"}
          </button>
        </form>
      </div>
    </section>
  );
}
