
-- Add image_url, full_bio, trajectory to site_about
ALTER TABLE public.site_about ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.site_about ADD COLUMN IF NOT EXISTS full_bio text;
ALTER TABLE public.site_about ADD COLUMN IF NOT EXISTS trajectory text;

-- Add agenda_url to site_hero for agenda link
ALTER TABLE public.site_hero ADD COLUMN IF NOT EXISTS agenda_url text;

-- Add whatsapp column to newsletter_subscribers
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS whatsapp text;
