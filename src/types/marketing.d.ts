
export interface MarketingItem {
  id: number;
  title: string;
  description: string | null;
  content_type: string;
  event_type?: string;
  start_date?: string;
  end_date?: string;
  scheduled_date?: string;
  photo_examples: string | null;
  photo_key_points: string | null;
  rejection_reason?: string;
  status: string;
  theme?: string;
  caption?: string;
  visuals_notes?: string | null;
  key_notes?: string | null;
  created_at?: string;
  gym_id?: number;
  total_posts?: number;
}

export interface EmailContent {
  id: number;
  title: string;
  subject_line: string;
  preview_text?: string | null;
  body_content: string;
  scheduled_date?: string;
  gym_id?: number;
  status?: string;
  rejection_reason?: string | null;
  created_at?: string;
}

export interface CalendarEvent extends MarketingItem {
  type: 'marketing' | 'email';
}
