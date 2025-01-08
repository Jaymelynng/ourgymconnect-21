import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface MarketingItem {
  id: number;
  title: string;
  content_type?: string;
  description?: string;
  scheduled_date?: string;
  photo_examples?: string;
  photo_key_points?: string;
  theme?: string;
  caption?: string;
}

export function useMarketingContent(startDate?: Date, endDate?: Date) {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['marketing_content', startDate?.toISOString(), endDate?.toISOString()],
    queryFn: async () => {
      console.log('Fetching marketing items:', {
        start: startDate?.toISOString(),
        end: endDate?.toISOString()
      });

      let query = supabase
        .from('marketing_content')
        .select('id, title, content_type, description, scheduled_date, photo_examples, photo_key_points, theme, caption')
        .order('scheduled_date');

      if (startDate) {
        query = query.gte('scheduled_date', startDate.toISOString());
      }
      if (endDate) {
        query = query.lte('scheduled_date', endDate.toISOString());
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching marketing items:', error);
        toast({
          title: "Error fetching content",
          description: "Please try again later",
          variant: "destructive",
        });
        throw error;
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}