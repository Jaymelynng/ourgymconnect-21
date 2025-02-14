
export interface MarketingItem {
  id: number;
  title: string;
  description: string;
  content_type: string;
  scheduled_date: string;
  photo_examples: string;
  photo_key_points: string;
  rejection_reason?: string;
  status: string;
  theme?: string;
  caption?: string;
  visuals_notes?: string;
  key_notes?: string;
  created_at?: string;
  gym_id?: number;
  total_posts?: number;
}

export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  event_type?: string;
  status?: string;
  gym_id?: number;
}

export interface EmailContent {
  id: number;
  title: string;
  subject_line: string;
  preview_text?: string;
  body_content: string;
  scheduled_date?: string;
  gym_id?: number;
  status?: string;
  rejection_reason?: string;
  created_at?: string;
}
