import { useState } from "react";
import { Card } from "@/components/ui/card";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarHeader } from "./calendar/CalendarHeader";
import { CalendarDay } from "./calendar/CalendarDay";
import { TaskDialog } from "./calendar/TaskDialog";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<any[]>([]);
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Fetch tasks with their related marketing items
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks', format(currentDate, 'yyyy-MM')],
    queryFn: async () => {
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
    }
  });

  // Fetch marketing items that don't have associated tasks
  const { data: standaloneMarketingItems, isLoading: marketingLoading } = useQuery({
    queryKey: ['marketing_items', format(currentDate, 'yyyy-MM')],
    queryFn: async () => {
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
    }
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getItemsForDay = (date: Date) => {
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
  };

  const handleDayClick = (date: Date, dayTasks: any[]) => {
    setSelectedDay(date);
    setSelectedTasks(dayTasks);
  };

  if (tasksLoading || marketingLoading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-[800px] bg-muted rounded-lg" />
      </Card>
    );
  }

  return (
    <Card className="p-6 animate-fade-in bg-card shadow-sm hover:shadow-md transition-shadow duration-300 w-full min-h-[800px]">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />
      
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
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