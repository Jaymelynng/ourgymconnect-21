import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, startOfMonth, endOfMonth } from "date-fns";
import { Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type MarketingItem = Tables<'marketing_content', 'Row'>;
type GroupedItems = Record<string, MarketingItem[]>;

export function MonthView() {
  const { toast } = useToast();
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const { data: marketingItems = {} } = useQuery<GroupedItems>({
    queryKey: ['marketing_content', monthStart.toISOString(), monthEnd.toISOString()],
    queryFn: async () => {
      console.log('Fetching marketing items for month view:', {
        start: monthStart.toISOString(),
        end: monthEnd.toISOString()
      });

      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .gte('scheduled_date', monthStart.toISOString())
        .lte('scheduled_date', monthEnd.toISOString())
        .order('scheduled_date');
      
      if (error) {
        console.error('Error fetching marketing items:', error);
        toast({
          title: "Error fetching content",
          description: "Please try again later",
          variant: "destructive",
        });
        return {};
      }

      // Group items by date
      const groupedItems = (data || []).reduce((acc: GroupedItems, item: MarketingItem) => {
        if (item.scheduled_date) {
          const date = format(parseISO(item.scheduled_date), 'yyyy-MM-dd');
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
        }
        return acc;
      }, {});

      return groupedItems;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return (
    <div className="grid grid-cols-7 gap-2">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center text-sm font-medium p-2 text-muted-foreground">
          {day}
        </div>
      ))}
      {Object.entries(marketingItems).map(([date, items]) => (
        <div
          key={date}
          className="aspect-square rounded-lg transition-all cursor-pointer hover:shadow-lg bg-primary/80 group hover:bg-primary"
        >
          <div className="h-full p-2 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-primary-foreground text-sm">
                {format(parseISO(date), 'd')}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-primary-foreground/90">
                  {items.length} task{items.length !== 1 ? 's' : ''}
                </span>
                {items[0]?.photo_examples ? (
                  <img 
                    src={items[0].photo_examples} 
                    alt="" 
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <Image className="w-4 h-4 text-primary-foreground/70" />
                )}
              </div>
            </div>
            <div className="text-xs text-primary-foreground mt-1 line-clamp-3 group-hover:line-clamp-none">
              {items[0]?.title}
            </div>
            {items[0]?.theme && (
              <div className="text-xs text-primary-foreground/80 mt-1">
                {items[0].theme}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}