export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calendar_events: {
        Row: {
          created_at: string | null
          description: string | null
          email_content_id: number | null
          end_date: string | null
          event_type: Database["public"]["Enums"]["calendar_event_type"]
          gym_id: number | null
          id: number
          in_gym_content_id: number | null
          marketing_content_id: number | null
          social_media_content_id: number | null
          start_date: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          email_content_id?: number | null
          end_date?: string | null
          event_type: Database["public"]["Enums"]["calendar_event_type"]
          gym_id?: number | null
          id?: never
          in_gym_content_id?: number | null
          marketing_content_id?: number | null
          social_media_content_id?: number | null
          start_date: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          email_content_id?: number | null
          end_date?: string | null
          event_type?: Database["public"]["Enums"]["calendar_event_type"]
          gym_id?: number | null
          id?: never
          in_gym_content_id?: number | null
          marketing_content_id?: number | null
          social_media_content_id?: number | null
          start_date?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_email_content_id_fkey"
            columns: ["email_content_id"]
            isOneToOne: false
            referencedRelation: "email_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_in_gym_content_id_fkey"
            columns: ["in_gym_content_id"]
            isOneToOne: false
            referencedRelation: "in_gym_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_marketing_content_id_fkey"
            columns: ["marketing_content_id"]
            isOneToOne: false
            referencedRelation: "marketing_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_social_media_content_id_fkey"
            columns: ["social_media_content_id"]
            isOneToOne: false
            referencedRelation: "social_media_content"
            referencedColumns: ["id"]
          },
        ]
      }
      content_sections: {
        Row: {
          active: boolean | null
          content: string
          created_at: string | null
          gym_id: number | null
          id: number
          section_type: string
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          content: string
          created_at?: string | null
          gym_id?: number | null
          id?: number
          section_type: string
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          content?: string
          created_at?: string | null
          gym_id?: number | null
          id?: number
          section_type?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_sections_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_details"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_sections: {
        Row: {
          active: boolean | null
          content: string
          created_at: string | null
          id: number
          priority: number | null
          section_name: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          content: string
          created_at?: string | null
          id?: number
          priority?: number | null
          section_name: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          content?: string
          created_at?: string | null
          id?: number
          priority?: number | null
          section_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      email_content: {
        Row: {
          body_content: string | null
          created_at: string | null
          gym_id: number | null
          id: number
          preview_text: string | null
          scheduled_date: string | null
          series_name: string | null
          series_order: number | null
          subject_line: string | null
          title: string | null
          total_posts: number | null
          updated_at: string | null
        }
        Insert: {
          body_content?: string | null
          created_at?: string | null
          gym_id?: number | null
          id?: number
          preview_text?: string | null
          scheduled_date?: string | null
          series_name?: string | null
          series_order?: number | null
          subject_line?: string | null
          title?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Update: {
          body_content?: string | null
          created_at?: string | null
          gym_id?: number | null
          id?: number
          preview_text?: string | null
          scheduled_date?: string | null
          series_name?: string | null
          series_order?: number | null
          subject_line?: string | null
          title?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_content_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_details"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_details: {
        Row: {
          address: string | null
          code: string | null
          contact_email: string | null
          email_contact: string | null
          facebook_url: string | null
          gym_name: string
          id: number
          instagram_url: string | null
          manager: string | null
          phone_number: string | null
          sharepoint_url: string | null
          social_media_handle: string | null
          website_url: string | null
        }
        Insert: {
          address?: string | null
          code?: string | null
          contact_email?: string | null
          email_contact?: string | null
          facebook_url?: string | null
          gym_name: string
          id?: number
          instagram_url?: string | null
          manager?: string | null
          phone_number?: string | null
          sharepoint_url?: string | null
          social_media_handle?: string | null
          website_url?: string | null
        }
        Update: {
          address?: string | null
          code?: string | null
          contact_email?: string | null
          email_contact?: string | null
          facebook_url?: string | null
          gym_name?: string
          id?: number
          instagram_url?: string | null
          manager?: string | null
          phone_number?: string | null
          sharepoint_url?: string | null
          social_media_handle?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      gym_staff: {
        Row: {
          created_at: string | null
          gym_id: number | null
          id: number
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          gym_id?: number | null
          id?: number
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          gym_id?: number | null
          id?: number
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gym_staff_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_details"
            referencedColumns: ["id"]
          },
        ]
      }
      in_gym_content: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          gym_id: number | null
          id: number
          instructions: string | null
          materials_needed: string | null
          media_urls: string[] | null
          series_name: string | null
          series_order: number | null
          title: string | null
          total_posts: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          gym_id?: number | null
          id?: number
          instructions?: string | null
          materials_needed?: string | null
          media_urls?: string[] | null
          series_name?: string | null
          series_order?: number | null
          title?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          gym_id?: number | null
          id?: number
          instructions?: string | null
          materials_needed?: string | null
          media_urls?: string[] | null
          series_name?: string | null
          series_order?: number | null
          title?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "in_gym_content_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_details"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_content: {
        Row: {
          body_content: string | null
          caption: string | null
          content_type: string | null
          created_at: string | null
          day_number: string | null
          description: string | null
          due_date: string | null
          focus_area: string | null
          gym_id: number | null
          id: number
          instructions: string | null
          materials_needed: string | null
          media_urls: string[] | null
          photo_examples: string | null
          photo_key_points: string | null
          scheduled_date: string | null
          series_name: string | null
          series_order: number | null
          series_type: string | null
          subject_line: string | null
          theme: string | null
          title: string | null
          total_posts: number | null
          updated_at: string | null
        }
        Insert: {
          body_content?: string | null
          caption?: string | null
          content_type?: string | null
          created_at?: string | null
          day_number?: string | null
          description?: string | null
          due_date?: string | null
          focus_area?: string | null
          gym_id?: number | null
          id?: number
          instructions?: string | null
          materials_needed?: string | null
          media_urls?: string[] | null
          photo_examples?: string | null
          photo_key_points?: string | null
          scheduled_date?: string | null
          series_name?: string | null
          series_order?: number | null
          series_type?: string | null
          subject_line?: string | null
          theme?: string | null
          title?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Update: {
          body_content?: string | null
          caption?: string | null
          content_type?: string | null
          created_at?: string | null
          day_number?: string | null
          description?: string | null
          due_date?: string | null
          focus_area?: string | null
          gym_id?: number | null
          id?: number
          instructions?: string | null
          materials_needed?: string | null
          media_urls?: string[] | null
          photo_examples?: string | null
          photo_key_points?: string | null
          scheduled_date?: string | null
          series_name?: string | null
          series_order?: number | null
          series_type?: string | null
          subject_line?: string | null
          theme?: string | null
          title?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_content_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_details"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_tasks: {
        Row: {
          assigned_to: string | null
          content_id: number | null
          created_at: string | null
          due_date: string | null
          id: number
          priority: string | null
          status: string | null
          task_type: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          content_id?: number | null
          created_at?: string | null
          due_date?: string | null
          id?: number
          priority?: string | null
          status?: string | null
          task_type?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          content_id?: number | null
          created_at?: string | null
          due_date?: string | null
          id?: number
          priority?: string | null
          status?: string | null
          task_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_tasks_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "marketing_content"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_templates: {
        Row: {
          call_to_action: string | null
          content_type: string | null
          created_at: string | null
          email_signature: string | null
          focus_area: string | null
          id: number
          media_urls: string[] | null
          platform_specific_rules: Json | null
          preview_text: string | null
          scheduled_date: string | null
          series_name: string | null
          series_order: number | null
          series_type: string | null
          subject_line: string | null
          template_body: string
          template_name: string
          total_posts: number | null
        }
        Insert: {
          call_to_action?: string | null
          content_type?: string | null
          created_at?: string | null
          email_signature?: string | null
          focus_area?: string | null
          id?: number
          media_urls?: string[] | null
          platform_specific_rules?: Json | null
          preview_text?: string | null
          scheduled_date?: string | null
          series_name?: string | null
          series_order?: number | null
          series_type?: string | null
          subject_line?: string | null
          template_body: string
          template_name: string
          total_posts?: number | null
        }
        Update: {
          call_to_action?: string | null
          content_type?: string | null
          created_at?: string | null
          email_signature?: string | null
          focus_area?: string | null
          id?: number
          media_urls?: string[] | null
          platform_specific_rules?: Json | null
          preview_text?: string | null
          scheduled_date?: string | null
          series_name?: string | null
          series_order?: number | null
          series_type?: string | null
          subject_line?: string | null
          template_body?: string
          template_name?: string
          total_posts?: number | null
        }
        Relationships: []
      }
      social_media_content: {
        Row: {
          call_to_action: string | null
          caption: string | null
          created_at: string | null
          focus_area: string | null
          gym_id: number | null
          hashtags: string[] | null
          id: number
          media_urls: string[] | null
          photo_examples: string | null
          photo_key_points: string | null
          scheduled_date: string | null
          series_name: string | null
          series_order: number | null
          title: string | null
          total_posts: number | null
          updated_at: string | null
        }
        Insert: {
          call_to_action?: string | null
          caption?: string | null
          created_at?: string | null
          focus_area?: string | null
          gym_id?: number | null
          hashtags?: string[] | null
          id?: number
          media_urls?: string[] | null
          photo_examples?: string | null
          photo_key_points?: string | null
          scheduled_date?: string | null
          series_name?: string | null
          series_order?: number | null
          title?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Update: {
          call_to_action?: string | null
          caption?: string | null
          created_at?: string | null
          focus_area?: string | null
          gym_id?: number | null
          hashtags?: string[] | null
          id?: number
          media_urls?: string[] | null
          photo_examples?: string | null
          photo_key_points?: string | null
          scheduled_date?: string | null
          series_name?: string | null
          series_order?: number | null
          title?: string | null
          total_posts?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_media_content_gym_id_fkey"
            columns: ["gym_id"]
            isOneToOne: false
            referencedRelation: "gym_details"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_final_text: {
        Args: {
          p_marketing_item_id: string
          p_gym_id: string
        }
        Returns: string
      }
    }
    Enums: {
      calendar_event_type: "marketing" | "email" | "social" | "in_gym"
      lead_status: "hot" | "warm" | "cold"
      news_type: "news" | "focus" | "inspiration"
      task_priority: "high" | "medium" | "low"
      task_status: "pending" | "in_progress" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
