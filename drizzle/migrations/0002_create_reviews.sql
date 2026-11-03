create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id text not null,
  name text not null,
  email text,
  rating integer not null check (rating between 1 and 5),
  title text,
  body text not null,
  photo_urls text[] not null default '{}',
  video_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT SELECT ON public.reviews TO anon;
GRANT ALL ON public.reviews TO service_role;

alter table public.reviews enable row level security;

create policy "Anyone can read reviews"
  on public.reviews for select
  to anon, authenticated
  using (true);

create policy "Anyone can submit a review"
  on public.reviews for insert
  to anon, authenticated
  with check (true);

create index if not exists reviews_product_id_idx on public.reviews (product_id);