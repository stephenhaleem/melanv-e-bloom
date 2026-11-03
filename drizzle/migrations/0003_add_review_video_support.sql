ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS video_urls text[] NOT NULL DEFAULT '{}';