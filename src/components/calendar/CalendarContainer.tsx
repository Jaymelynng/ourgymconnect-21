
import { useState, useCallback } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import type { MarketingItem, CalendarEvent } from "@/types/marketing";

export function CalendarContainer() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { toast } = useToast();
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const { data: marketingItems, isLoading, error, refetch } = useQuery({
    queryKey: ['marketing_content', format(currentDate, 'yyyy-MM')],
    queryFn: async () => {
      try {
        console.group("=== Marketing Items Fetch ===");
        console.log("Query Parameters:", {
          currentMonth: format(currentDate, 'yyyy-MM'),
          calendarStart: format(calendarStart, 'yyyy-MM-dd HH:mm:ss'),
          calendarEnd: format(calendarEnd, 'yyyy-MM-dd HH:mm:ss'),
          currentTimestamp: new Date().toISOString()
        });
        
        const { data, error } = await supabase
          .from('marketing_content')
          .select('*')
          .gte('scheduled_date', calendarStart.toISOString())
          .lte('scheduled_date', calendarEnd.toISOString())
          .order('scheduled_date');
        
        if (error) {
          console.error("Supabase Query Error:", error);
          console.groupEnd();
          toast({
            title: "Error fetching marketing items",
            description: error.message,
            variant: "destructive",
          });
          return [];
        }
        
        console.log("Raw Supabase Response:", {
          totalItems: data?.length || 0,
          data: data
        });
        
        if (!data || data.length === 0) {
          console.log("No marketing items found in date range");
          console.groupEnd();
          return [];
        }

        const parsedData = data.map(item => ({
          ...item,
          type: 'marketing' as const
        })) as CalendarEvent[];
        
        console.log("Final Processed Data:", {
          totalProcessedItems: parsedData.length,
          items: parsedData.map(item => ({
            id: item.id,
            title: item.title,
            scheduled_date: item.scheduled_date ? format(new Date(item.scheduled_date), 'yyyy-MM-dd HH:mm:ss') : null
          }))
        });
        console.groupEnd();
        return parsedData;
      } catch (error) {
        console.error("Failed to fetch marketing items:", error);
        console.groupEnd();
        toast({
          title: "Error fetching marketing items",
          description: "Please try again later",
          variant: "destructive",
        });
        return [];
      }
    },
    staleTime: 0,
    retry: 2
  });

  const nextMonth = useCallback(() => setCurrentDate(addMonths(currentDate, 1)), [currentDate]);
  const prevMonth = useCallback(() => setCurrentDate(subMonths(currentDate, 1)), [currentDate]);

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-destructive">
          Error loading calendar data. Please try refreshing the page.
        </div>
      </Card>
    );
  }

  if (isLoading) {
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
      <CalendarGrid 
        currentDate={currentDate}
        marketingItems={marketingItems || []}
        refetchItems={refetch}
      />
    </Card>
  );
}
