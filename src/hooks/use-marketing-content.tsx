import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export interface MarketingItem {
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
}

export function useMarketingContent(startDate: Date, endDate: Date) {
  return useQuery({
    queryKey: ['marketing_content', startDate, endDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .gte('scheduled_date', startDate.toISOString())
        .lte('scheduled_date', endDate.toISOString())
        .order('scheduled_date');

      if (error) throw error;
      return data as MarketingItem[];
    },
  });
}