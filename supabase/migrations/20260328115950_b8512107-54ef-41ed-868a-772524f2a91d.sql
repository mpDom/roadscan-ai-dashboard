-- Create reports table
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_type TEXT NOT NULL,
  gps_lat NUMERIC NOT NULL,
  gps_lng NUMERIC NOT NULL,
  ai_classification TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Allow anon users to insert (for hardware devices posting via anon key)
CREATE POLICY "Allow anon insert" ON public.reports
  FOR INSERT TO anon WITH CHECK (true);

-- Allow anon users to read reports
CREATE POLICY "Allow anon select" ON public.reports
  FOR SELECT TO anon USING (true);

-- Allow service role full access (used by edge function)
CREATE POLICY "Service role full access" ON public.reports
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Create images storage bucket (public so URLs are accessible)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);

-- Allow anyone to read images
CREATE POLICY "Public read access on images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Allow service role to upload images
CREATE POLICY "Service role upload images" ON storage.objects
  FOR INSERT TO service_role WITH CHECK (bucket_id = 'images');