drop policy if exists "Authenticated users can insert website copy" on public.site_copy;
drop policy if exists "Authenticated users can update website copy" on public.site_copy;

create policy "Site admins can insert website copy"
  on public.site_copy for insert
  to authenticated
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Site admins can update website copy"
  on public.site_copy for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do update set public = excluded.public;

create policy "Anyone can view site media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'site-media');

create policy "Site admins can upload site media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'site-media'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

create policy "Site admins can update site media"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'site-media'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  with check (
    bucket_id = 'site-media'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
