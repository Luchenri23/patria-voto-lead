
ALTER TABLE public.site_hero
ADD COLUMN badge_text text NOT NULL DEFAULT 'Gestão 2025-2028 • Canoinhas/SC',
ADD COLUMN card_name text NOT NULL DEFAULT 'Juliana Maciel',
ADD COLUMN card_subtitle text NOT NULL DEFAULT 'Prefeita de Canoinhas',
ADD COLUMN card_stat1_value text NOT NULL DEFAULT '2º',
ADD COLUMN card_stat1_label text NOT NULL DEFAULT 'Mandato',
ADD COLUMN card_stat2_value text NOT NULL DEFAULT 'PL',
ADD COLUMN card_stat2_label text NOT NULL DEFAULT 'Partido',
ADD COLUMN badge_right text NOT NULL DEFAULT 'Presidente Amplanorte',
ADD COLUMN badge_left text NOT NULL DEFAULT 'Reeleita em 2024',
ADD COLUMN cta2_text text NOT NULL DEFAULT 'Agenda da Prefeita';
