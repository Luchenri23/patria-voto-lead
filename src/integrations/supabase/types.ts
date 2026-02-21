export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          name: string | null
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          name?: string | null
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          name?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
      site_about: {
        Row: {
          biography: string
          id: string
          stat_1_label: string
          stat_1_value: string
          stat_2_label: string
          stat_2_value: string
          stat_3_label: string
          stat_3_value: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          biography?: string
          id?: string
          stat_1_label?: string
          stat_1_value?: string
          stat_2_label?: string
          stat_2_value?: string
          stat_3_label?: string
          stat_3_value?: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          biography?: string
          id?: string
          stat_1_label?: string
          stat_1_value?: string
          stat_2_label?: string
          stat_2_value?: string
          stat_3_label?: string
          stat_3_value?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      site_articles: {
        Row: {
          author: string
          content: string | null
          created_at: string
          external_url: string | null
          id: string
          published_at: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          content?: string | null
          created_at?: string
          external_url?: string | null
          id?: string
          published_at?: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          content?: string | null
          created_at?: string
          external_url?: string | null
          id?: string
          published_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_contact: {
        Row: {
          address: string
          email: string
          id: string
          map_embed_url: string | null
          phone: string
          updated_at: string
          working_hours: string
        }
        Insert: {
          address?: string
          email?: string
          id?: string
          map_embed_url?: string | null
          phone?: string
          updated_at?: string
          working_hours?: string
        }
        Update: {
          address?: string
          email?: string
          id?: string
          map_embed_url?: string | null
          phone?: string
          updated_at?: string
          working_hours?: string
        }
        Relationships: []
      }
      site_footer: {
        Row: {
          copyright_text: string
          id: string
          privacy_url: string | null
          slogan: string
          transparency_url: string | null
          updated_at: string
        }
        Insert: {
          copyright_text?: string
          id?: string
          privacy_url?: string | null
          slogan?: string
          transparency_url?: string | null
          updated_at?: string
        }
        Update: {
          copyright_text?: string
          id?: string
          privacy_url?: string | null
          slogan?: string
          transparency_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_footer_links: {
        Row: {
          created_at: string
          id: string
          label: string
          sort_order: number
          url: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          sort_order?: number
          url?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          sort_order?: number
          url?: string
          visible?: boolean
        }
        Relationships: []
      }
      site_header: {
        Row: {
          cta_link: string
          cta_text: string
          facebook_url: string | null
          favicon_url: string | null
          id: string
          instagram_url: string | null
          logo_subtitle: string
          logo_text: string
          logo_url: string | null
          tiktok_url: string | null
          twitter_url: string | null
          updated_at: string
        }
        Insert: {
          cta_link?: string
          cta_text?: string
          facebook_url?: string | null
          favicon_url?: string | null
          id?: string
          instagram_url?: string | null
          logo_subtitle?: string
          logo_text?: string
          logo_url?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string
        }
        Update: {
          cta_link?: string
          cta_text?: string
          facebook_url?: string | null
          favicon_url?: string | null
          id?: string
          instagram_url?: string | null
          logo_subtitle?: string
          logo_text?: string
          logo_url?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_hero: {
        Row: {
          badge_left: string
          badge_right: string
          badge_text: string
          card_image_url: string | null
          card_name: string
          card_stat1_label: string
          card_stat1_value: string
          card_stat2_label: string
          card_stat2_value: string
          card_subtitle: string
          cta_link: string
          cta_text: string
          cta2_text: string
          fallback_color: string | null
          id: string
          image_url: string | null
          subtitle: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          badge_left?: string
          badge_right?: string
          badge_text?: string
          card_image_url?: string | null
          card_name?: string
          card_stat1_label?: string
          card_stat1_value?: string
          card_stat2_label?: string
          card_stat2_value?: string
          card_subtitle?: string
          cta_link?: string
          cta_text?: string
          cta2_text?: string
          fallback_color?: string | null
          id?: string
          image_url?: string | null
          subtitle?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          badge_left?: string
          badge_right?: string
          badge_text?: string
          card_image_url?: string | null
          card_name?: string
          card_stat1_label?: string
          card_stat1_value?: string
          card_stat2_label?: string
          card_stat2_value?: string
          card_subtitle?: string
          cta_link?: string
          cta_text?: string
          cta2_text?: string
          fallback_color?: string | null
          id?: string
          image_url?: string | null
          subtitle?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      site_news: {
        Row: {
          category: string
          content: string | null
          created_at: string
          excerpt: string
          external_url: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          published_at: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category?: string
          content?: string | null
          created_at?: string
          excerpt?: string
          external_url?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          published_at?: string
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          excerpt?: string
          external_url?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          published_at?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      site_projects: {
        Row: {
          category: string
          created_at: string
          description: string
          external_url: string | null
          id: string
          image_url: string | null
          sort_order: number
          status: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string
          external_url?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          external_url?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      site_sections: {
        Row: {
          id: string
          label: string
          section_key: string
          sort_order: number
          visible: boolean
        }
        Insert: {
          id?: string
          label: string
          section_key: string
          sort_order?: number
          visible?: boolean
        }
        Update: {
          id?: string
          label?: string
          section_key?: string
          sort_order?: number
          visible?: boolean
        }
        Relationships: []
      }
      site_social: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string | null
          platform: string
          post_type: string
          post_url: string
          sort_order: number
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          platform?: string
          post_type?: string
          post_url?: string
          sort_order?: number
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          platform?: string
          post_type?: string
          post_url?: string
          sort_order?: number
        }
        Relationships: []
      }
      site_social_links: {
        Row: {
          created_at: string
          icon_url: string | null
          id: string
          label: string
          platform: string
          sort_order: number
          url: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          icon_url?: string | null
          id?: string
          label: string
          platform: string
          sort_order?: number
          url?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          icon_url?: string | null
          id?: string
          label?: string
          platform?: string
          sort_order?: number
          url?: string
          visible?: boolean
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
