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
      dashboard_sections: {
        Row: {
          active: boolean | null
          content: string | null
          created_at: string | null
          id: number
          priority: number | null
          section_name: string
        }
        Insert: {
          active?: boolean | null
          content?: string | null
          created_at?: string | null
          id?: number
          priority?: number | null
          section_name: string
        }
        Update: {
          active?: boolean | null
          content?: string | null
          created_at?: string | null
          id?: number
          priority?: number | null
          section_name?: string
        }
        Relationships: []
      }
      email_details: {
        Row: {
          body_content: string
          content_id: number | null
          created_at: string | null
          id: number
          preview_text: string | null
          status: string | null
          subject_line: string
        }
        Insert: {
          body_content: string
          content_id?: number | null
          created_at?: string | null
          id?: number
          preview_text?: string | null
          status?: string | null
          subject_line: string
        }
        Update: {
          body_content?: string
          content_id?: number | null
          created_at?: string | null
          id?: number
          preview_text?: string | null
          status?: string | null
          subject_line?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_details_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "marketing_content"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_details: {
        Row: {
          created_at: string | null
          facebook_url: string | null
          gym_name: string
          id: number
          instagram_url: string | null
          sharepoint_url: string | null
        }
        Insert: {
          created_at?: string | null
          facebook_url?: string | null
          gym_name: string
          id?: never
          instagram_url?: string | null
          sharepoint_url?: string | null
        }
        Update: {
          created_at?: string | null
          facebook_url?: string | null
          gym_name?: string
          id?: never
          instagram_url?: string | null
          sharepoint_url?: string | null
        }
        Relationships: []
      }
      in_gym_details: {
        Row: {
          content_id: number | null
          created_at: string | null
          format: string
          id: number
          placement_locations: string[] | null
          print_quantity: number | null
          size: string | null
        }
        Insert: {
          content_id?: number | null
          created_at?: string | null
          format: string
          id?: number
          placement_locations?: string[] | null
          print_quantity?: number | null
          size?: string | null
        }
        Update: {
          content_id?: number | null
          created_at?: string | null
          format?: string
          id?: number
          placement_locations?: string[] | null
          print_quantity?: number | null
          size?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "in_gym_details_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "marketing_content"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_content: {
        Row: {
          caption: string | null
          content_type: string
          created_at: string | null
          description: string | null
          gym_id: number | null
          id: number
          photo_examples: string[] | null
          photo_key_points: string | null
          rejection_reason: string | null
          scheduled_date: string | null
          status: string | null
          theme: string | null
          title: string
        }
        Insert: {
          caption?: string | null
          content_type: string
          created_at?: string | null
          description?: string | null
          gym_id?: number | null
          id?: never
          photo_examples?: string[] | null
          photo_key_points?: string | null
          rejection_reason?: string | null
          scheduled_date?: string | null
          status?: string | null
          theme?: string | null
          title: string
        }
        Update: {
          caption?: string | null
          content_type?: string
          created_at?: string | null
          description?: string | null
          gym_id?: number | null
          id?: never
          photo_examples?: string[] | null
          photo_key_points?: string | null
          rejection_reason?: string | null
          scheduled_date?: string | null
          status?: string | null
          theme?: string | null
          title?: string
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
          parent_task_id: number | null
          status: string | null
          task_name: string
          task_type: string
        }
        Insert: {
          assigned_to?: string | null
          content_id?: number | null
          created_at?: string | null
          due_date?: string | null
          id?: never
          parent_task_id?: number | null
          status?: string | null
          task_name: string
          task_type: string
        }
        Update: {
          assigned_to?: string | null
          content_id?: number | null
          created_at?: string | null
          due_date?: string | null
          id?: never
          parent_task_id?: number | null
          status?: string | null
          task_name?: string
          task_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketing_tasks_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "marketing_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketing_tasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "marketing_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      social_media_details: {
        Row: {
          caption: string | null
          content_id: number | null
          created_at: string | null
          id: number
          photo_examples: string[] | null
          photo_key_points: string | null
          platform: string
        }
        Insert: {
          caption?: string | null
          content_id?: number | null
          created_at?: string | null
          id?: number
          photo_examples?: string[] | null
          photo_key_points?: string | null
          platform: string
        }
        Update: {
          caption?: string | null
          content_id?: number | null
          created_at?: string | null
          id?: number
          photo_examples?: string[] | null
          photo_key_points?: string | null
          platform?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_media_details_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "marketing_content"
            referencedColumns: ["id"]
          },
        ]
      }
      toolkit_items: {
        Row: {
          category: string | null
          color: string | null
          created_at: string | null
          gym_id: number | null
          icon: string
          id: number
          is_enabled: boolean | null
          name: string
          sort_order: number | null
          type: string
          url: string | null
        }
        Insert: {
          category?: string | null
          color?: string | null
          created_at?: string | null
          gym_id?: number | null
          icon: string
          id?: number
          is_enabled?: boolean | null
          name: string
          sort_order?: number | null
          type: string
          url?: string | null
        }
        Update: {
          category?: string | null
          color?: string | null
          created_at?: string | null
          gym_id?: number | null
          icon?: string
          id?: number
          is_enabled?: boolean | null
          name?: string
          sort_order?: number | null
          type?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "toolkit_items_gym_id_fkey"
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
      [_ in never]: never
    }
    Enums: {
      approval_status: "Pending" | "Approved" | "Needs Revision"
      content_type: "Photo" | "Video" | "Email" | "Social Media"
      email_task_status: "Pending" | "In Progress" | "Completed"
      gym_location:
        | "Capital Gymnastics – Cedar Park"
        | "Capital Gymnastics – Pflugerville"
        | "Capital Gymnastics – Round Rock"
        | "Houston Gymnastics Academy"
        | "Rowland Ballard – Atascocita"
        | "Rowland Ballard – Kingwood"
        | "Oasis Gymnastics"
        | "Estrella Gymnastics"
        | "Scottsdale Gymnastics"
        | "Tigar Gymnastics"
      task_status: "Pending" | "In Progress" | "Completed"
      task_type: "Social Media" | "Email" | "In-Gym Marketing" | "FYI"
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
