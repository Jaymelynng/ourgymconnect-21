
export interface MarketingContent {
  id: number;
  title: string;
  description?: string;
  content_type: string;
  scheduled_date?: string;
  gym_id?: number;
  created_at: string;
  status?: string;
  rejection_reason?: string;
  theme?: string;
}

export interface EmailDetails {
  id: number;
  content_id: number;
  subject_line: string;
  preview_text?: string;
  body_content: string;
  created_at: string;
}

export interface SocialMediaDetails {
  id: number;
  content_id: number;
  platform: string;
  photo_examples?: string[];
  photo_key_points?: string;
  caption?: string;
  created_at: string;
}

export interface InGymDetails {
  id: number;
  content_id: number;
  format: string;
  size?: string;
  print_quantity?: number;
  placement_locations?: string[];
  created_at: string;
}

export interface GymDetails {
  id: number;
  gym_name: string;
  instagram_url?: string;
  facebook_url?: string;
  sharepoint_url?: string;
  created_at: string;
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
}

export interface DashboardSection {
  id: number;
  section_name: string;
  content?: string;
  priority?: number;
  active?: boolean;
  created_at: string;
}

export interface ToolkitItem {
  id: number;
  name: string;
  icon: string;
  url?: string;
  color?: string;
  type: string;
  is_enabled: boolean;
  sort_order?: number;
  category?: string;
  gym_id?: number;
  created_at: string;
}

export interface DayTask {
  name: string;
  date: Date;
  tasks: MarketingContent[];
}
