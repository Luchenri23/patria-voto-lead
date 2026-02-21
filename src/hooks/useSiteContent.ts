import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

// Generic fetch for single-row tables
function useSingleRow<T>(table: string) {
  return useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await db
        .from(table)
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as T | null;
    },
  });
}

// Generic fetch for multi-row tables
function useMultiRow<T>(table: string, orderBy = "created_at", ascending = false) {
  return useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await db
        .from(table)
        .select("*")
        .order(orderBy, { ascending });
      if (error) throw error;
      return (data as T[]) || [];
    },
  });
}

// Types
export interface SiteHero {
  id: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  image_url: string | null;
  badge_text: string;
  card_name: string;
  card_subtitle: string;
  card_stat1_value: string;
  card_stat1_label: string;
  card_stat2_value: string;
  card_stat2_label: string;
  badge_right: string;
  badge_left: string;
  cta2_text: string;
  video_url: string | null;
  fallback_color: string | null;
  updated_at: string;
}

export interface SiteAbout {
  id: string;
  biography: string;
  video_url: string | null;
  stat_1_value: string;
  stat_1_label: string;
  stat_2_value: string;
  stat_2_label: string;
  stat_3_value: string;
  stat_3_label: string;
  updated_at: string;
}

export interface SiteProject {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  video_url: string | null;
  status: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteNews {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  category: string;
  image_url: string | null;
  video_url: string | null;
  is_featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface SiteArticle {
  id: string;
  title: string;
  content: string | null;
  author: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSocial {
  id: string;
  platform: string;
  post_url: string;
  image_url: string | null;
  caption: string | null;
  post_type: string;
  sort_order: number;
  created_at: string;
}

export interface SiteSection {
  id: string;
  section_key: string;
  label: string;
  visible: boolean;
  sort_order: number;
}

export interface SiteFooterLink {
  id: string;
  label: string;
  url: string;
  visible: boolean;
  sort_order: number;
  created_at: string;
}

export interface SiteSocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon_url: string | null;
  visible: boolean;
  sort_order: number;
  created_at: string;
}

export interface SiteContact {
  id: string;
  address: string;
  phone: string;
  email: string;
  working_hours: string;
  map_embed_url: string | null;
  updated_at: string;
}

export interface SiteFooter {
  id: string;
  copyright_text: string;
  slogan: string;
  transparency_url: string | null;
  privacy_url: string | null;
  updated_at: string;
}

export interface SiteHeader {
  id: string;
  logo_text: string;
  logo_subtitle: string;
  logo_url: string | null;
  cta_text: string;
  cta_link: string;
  instagram_url: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  tiktok_url: string | null;
  updated_at: string;
}

// Hooks
export const useSiteHero = () => useSingleRow<SiteHero>("site_hero");
export const useSiteAbout = () => useSingleRow<SiteAbout>("site_about");
export const useSiteContact = () => useSingleRow<SiteContact>("site_contact");
export const useSiteFooter = () => useSingleRow<SiteFooter>("site_footer");
export const useSiteHeader = () => useSingleRow<SiteHeader>("site_header");

export const useSiteProjects = () => useMultiRow<SiteProject>("site_projects", "sort_order", true);
export const useSiteNews = () => useMultiRow<SiteNews>("site_news", "published_at", false);
export const useSiteArticles = () => useMultiRow<SiteArticle>("site_articles", "published_at", false);
export const useSiteSocial = () => useMultiRow<SiteSocial>("site_social", "sort_order", true);
export const useSiteSections = () => useMultiRow<SiteSection>("site_sections", "sort_order", true);
export const useSiteFooterLinks = () => useMultiRow<SiteFooterLink>("site_footer_links", "sort_order", true);
export const useSiteSocialLinks = () => useMultiRow<SiteSocialLink>("site_social_links", "sort_order", true);

// Mutation helpers
export function useUpsertSingle(table: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const { data: existing } = await db.from(table).select("id").limit(1).maybeSingle();
      if (existing) {
        const { error } = await db.from(table).update(data).eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await db.from(table).insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [table] }),
  });
}

export function useInsertRow(table: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const { error } = await db.from(table).insert(data);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [table] }),
  });
}

export function useUpdateRow(table: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Record<string, unknown> & { id: string }) => {
      const { error } = await db.from(table).update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [table] }),
  });
}

export function useDeleteRow(table: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [table] }),
  });
}
