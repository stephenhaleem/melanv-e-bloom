import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { LogOut, Save, Upload } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { SITE_COPY_FIELDS, SITE_IMAGE_FIELDS, useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { values, refresh } = useSiteContent();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data, error }) => {
      if (error) setAuthError(error.message);
      if (active) {
        setUser(data.session?.user ?? null);
        setChecking(false);
      }
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ?? null);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setDraft((current) => {
      const next = { ...current };
      for (const [key, field] of Object.entries(SITE_COPY_FIELDS)) {
        next[key] = values[key] ?? current[key] ?? field.value;
      }
      for (const field of SITE_IMAGE_FIELDS) {
        next[field.key] = values[field.key] ?? current[field.key] ?? "";
      }
      return next;
    });
  }, [values]);

  const isAdmin = user?.app_metadata?.role === "admin";
  const pages = useMemo(
    () => Array.from(new Set(Object.values(SITE_COPY_FIELDS).map((field) => field.page))),
    [],
  );
  const matchesFilter = (label: string, page: string) =>
    `${label} ${page}`.toLowerCase().includes(filter.trim().toLowerCase());

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      return;
    }
    if (data.user.app_metadata?.role !== "admin") {
      await supabase.auth.signOut();
      setAuthError("This account is not authorized to access the content dashboard.");
    }
  }

  async function saveContent() {
    setSaving(true);
    setSaveMessage("");
    const records = Object.entries(draft).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from("site_copy").upsert(records, { onConflict: "key" });
    if (error) {
      console.error("[admin] Could not save site content:", error.message);
      setSaveMessage(`Could not save changes: ${error.message}`);
    } else {
      await refresh();
      setSaveMessage("All changes saved.");
    }
    setSaving(false);
  }

  async function uploadImage(key: string, file?: File) {
    if (!file) return;
    const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedImageTypes.includes(file.type) || file.size > 10 * 1024 * 1024) {
      setSaveMessage("Choose a JPG, PNG, WebP or AVIF image under 10 MB.");
      return;
    }
    setUploading(key);
    setSaveMessage("");
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
    const path = `${key.replace(/^image\./, "").replaceAll(".", "/")}/${crypto.randomUUID()}-${safeName}`;
    const { data, error } = await supabase.storage.from("site-media").upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });
    if (error) {
      console.error("[admin] Could not upload site image:", error.message);
      setSaveMessage(`Could not upload image: ${error.message}`);
      setUploading(null);
      return;
    }
    const { data: publicUrl } = supabase.storage.from("site-media").getPublicUrl(data.path);
    setDraft((current) => ({ ...current, [key]: publicUrl.publicUrl }));
    setUploading(null);
    setSaveMessage("Image uploaded. Save changes to publish it.");
  }

  if (checking) {
    return <div className="min-h-screen bg-ivory p-10 text-cocoa">Checking admin access…</div>;
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-12">
        <form
          onSubmit={(event) => void signIn(event)}
          className="w-full max-w-md space-y-6 bg-ivory p-8 shadow-sm"
        >
          <div>
            <div className="eyebrow">MELANVÉE</div>
            <h1 className="mt-3 font-serif text-4xl text-espresso">Content studio</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in with your administrator account.
            </p>
          </div>
          <label className="block space-y-2 text-sm text-cocoa">
            Email
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border border-border bg-white px-4 py-3"
            />
          </label>
          <label className="block space-y-2 text-sm text-cocoa">
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-border bg-white px-4 py-3"
            />
          </label>
          {authError && (
            <p role="alert" className="text-sm text-destructive">
              {authError}
            </p>
          )}
          <button className="w-full bg-cocoa px-5 py-4 text-xs uppercase tracking-[0.25em] text-cream hover:bg-espresso">
            Sign in
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-10 border-b border-border bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div>
            <div className="eyebrow">MELANVÉE · ADMIN</div>
            <h1 className="font-serif text-2xl text-espresso">Content studio</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:block">{user.email}</span>
            <button
              type="button"
              onClick={() => void supabase.auth.signOut()}
              className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-widest text-cocoa"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-12 px-5 py-8 md:px-8 md:py-12">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Edit headings, paragraphs and supporting copy across the site. Upload replacements for
              editorial images; product and collection imagery remains managed in Shopify.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              aria-label="Filter content"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Filter by page or text…"
              className="border border-border bg-white px-4 py-3 text-sm"
            />
            <button
              type="button"
              onClick={() => void saveContent()}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 bg-cocoa px-6 py-3 text-xs uppercase tracking-[0.2em] text-cream disabled:opacity-60"
            >
              <Save size={15} /> {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>

        {saveMessage && (
          <p role="status" className="text-sm text-cocoa">
            {saveMessage}
          </p>
        )}

        {pages.map((page) => {
          const fields = Object.entries(SITE_COPY_FIELDS).filter(
            ([, field]) => field.page === page && matchesFilter(field.label, page),
          );
          const images = SITE_IMAGE_FIELDS.filter(
            (field) => field.page === page && matchesFilter(field.label, page),
          );
          if (fields.length === 0 && images.length === 0) return null;
          return (
            <section key={page} className="space-y-5">
              <h2 className="border-b border-border pb-3 font-serif text-3xl text-espresso">
                {page}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {fields.map(([key, field]) => (
                  <label key={key} className="block space-y-2 bg-white p-5 shadow-sm">
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-cocoa">
                      {field.label}
                    </span>
                    <textarea
                      rows={field.value.length > 150 ? 5 : 2}
                      value={draft[key] ?? field.value}
                      onChange={(event) =>
                        setDraft((current) => ({ ...current, [key]: event.target.value }))
                      }
                      className="w-full resize-y border border-border bg-ivory px-3 py-2.5 text-sm leading-relaxed text-espresso focus:outline-none focus:ring-1 focus:ring-cocoa"
                    />
                  </label>
                ))}
              </div>
              {images.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {images.map((image) => (
                    <div key={image.key} className="space-y-3 bg-white p-5 shadow-sm">
                      <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-cocoa">
                        {image.label}
                      </h3>
                      <img
                        src={draft[image.key] || image.fallback}
                        alt={image.label}
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <label className="inline-flex cursor-pointer items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-widest text-cocoa hover:bg-cream">
                        <Upload size={14} />
                        {uploading === image.key ? "Uploading…" : "Choose image"}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploading === image.key}
                          onChange={(event) => void uploadImage(image.key, event.target.files?.[0])}
                          className="sr-only"
                        />
                      </label>
                      {draft[image.key] && (
                        <button
                          type="button"
                          onClick={() => setDraft((current) => ({ ...current, [image.key]: "" }))}
                          className="ml-2 text-xs text-muted-foreground underline underline-offset-4"
                        >
                          Restore built-in image
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
