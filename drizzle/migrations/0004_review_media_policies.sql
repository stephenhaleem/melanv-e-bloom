CREATE POLICY "Review photos are publicly readable"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'review-photos');

CREATE POLICY "Review photos can be uploaded publicly"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'review-photos');

CREATE POLICY "Review photos can be updated publicly"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'review-photos')
  WITH CHECK (bucket_id = 'review-photos');

CREATE POLICY "Review photos can be deleted publicly"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'review-photos');

CREATE POLICY "Review videos are publicly readable"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'review-videos');

CREATE POLICY "Review videos can be uploaded publicly"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'review-videos');

CREATE POLICY "Review videos can be updated publicly"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'review-videos')
  WITH CHECK (bucket_id = 'review-videos');

CREATE POLICY "Review videos can be deleted publicly"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'review-videos');