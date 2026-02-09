
-- 1. Section visibility control
CREATE TABLE public.site_sections (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key text NOT NULL UNIQUE,
  label text NOT NULL,
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read sections" ON public.site_sections FOR SELECT USING (true);
CREATE POLICY "Admin manage sections" ON public.site_sections FOR ALL USING (is_admin()) WITH CHECK (is_admin());

INSERT INTO public.site_sections (section_key, label, sort_order) VALUES
  ('hero', 'Hero / Banner', 1),
  ('about', 'Quem Sou', 2),
  ('work', 'Meu Trabalho', 3),
  ('news', 'Notícias e Artigos', 4),
  ('social', 'Redes Sociais', 5),
  ('contact', 'Contato', 6);

-- 2. Dynamic footer links
CREATE TABLE public.site_footer_links (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label text NOT NULL,
  url text NOT NULL DEFAULT '',
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_footer_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read footer links" ON public.site_footer_links FOR SELECT USING (true);
CREATE POLICY "Admin manage footer links" ON public.site_footer_links FOR ALL USING (is_admin()) WITH CHECK (is_admin());

INSERT INTO public.site_footer_links (label, url, sort_order) VALUES
  ('Portal da Transparência', '', 1),
  ('Política de Privacidade', '', 2),
  ('Lei de Acesso à Informação', '', 3),
  ('Ouvidoria', '', 4);

-- 3. Dynamic social media links (for header, footer, social wall)
CREATE TABLE public.site_social_links (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform text NOT NULL,
  label text NOT NULL,
  url text NOT NULL DEFAULT '',
  icon_url text,
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read social links" ON public.site_social_links FOR SELECT USING (true);
CREATE POLICY "Admin manage social links" ON public.site_social_links FOR ALL USING (is_admin()) WITH CHECK (is_admin());

INSERT INTO public.site_social_links (platform, label, url, sort_order) VALUES
  ('instagram', 'Instagram', 'https://instagram.com', 1),
  ('facebook', 'Facebook', 'https://facebook.com', 2),
  ('twitter', 'Twitter/X', 'https://twitter.com', 3),
  ('tiktok', 'TikTok', 'https://tiktok.com', 4);
