ALTER TABLE public.site_projects ADD COLUMN IF NOT EXISTS external_url text;
ALTER TABLE public.site_news ADD COLUMN IF NOT EXISTS external_url text;
ALTER TABLE public.site_articles ADD COLUMN IF NOT EXISTS external_url text;