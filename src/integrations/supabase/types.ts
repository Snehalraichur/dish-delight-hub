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
      ad_boosts: {
        Row: {
          budget: number
          created_at: string | null
          end_datetime: string | null
          id: string
          metrics: Json | null
          post_id: string | null
          pricing_model: string | null
          restaurant_id: string
          start_datetime: string | null
          status: string | null
        }
        Insert: {
          budget: number
          created_at?: string | null
          end_datetime?: string | null
          id?: string
          metrics?: Json | null
          post_id?: string | null
          pricing_model?: string | null
          restaurant_id: string
          start_datetime?: string | null
          status?: string | null
        }
        Update: {
          budget?: number
          created_at?: string | null
          end_datetime?: string | null
          id?: string
          metrics?: Json | null
          post_id?: string | null
          pricing_model?: string | null
          restaurant_id?: string
          start_datetime?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_boosts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_boosts_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_actions: {
        Row: {
          action_type: string | null
          admin_id: string
          details: Json | null
          id: string
          target_id: string | null
          target_type: string | null
          timestamp: string | null
        }
        Insert: {
          action_type?: string | null
          admin_id: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type?: string | null
          timestamp?: string | null
        }
        Update: {
          action_type?: string | null
          admin_id?: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      brand_partnerships: {
        Row: {
          brand_name: string
          budget: number | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          end_date: string | null
          id: string
          logo_url: string | null
          partnership_type: string | null
          start_date: string | null
          status: string | null
          terms: Json | null
          updated_at: string | null
        }
        Insert: {
          brand_name: string
          budget?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          logo_url?: string | null
          partnership_type?: string | null
          start_date?: string | null
          status?: string | null
          terms?: Json | null
          updated_at?: string | null
        }
        Update: {
          brand_name?: string
          budget?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          logo_url?: string | null
          partnership_type?: string | null
          start_date?: string | null
          status?: string | null
          terms?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          created_at: string | null
          description: string | null
          end_datetime: string | null
          id: string
          name: string
          rules: Json | null
          start_datetime: string | null
          status: string | null
          target_restaurant_ids: Json | null
          target_user_ids: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_datetime?: string | null
          id?: string
          name: string
          rules?: Json | null
          start_datetime?: string | null
          status?: string | null
          target_restaurant_ids?: Json | null
          target_user_ids?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_datetime?: string | null
          id?: string
          name?: string
          rules?: Json | null
          start_datetime?: string | null
          status?: string | null
          target_restaurant_ids?: Json | null
          target_user_ids?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      catering_requests: {
        Row: {
          created_at: string | null
          details: Json | null
          event_id: string | null
          id: string
          restaurant_id: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          event_id?: string | null
          id?: string
          restaurant_id: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          event_id?: string | null
          id?: string
          restaurant_id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "catering_requests_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "catering_requests_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_redemptions: {
        Row: {
          claimed_at: string | null
          deal_id: string
          id: string
          post_id: string | null
          qr_code_data: string | null
          redeemed_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          claimed_at?: string | null
          deal_id: string
          id?: string
          post_id?: string | null
          qr_code_data?: string | null
          redeemed_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          claimed_at?: string | null
          deal_id?: string
          id?: string
          post_id?: string | null
          qr_code_data?: string | null
          redeemed_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_redemptions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_redemptions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          auto_attach_post: boolean | null
          created_at: string | null
          description: string | null
          discount_percent: number | null
          expiry_datetime: string | null
          id: string
          max_redemptions: number | null
          min_order_amount: number | null
          restaurant_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          auto_attach_post?: boolean | null
          created_at?: string | null
          description?: string | null
          discount_percent?: number | null
          expiry_datetime?: string | null
          id?: string
          max_redemptions?: number | null
          min_order_amount?: number | null
          restaurant_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          auto_attach_post?: boolean | null
          created_at?: string | null
          description?: string | null
          discount_percent?: number | null
          expiry_datetime?: string | null
          id?: string
          max_redemptions?: number | null
          min_order_amount?: number | null
          restaurant_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          end_datetime: string | null
          id: string
          location: string | null
          name: string
          organizer_id: string | null
          organizer_type: string | null
          start_datetime: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_datetime?: string | null
          id?: string
          location?: string | null
          name: string
          organizer_id?: string | null
          organizer_type?: string | null
          start_datetime?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_datetime?: string | null
          id?: string
          location?: string | null
          name?: string
          organizer_id?: string | null
          organizer_type?: string | null
          start_datetime?: string | null
        }
        Relationships: []
      }
      flagged_content: {
        Row: {
          created_at: string | null
          flagged_by: string
          id: string
          post_id: string | null
          reason: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          flagged_by: string
          id?: string
          post_id?: string | null
          reason: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          flagged_by?: string
          id?: string
          post_id?: string | null
          reason?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flagged_content_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      highlight_stories: {
        Row: {
          added_at: string
          highlight_id: string
          id: string
          media_url: string
          story_id: string
        }
        Insert: {
          added_at?: string
          highlight_id: string
          id?: string
          media_url: string
          story_id: string
        }
        Update: {
          added_at?: string
          highlight_id?: string
          id?: string
          media_url?: string
          story_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "highlight_stories_highlight_id_fkey"
            columns: ["highlight_id"]
            isOneToOne: false
            referencedRelation: "story_highlights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "highlight_stories_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_tiers: {
        Row: {
          benefits: Json | null
          created_at: string | null
          id: string
          name: string
          points_required: number
          updated_at: string | null
        }
        Insert: {
          benefits?: Json | null
          created_at?: string | null
          id?: string
          name: string
          points_required?: number
          updated_at?: string | null
        }
        Update: {
          benefits?: Json | null
          created_at?: string | null
          id?: string
          name?: string
          points_required?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read_at: string | null
          sender_id: string
          thread_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          sender_id: string
          thread_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          sender_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          caption: string | null
          created_at: string | null
          deal_id: string | null
          hashtags: Json | null
          id: string
          media_url: string | null
          restaurant_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          deal_id?: string | null
          hashtags?: Json | null
          id?: string
          media_url?: string | null
          restaurant_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          deal_id?: string | null
          hashtags?: Json | null
          id?: string
          media_url?: string | null
          restaurant_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          points: number | null
          profile_image_url: string | null
          streak_count: number | null
          tier_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          name: string
          phone?: string | null
          points?: number | null
          profile_image_url?: string | null
          streak_count?: number | null
          tier_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          points?: number | null
          profile_image_url?: string | null
          streak_count?: number | null
          tier_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "loyalty_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_subscription_plans: {
        Row: {
          created_at: string | null
          features: Json | null
          id: string
          name: string
          price_per_month: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          features?: Json | null
          id?: string
          name: string
          price_per_month: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          features?: Json | null
          id?: string
          name?: string
          price_per_month?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          address: string | null
          created_at: string | null
          cuisine_type: string | null
          email: string | null
          id: string
          name: string
          owner_id: string | null
          phone: string | null
          profile_image_url: string | null
          status: string | null
          subscription_plan_id: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          email?: string | null
          id?: string
          name: string
          owner_id?: string | null
          phone?: string | null
          profile_image_url?: string | null
          status?: string | null
          subscription_plan_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          email?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          phone?: string | null
          profile_image_url?: string | null
          status?: string | null
          subscription_plan_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_subscription_plan_id_fkey"
            columns: ["subscription_plan_id"]
            isOneToOne: false
            referencedRelation: "restaurant_subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_rules: {
        Row: {
          action_type: string
          conditions: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          max_daily_limit: number | null
          multiplier: number | null
          name: string
          points_awarded: number
          updated_at: string | null
        }
        Insert: {
          action_type: string
          conditions?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_daily_limit?: number | null
          multiplier?: number | null
          name: string
          points_awarded?: number
          updated_at?: string | null
        }
        Update: {
          action_type?: string
          conditions?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_daily_limit?: number | null
          multiplier?: number | null
          name?: string
          points_awarded?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      stories: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          media_url: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          media_url: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          media_url?: string
          user_id?: string
        }
        Relationships: []
      }
      story_archives: {
        Row: {
          archived_at: string
          created_at: string
          id: string
          media_url: string
          original_story_id: string | null
          user_id: string
        }
        Insert: {
          archived_at?: string
          created_at?: string
          id?: string
          media_url: string
          original_story_id?: string | null
          user_id: string
        }
        Update: {
          archived_at?: string
          created_at?: string
          id?: string
          media_url?: string
          original_story_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      story_highlights: {
        Row: {
          cover_image_url: string | null
          created_at: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      story_mentions: {
        Row: {
          created_at: string
          id: string
          mentioned_user_id: string
          position_x: number | null
          position_y: number | null
          story_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mentioned_user_id: string
          position_x?: number | null
          position_y?: number | null
          story_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mentioned_user_id?: string
          position_x?: number | null
          position_y?: number | null
          story_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_mentions_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      story_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          story_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          story_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_reactions_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          priority: string | null
          resolved_at: string | null
          restaurant_id: string | null
          status: string | null
          subject: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          resolved_at?: string | null
          restaurant_id?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          resolved_at?: string | null
          restaurant_id?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      threads: {
        Row: {
          created_at: string | null
          id: string
          participant_ids: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          participant_ids?: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          participant_ids?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      ticket_sales: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          quantity: number | null
          status: string | null
          ticket_type: string | null
          total_amount: number
          unit_price: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          quantity?: number | null
          status?: string | null
          ticket_type?: string | null
          total_amount: number
          unit_price: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          quantity?: number | null
          status?: string | null
          ticket_type?: string | null
          total_amount?: number
          unit_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_sales_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_name: string
          date_awarded: string | null
          id: string
          points: number | null
          user_id: string
        }
        Insert: {
          badge_name: string
          date_awarded?: string | null
          id?: string
          points?: number | null
          user_id: string
        }
        Update: {
          badge_name?: string
          date_awarded?: string | null
          id?: string
          points?: number | null
          user_id?: string
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
    }
    Enums: {
      app_role: "user" | "restaurant" | "admin"
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
      app_role: ["user", "restaurant", "admin"],
    },
  },
} as const
