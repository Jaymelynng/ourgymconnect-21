import { MarketingContent } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfWeek, endOfWeek } from "date-fns";

export type MarketingItem = MarketingContent;

export function useMarketingContent() {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDate = endOfWeek(startDate, { weekStartsOn: 1 });

  const { data: marketingItems = [], isLoading } = useQuery({
    queryKey: ['marketing_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .gte('scheduled_date', startDate.toISOString())
        .lte('scheduled_date', endDate.toISOString())
        .order('scheduled_date');
      
      if (error) throw error;
      return data as MarketingItem[];
    }
  });

  return {
    marketingItems,
    isLoading
  };
}
