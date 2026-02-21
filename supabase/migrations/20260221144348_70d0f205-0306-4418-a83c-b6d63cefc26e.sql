
ALTER TABLE public.site_hero
ADD COLUMN video_url text DEFAULT NULL,
ADD COLUMN fallback_color text DEFAULT NULL;
