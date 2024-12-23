import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const { data: tasks } = useQuery({
    queryKey: ['tasks', format(currentDate, 'yyyy-MM')],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
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

  return (
    <Card className="p-6 animate-fade-in bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevMonth}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextMonth}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dayTasks = getTasksForDay(day);
          return (
            <Button
              key={day.toString()}
              variant="ghost"
              className={cn(
                "h-12 relative transition-all duration-200",
                "hover:bg-primary/10 hover:scale-105 transform",
                !isSameMonth(day, currentDate) && "text-muted-foreground opacity-50",
                isToday(day) && "bg-primary/10 font-bold text-primary",
                "focus:ring-2 focus:ring-primary/20 focus:outline-none"
              )}
            >
              {format(day, "d")}
              {dayTasks && dayTasks.length > 0 && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Button>
          );
        })}
      </div>
    </Card>
  );
}