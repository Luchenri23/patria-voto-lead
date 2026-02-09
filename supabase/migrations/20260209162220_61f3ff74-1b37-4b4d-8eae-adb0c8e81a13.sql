
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Helper function: has_role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Helper function: is_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- RLS for user_roles
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Users can read own role" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ============ CONTENT TABLES ============

-- Hero Section
CREATE TABLE public.site_hero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT NOT NULL DEFAULT '',
  cta_text TEXT NOT NULL DEFAULT 'Ver Realizações',
  cta_link TEXT NOT NULL DEFAULT '#trabalho',
  image_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_hero ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hero" ON public.site_hero FOR SELECT USING (true);
CREATE POLICY "Admin manage hero" ON public.site_hero FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- About Section
CREATE TABLE public.site_about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  biography TEXT NOT NULL DEFAULT '',
  video_url TEXT,
  stat_1_value TEXT NOT NULL DEFAULT '32',
  stat_1_label TEXT NOT NULL DEFAULT 'Anos',
  stat_2_value TEXT NOT NULL DEFAULT '2º',
  stat_2_label TEXT NOT NULL DEFAULT 'Mandato',
  stat_3_value TEXT NOT NULL DEFAULT '1ª',
  stat_3_label TEXT NOT NULL DEFAULT 'Mulher Amplanorte',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_about ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read about" ON public.site_about FOR SELECT USING (true);
CREATE POLICY "Admin manage about" ON public.site_about FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Projects/Work
CREATE TABLE public.site_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Infraestrutura',
  image_url TEXT,
  video_url TEXT,
  status TEXT NOT NULL DEFAULT 'Em andamento',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects" ON public.site_projects FOR SELECT USING (true);
CREATE POLICY "Admin manage projects" ON public.site_projects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- News
CREATE TABLE public.site_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT,
  category TEXT NOT NULL DEFAULT 'Geral',
  image_url TEXT,
  video_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read news" ON public.site_news FOR SELECT USING (true);
CREATE POLICY "Admin manage news" ON public.site_news FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Articles
CREATE TABLE public.site_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  author TEXT NOT NULL DEFAULT 'Juliana Maciel',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read articles" ON public.site_articles FOR SELECT USING (true);
CREATE POLICY "Admin manage articles" ON public.site_articles FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Social Wall
CREATE TABLE public.site_social (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL DEFAULT 'instagram',
  post_url TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  caption TEXT,
  post_type TEXT NOT NULL DEFAULT 'image',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_social ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read social" ON public.site_social FOR SELECT USING (true);
CREATE POLICY "Admin manage social" ON public.site_social FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Contact Info
CREATE TABLE public.site_contact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  working_hours TEXT NOT NULL DEFAULT '',
  map_embed_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_contact ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read contact" ON public.site_contact FOR SELECT USING (true);
CREATE POLICY "Admin manage contact" ON public.site_contact FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Footer
CREATE TABLE public.site_footer (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  copyright_text TEXT NOT NULL DEFAULT '© 2025 Prefeitura de Canoinhas - Todos os direitos reservados',
  slogan TEXT NOT NULL DEFAULT 'Trabalhando por uma Canoinhas melhor para todos',
  transparency_url TEXT,
  privacy_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_footer ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read footer" ON public.site_footer FOR SELECT USING (true);
CREATE POLICY "Admin manage footer" ON public.site_footer FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Header/Nav
CREATE TABLE public.site_header (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_text TEXT NOT NULL DEFAULT 'Juliana Maciel',
  logo_subtitle TEXT NOT NULL DEFAULT 'Prefeita de Canoinhas',
  cta_text TEXT NOT NULL DEFAULT 'Fale Conosco',
  cta_link TEXT NOT NULL DEFAULT '#contato',
  instagram_url TEXT DEFAULT 'https://instagram.com',
  facebook_url TEXT DEFAULT 'https://facebook.com',
  twitter_url TEXT DEFAULT 'https://twitter.com',
  tiktok_url TEXT DEFAULT 'https://tiktok.com',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_header ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read header" ON public.site_header FOR SELECT USING (true);
CREATE POLICY "Admin manage header" ON public.site_header FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply triggers
CREATE TRIGGER update_site_hero_updated_at BEFORE UPDATE ON public.site_hero FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_about_updated_at BEFORE UPDATE ON public.site_about FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_projects_updated_at BEFORE UPDATE ON public.site_projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_news_updated_at BEFORE UPDATE ON public.site_news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_articles_updated_at BEFORE UPDATE ON public.site_articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_contact_updated_at BEFORE UPDATE ON public.site_contact FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_footer_updated_at BEFORE UPDATE ON public.site_footer FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_header_updated_at BEFORE UPDATE ON public.site_header FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for content images
INSERT INTO storage.buckets (id, name, public) VALUES ('content-images', 'content-images', true);

CREATE POLICY "Public can view content images" ON storage.objects FOR SELECT USING (bucket_id = 'content-images');
CREATE POLICY "Admins can upload content images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'content-images' AND public.is_admin());
CREATE POLICY "Admins can update content images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'content-images' AND public.is_admin());
CREATE POLICY "Admins can delete content images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'content-images' AND public.is_admin());
