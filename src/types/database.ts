
export interface GymDetails {
  id: number;
  gym_name: string;
  instagram_url?: string;
  facebook_url?: string;
  sharepoint_url?: string;
  created_at: string;
}

export interface MarketingContent {
  id: number;
  title: string;
  description?: string;
  content_type: string;
  scheduled_date?: string;
  photo_examples?: string[];
  photo_key_points?: string;
  theme?: string;
  caption?: string;
  gym_id?: number;
  created_at: string;
  status?: string;
}

export interface EmailContent {
  id: number;
  title: string;
  subject_line: string;
  preview_text?: string;
  body_content: string;
  status?: string;
  scheduled_date?: string;
  gym_id?: number;
  created_at: string;
  rejection_reason?: string;
}

export interface MarketingTask {
  id: number;
  content_id?: number;
  task_type: string;
  task_name: string;
  due_date?: string;
  status?: string;
  assigned_to?: string;
  created_at: string;
  parent_task_id?: number;
}

export type MarketingItem = MarketingContent;
