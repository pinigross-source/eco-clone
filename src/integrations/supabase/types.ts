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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      abandoned_carts: {
        Row: {
          cart_items: Json
          cart_total_cents: number | null
          created_at: string
          email: string | null
          id: string
          recovered_at: string | null
          recovery_email_sent_at: string | null
          session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          cart_items?: Json
          cart_total_cents?: number | null
          created_at?: string
          email?: string | null
          id?: string
          recovered_at?: string | null
          recovery_email_sent_at?: string | null
          session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          cart_items?: Json
          cart_total_cents?: number | null
          created_at?: string
          email?: string | null
          id?: string
          recovered_at?: string | null
          recovery_email_sent_at?: string | null
          session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      affiliates: {
        Row: {
          code: string
          commission_rate: number | null
          coupon_code: string | null
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          payment_email: string | null
          payment_method: string | null
          status: string
          total_paid: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          code: string
          commission_rate?: number | null
          coupon_code?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          payment_email?: string | null
          payment_method?: string | null
          status?: string
          total_paid?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          code?: string
          commission_rate?: number | null
          coupon_code?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          payment_email?: string | null
          payment_method?: string | null
          status?: string
          total_paid?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      commissions: {
        Row: {
          affiliate_id: string
          amount: number
          created_at: string
          id: string
          notes: string | null
          order_id: string | null
          rate: number | null
          status: string
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          amount: number
          created_at?: string
          id?: string
          notes?: string | null
          order_id?: string | null
          rate?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          amount?: number
          created_at?: string
          id?: string
          notes?: string | null
          order_id?: string | null
          rate?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliate_stats"
            referencedColumns: ["affiliate_id"]
          },
          {
            foreignKeyName: "commissions_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          current_uses: number | null
          description: string | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          min_purchase_cents: number | null
          starts_at: string | null
          stripe_coupon_id: string | null
          stripe_promo_id: string | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          current_uses?: number | null
          description?: string | null
          discount_type: string
          discount_value: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_purchase_cents?: number | null
          starts_at?: string | null
          stripe_coupon_id?: string | null
          stripe_promo_id?: string | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          current_uses?: number | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_purchase_cents?: number | null
          starts_at?: string | null
          stripe_coupon_id?: string | null
          stripe_promo_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      inventory_logs: {
        Row: {
          change_type: string
          created_at: string
          id: string
          new_quantity: number
          notes: string | null
          product_id: string | null
          quantity_change: number
          user_id: string | null
        }
        Insert: {
          change_type: string
          created_at?: string
          id?: string
          new_quantity: number
          notes?: string | null
          product_id?: string | null
          quantity_change: number
          user_id?: string | null
        }
        Update: {
          change_type?: string
          created_at?: string
          id?: string
          new_quantity?: number
          notes?: string | null
          product_id?: string | null
          quantity_change?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_logs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: string
          items: Json
          order_number: string
          shipping_address: Json | null
          status: string
          total_amount: number
          tracking_number: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          items?: Json
          order_number: string
          shipping_address?: Json | null
          status?: string
          total_amount: number
          tracking_number?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          items?: Json
          order_number?: string
          shipping_address?: Json | null
          status?: string
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      product_registrations: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          newsletter_opt_in: boolean | null
          phone: string | null
          product_name: string
          purchase_date: string
          purchase_location: string | null
          serial_number: string | null
          state: string | null
          status: string
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          newsletter_opt_in?: boolean | null
          phone?: string | null
          product_name: string
          purchase_date: string
          purchase_location?: string | null
          serial_number?: string | null
          state?: string | null
          status?: string
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          newsletter_opt_in?: boolean | null
          phone?: string | null
          product_name?: string
          purchase_date?: string
          purchase_location?: string | null
          serial_number?: string | null
          state?: string | null
          status?: string
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          low_stock_threshold: number | null
          name: string
          original_price_cents: number | null
          price_cents: number
          sku: string | null
          slug: string | null
          stock_quantity: number | null
          stripe_price_id: string | null
          stripe_product_id: string | null
          track_inventory: boolean | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          low_stock_threshold?: number | null
          name: string
          original_price_cents?: number | null
          price_cents: number
          sku?: string | null
          slug?: string | null
          stock_quantity?: number | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          track_inventory?: boolean | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          low_stock_threshold?: number | null
          name?: string
          original_price_cents?: number | null
          price_cents?: number
          sku?: string | null
          slug?: string | null
          stock_quantity?: number | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          track_inventory?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_leads: {
        Row: {
          created_at: string
          discount_code: string | null
          email: string
          email_sent: boolean | null
          id: string
          quiz_answers: Json | null
          recommended_product: string
        }
        Insert: {
          created_at?: string
          discount_code?: string | null
          email: string
          email_sent?: boolean | null
          id?: string
          quiz_answers?: Json | null
          recommended_product: string
        }
        Update: {
          created_at?: string
          discount_code?: string | null
          email?: string
          email_sent?: boolean | null
          id?: string
          quiz_answers?: Json | null
          recommended_product?: string
        }
        Relationships: []
      }
      shipping_countries: {
        Row: {
          base_rate_cents: number
          country_code: string
          country_name: string
          created_at: string
          free_shipping_threshold_cents: number | null
          id: string
          is_enabled: boolean | null
          notes: string | null
          updated_at: string
        }
        Insert: {
          base_rate_cents?: number
          country_code: string
          country_name: string
          created_at?: string
          free_shipping_threshold_cents?: number | null
          id?: string
          is_enabled?: boolean | null
          notes?: string | null
          updated_at?: string
        }
        Update: {
          base_rate_cents?: number
          country_code?: string
          country_name?: string
          created_at?: string
          free_shipping_threshold_cents?: number | null
          id?: string
          is_enabled?: boolean | null
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string | null
          id: string
          metadata: Json | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      upsell_analytics: {
        Row: {
          created_at: string
          device_name: string
          device_price: number | null
          device_product_id: string
          device_quantity: number | null
          event_type: string
          id: string
          session_id: string | null
          subscription_name: string | null
          subscription_price: number | null
          subscription_product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          device_name: string
          device_price?: number | null
          device_product_id: string
          device_quantity?: number | null
          event_type: string
          id?: string
          session_id?: string | null
          subscription_name?: string | null
          subscription_price?: number | null
          subscription_product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          device_name?: string
          device_price?: number | null
          device_product_id?: string
          device_quantity?: number | null
          event_type?: string
          id?: string
          session_id?: string | null
          subscription_name?: string | null
          subscription_price?: number | null
          subscription_product_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      affiliate_stats: {
        Row: {
          affiliate_id: string | null
          code: string | null
          commission_count: number | null
          email: string | null
          name: string | null
          paid_commissions: number | null
          pending_commissions: number | null
          total_commissions: number | null
        }
        Relationships: []
      }
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
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
