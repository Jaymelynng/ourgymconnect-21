
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import type { MarketingItem } from "@/types/marketing";

export function useMarketingContent(startDate: Date, endDate: Date) {
  return useQuery({
    queryKey: ['marketing_content', format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd')],
    queryFn: async () => {
      console.group('=== Fetching Marketing Content ===');
      console.log('Date Range:', {
        start: format(startDate, 'yyyy-MM-dd'),
        end: format(endDate, 'yyyy-MM-dd')
      });

      try {
        const { data, error } = await supabase
          .from('marketing_content')
          .select('*')
          .gte('scheduled_date', startDate.toISOString())
          .lte('scheduled_date', endDate.toISOString())
          .order('scheduled_date');

        if (error) {
          console.error('Supabase Error:', error);
          console.groupEnd();
          throw error;
        }

        if (!data) {
          console.log('No data returned');
          console.groupEnd();
          return [];
        }

        console.log('Fetched Items:', {
          count: data.length,
          items: data.map(item => ({
            id: item.id,
            title: item.title,
            scheduled_date: item.scheduled_date
          }))
        });

        console.groupEnd();
        return data as MarketingItem[];
      } catch (error) {
        console.error('Failed to fetch marketing content:', error);
        console.groupEnd();
        throw error;
      }
    }
  });
}

export type { MarketingItem };
