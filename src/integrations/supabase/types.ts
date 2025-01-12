export interface EmailContentType {
  id: number;
  subject_line?: string;
  preview_text?: string;
  body_content?: string;
  scheduled_date?: string;
  gym_id?: number;
  series_name?: string;
  series_order?: number;
  total_posts?: number;
  created_at?: string;
  updated_at?: string;
  status?: 'pending_approval' | 'approved' | 'rejected';
}
