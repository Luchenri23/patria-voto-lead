ALTER TABLE public.site_hero ADD COLUMN IF NOT EXISTS card_image_url text DEFAULT NULL;
ALTER TABLE public.site_header ADD COLUMN IF NOT EXISTS favicon_url text DEFAULT NULL;