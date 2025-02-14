
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
}

export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  type?: string;
  status?: string;
}
