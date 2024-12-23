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

  const { data: tasks } = useQuery({
    queryKey: ['tasks', format(currentDate, 'yyyy-MM')],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          marketing_items (
            *
          )
        `)
        .gte('due_date', monthStart.toISOString())
        .lte('due_date', monthEnd.toISOString());
      
      if (error) throw error;
      return data || [];
    }
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getTasksForDay = (date: Date) => {
    return tasks?.filter(task => 
      format(new Date(task.due_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const handleDayClick = (date: Date, dayTasks: any[]) => {
    setSelectedDay(date);
    setSelectedTasks(dayTasks);
  };

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
        {days.map((day) => (
          <CalendarDay
            key={day.toString()}
            day={day}
            currentDate={currentDate}
            tasks={getTasksForDay(day) || []}
            onDayClick={handleDayClick}
          />
        ))}
      </div>

      <TaskDialog
        selectedDay={selectedDay}
        selectedTasks={selectedTasks}
        onOpenChange={() => setSelectedDay(null)}
      />
    </Card>
  );
}