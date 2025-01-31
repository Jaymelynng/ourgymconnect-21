import { useState, useCallback } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { MarketingItem } from "@/types/database";

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState('week');
  const { toast } = useToast();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['marketing_content', format(currentDate, 'yyyy-MM')],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('marketing_content')
          .select('*')
          .gte('scheduled_date', calendarStart.toISOString())
          .lte('scheduled_date', calendarEnd.toISOString())
          .order('scheduled_date');

        if (error) throw error;
        return data as MarketingItem[];
      } catch (error) {
        console.error('Error fetching calendar events:', error);
        toast({
          title: "Error fetching calendar events",
          description: "Please try again later",
          variant: "destructive",
        });
        return [];
      }
    }
  });

  const nextMonth = useCallback(() => setCurrentDate(addMonths(currentDate, 1)), [currentDate]);
  const prevMonth = useCallback(() => setCurrentDate(subMonths(currentDate, 1)), [currentDate]);

  if (isLoading) {
    return <Card className="p-4 animate-pulse h-[400px]" />;
  }

  return (
    <Card className="p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-primary">Calendar View</h3>
        <div className="flex gap-2">
          <Button 
            variant={viewType === 'week' ? 'default' : 'secondary'}
            onClick={() => setViewType('week')}
          >
            Week
          </Button>
          <Button 
            variant={viewType === 'month' ? 'default' : 'secondary'}
            onClick={() => setViewType('month')}
          >
            Month
          </Button>
          <Button 
            variant={viewType === 'list' ? 'default' : 'secondary'}
            onClick={() => setViewType('list')}
          >
            List
          </Button>
        </div>
      </div>
      
      {viewType === 'week' && <WeekView events={events} />}
      {viewType === 'month' && <MonthView events={events} />}
      {viewType === 'list' && <ListView events={events} />}
    </Card>
  );
}
