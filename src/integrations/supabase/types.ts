export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']

export interface EmailContentType {
  id: number;
  title: string;
  subject_line: string;
  preview_text?: string;
  body_content: string;
  scheduled_date?: string;
  gym_id?: number;
  series_name?: string;
  series_order?: number;
  total_posts?: number;
  created_at?: string;
  updated_at?: string;
  status?: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
}

export interface MarketingContent {
  id: number;
  title: string;
  content_type: string;
  description?: string;
  scheduled_date: string;
  photo_examples?: string;
  photo_key_points?: string;
  created_at: string;
  updated_at: string;
}
