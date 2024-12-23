import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarHeader } from "./calendar/CalendarHeader";
import { CalendarDay } from "./calendar/CalendarDay";
import { TaskDialog } from "./calendar/TaskDialog";
import { useToast } from "@/components/ui/use-toast";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<any[]>([]);
  const { toast } = useToast();
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useQuery({
    queryKey: ['tasks', format(currentDate, 'yyyy-MM')],
    queryFn: async () => {
      try {
        console.log("Fetching tasks for:", format(currentDate, 'yyyy-MM'));
        const { data, error } = await supabase
          .from('tasks')
          .select(`
            *,
            marketing_items (*)
          `)
          .gte('due_date', monthStart.toISOString())
          .lte('due_date', monthEnd.toISOString())
          .order('due_date');
        
        if (error) {
          console.error("Error fetching tasks:", error);
          throw error;
        }
        
        console.log("Fetched tasks:", data);
        return data || [];
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        toast({
          title: "Error fetching tasks",
          description: "Please try again later",
          variant: "destructive",
        });
        return [];
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2
  });

  // Fetch marketing items that don't have associated tasks
  const { data: standaloneMarketingItems, isLoading: marketingLoading, error: marketingError } = useQuery({
    queryKey: ['marketing_items', format(currentDate, 'yyyy-MM')],
    queryFn: async () => {
      try {
        console.log("Fetching marketing items for:", format(currentDate, 'yyyy-MM'));
        const { data, error } = await supabase
          .from('marketing_items')
          .select('*')
          .gte('created_at', monthStart.toISOString())
          .lte('created_at', monthEnd.toISOString())
          .order('created_at');
        
        if (error) {
          console.error("Error fetching marketing items:", error);
          throw error;
        }
        
        console.log("Fetched marketing items:", data);
        return data || [];
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
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2
  });

  const nextMonth = useCallback(() => setCurrentDate(addMonths(currentDate, 1)), [currentDate]);
  const prevMonth = useCallback(() => setCurrentDate(subMonths(currentDate, 1)), [currentDate]);

  const getItemsForDay = useCallback((date: Date) => {
    // Get tasks for this day
    const dayTasks = tasks?.filter(task => 
      format(new Date(task.due_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    ) || [];

    // Get standalone marketing items for this day
    const dayMarketingItems = standaloneMarketingItems?.filter(item => 
      format(new Date(item.created_at), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    ) || [];

    return {
      tasks: dayTasks,
      marketingItems: dayMarketingItems,
      hasItems: dayTasks.length > 0 || dayMarketingItems.length > 0
    };
  }, [tasks, standaloneMarketingItems]);

  const handleDayClick = useCallback((date: Date, dayTasks: any[]) => {
    setSelectedDay(date);
    setSelectedTasks(dayTasks);
  }, []);

  if (tasksError || marketingError) {
    return (
      <Card className="p-6">
        <div className="text-center text-destructive">
          Error loading calendar data. Please try refreshing the page.
        </div>
      </Card>
    );
  }

  if (tasksLoading || marketingLoading) {
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
          const { tasks: dayTasks, marketingItems: dayMarketingItems, hasItems } = getItemsForDay(day);
          return (
            <CalendarDay
              key={day.toString()}
              day={day}
              currentDate={currentDate}
              tasks={dayTasks}
              marketingItems={dayMarketingItems}
              hasItems={hasItems}
              onDayClick={handleDayClick}
            />
          );
        })}
      </div>

      <TaskDialog
        selectedDay={selectedDay}
        selectedTasks={selectedTasks}
        onOpenChange={() => setSelectedDay(null)}
      />
    </Card>
  );
}
