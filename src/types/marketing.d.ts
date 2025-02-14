
export interface MarketingTask {
  id?: number;
  task_name: string;
  task_type: string;
  content_id?: number | null;
  assigned_to?: string | null;
  status?: string | null;
  due_date?: string | null;
  group_due_date?: string | null;
  parent_task_id?: number | null;
  created_at?: string | null;
}

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
  type?: 'marketing' | 'email';
}
