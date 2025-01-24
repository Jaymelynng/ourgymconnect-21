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
      try {
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

        console.log('Fetched marketing items:', data);
        return data || [];
      } catch (error) {
        // If offline, return cached data
        console.log('Offline mode - returning cached data');
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 24 * 60 * 60 * 1000, // Keep cache for 30 days
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}