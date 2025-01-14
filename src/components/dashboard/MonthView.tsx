import { startOfMonth, endOfMonth, format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type MarketingItem = {
  id: number;
  title: string;
  scheduled_date: string | null;
  description: string | null;
};

type GroupedItems = Record<string, MarketingItem[]>;

export function MonthView() {
  const { toast } = useToast();
  const startDate = startOfMonth(new Date());
  const endDate = endOfMonth(startDate);

  const { data: marketingItems = [], isError } = useQuery({
    queryKey: ['marketing_content', startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      console.log('Fetching marketing items for the month:', {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      });

      const { data, error } = await supabase
        .from('marketing_content')
        .select('id, title, scheduled_date, description')
        .gte('scheduled_date', startDate.toISOString())
        .lte('scheduled_date', endDate.toISOString())
        .order('scheduled_date');

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

  if (isError) {
    return <p>Error loading marketing items.</p>;
  }

  const groupedItems = marketingItems.reduce<GroupedItems>((acc, item) => {
    const date = item.scheduled_date ? format(new Date(item.scheduled_date), 'yyyy-MM-dd') : 'Unscheduled';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(groupedItems).map(([date, items]) => (
        <div key={date} className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">
            {date === 'Unscheduled' ? date : format(new Date(date), 'MMMM d, yyyy')}
          </h2>
          <div className="grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-card rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md">
                <h3 className="font-semibold mb-2 text-primary">{item.title}</h3>
                {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}