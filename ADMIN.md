# Site content dashboard

The content studio is available at `/admin`. It edits site headings, paragraphs, supporting copy,
and the listed non-Shopify editorial images. Product and collection data/images stay managed in
Shopify.

## Enable dashboard access

1. Apply the Supabase migration `supabase/migrations/20261020_secure_site_content.sql` after the
   existing `site_copy` migration.
2. Create or select an administrator in Supabase Authentication.
3. Set that user's `app_metadata.role` to `admin` using the Supabase Dashboard or a trusted
   server-side admin client. For example, in the Supabase SQL Editor, replace the email below:

   ```sql
   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
     || jsonb_build_object('role', 'admin')
   where email = 'admin@example.com';
   ```

4. Sign in at `/admin` with that user's email and password. If the account already had an active
   session, sign out and back in to refresh its token.

Only `app_metadata.role = 'admin'` can write site copy or upload media. Public visitors can read
published content and view the public site-media bucket. The role must not be assigned through
user-editable metadata.

## Editing content

Edit fields by page, then choose **Save changes**. Image uploads are staged in the editor and
published when changes are saved. The existing local image is used until a replacement is saved.
