import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarHeader } from "./calendar/CalendarHeader";
import { CalendarDay } from "./calendar/CalendarDay";
import { useToast } from "@/hooks/use-toast";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const { toast } = useToast();
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const { data: marketingItems, isLoading: marketingLoading, error: marketingError, refetch } = useQuery({
    queryKey: ['marketing_content', format(currentDate, 'yyyy-MM')],
    queryFn: async () => {
      try {
        console.log("Fetching marketing items for:", format(currentDate, 'yyyy-MM'));
        console.log("Date range:", calendarStart.toISOString(), "to", calendarEnd.toISOString());
        
        const { data, error } = await supabase
          .from('marketing_content')
          .select('*')
          .or(`scheduled_date.gte.${calendarStart.toISOString()},scheduled_date.lte.${calendarEnd.toISOString()}`)
          .order('scheduled_date');
        
        if (error) {
          console.error("Error fetching marketing items:", error);
          toast({
            title: "Error fetching marketing items",
            description: "Please try again later",
            variant: "destructive",
          });
          return [];
        }
        
        const parsedData = data?.map(item => ({
          ...item,
          scheduled_date: item.scheduled_date ? parseISO(item.scheduled_date) : null
        })) || [];
        
        console.log("Fetched and parsed marketing items:", parsedData);
        return parsedData;
      } catch (error) {
        console.error("Failed to fetch marketing items:", error);
        toast({
          title: "Error fetching marketing items",
          description: "Please try again later",
          variant: "destructive",
        });
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 2
  });

  const nextMonth = useCallback(() => setCurrentDate(addMonths(currentDate, 1)), [currentDate]);
  const prevMonth = useCallback(() => setCurrentDate(subMonths(currentDate, 1)), [currentDate]);

  const getItemsForDay = useCallback((date: Date) => {
    const dayMarketingItems = marketingItems?.filter(item => 
      item.scheduled_date && format(item.scheduled_date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    ) || [];

    return {
      marketingItems: dayMarketingItems,
      hasItems: dayMarketingItems.length > 0
    };
  }, [marketingItems]);

  if (marketingError) {
    return (
      <Card className="p-6">
        <div className="text-center text-destructive">
          Error loading calendar data. Please try refreshing the page.
        </div>
      </Card>
    );
  }

  if (marketingLoading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-[800px] bg-muted rounded-lg" />
      </Card>
    );
  }

  return (
    <Card className="p-6 animate-fade-in bg-card shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />
      
      <div className="grid grid-cols-7 border-t border-l border-border">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div 
            key={day} 
            className="text-sm font-medium text-muted-foreground p-2 text-center border-b border-r border-border"
          >
            {day}
          </div>
        ))}
        
        {days.map((day) => {
          const { marketingItems: dayMarketingItems, hasItems } = getItemsForDay(day);
          return (
            <CalendarDay
              key={day.toString()}
              day={day}
              currentDate={currentDate}
              tasks={[]}
              marketingItems={dayMarketingItems}
              hasItems={hasItems}
              onDayClick={() => setSelectedDay(day)}
              refetchItems={refetch}
            />
          );
        })}
      </div>
    </Card>
  );
}