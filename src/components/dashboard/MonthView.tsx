import { useState } from "react";
import { startOfMonth, endOfMonth, format, addMonths, subMonths } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MarketingItem {
  id: number;
  title: string;
  content_type: string;
  description: string | null;
  scheduled_date: string | null;
  theme?: string | null;
}

type GroupedItems = Record<string, MarketingItem[]>;

export function MonthView() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  const { data: marketingItems = [], isError } = useQuery({
    queryKey: ['marketing_content', startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      console.log('Fetching marketing items for the month:', {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      });

      const { data, error } = await supabase
        .from('marketing_content')
        .select('id, title, content_type, description, scheduled_date, theme')
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

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const groupedItems = marketingItems.reduce<GroupedItems>((acc, item) => {
    if (!item.scheduled_date) return acc;
    const date = format(new Date(item.scheduled_date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  if (isError) {
    return <p className="text-destructive">Error loading marketing items.</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {Object.entries(groupedItems).map(([date, items]) => (
        <div key={date} className="space-y-4">
          <h3 className="text-xl font-semibold">
            {format(new Date(date), 'MMMM d, yyyy')}
          </h3>
          <div className="grid gap-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-card rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-primary">{item.title}</h4>
                  <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
                    {item.content_type}
                  </span>
                </div>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                )}
                {item.theme && (
                  <p className="text-xs text-primary mt-2">Theme: {item.theme}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {Object.keys(groupedItems).length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No content scheduled for {format(currentDate, 'MMMM yyyy')}.
        </p>
      )}
    </div>
  );
}