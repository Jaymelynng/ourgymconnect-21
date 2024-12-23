import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

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

  return (
    <Card className="p-6 animate-fade-in bg-card shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-primary" />
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
          <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dayTasks = getTasksForDay(day);
          const hasEvents = dayTasks && dayTasks.length > 0;
          
          return (
            <HoverCard key={day.toString()}>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "h-24 relative transition-all duration-200 p-2 flex flex-col items-start justify-start",
                    "hover:bg-primary/10 hover:scale-105 transform",
                    !isSameMonth(day, currentDate) && "text-muted-foreground opacity-50",
                    isToday(day) && "bg-primary/10 font-bold text-primary",
                    hasEvents && "border-l-4 border-primary",
                    "focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  )}
                >
                  <span className="text-sm font-semibold mb-1">{format(day, "d")}</span>
                  {hasEvents && (
                    <div className="w-full space-y-1">
                      {dayTasks.slice(0, 2).map((task) => (
                        <div 
                          key={task.id} 
                          className="text-xs truncate text-left bg-accent/10 rounded px-1 py-0.5"
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayTasks.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </Button>
              </HoverCardTrigger>
              {hasEvents && (
                <HoverCardContent 
                  className="w-80 p-0 bg-card shadow-lg animate-scale-in"
                  align="start"
                >
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-lg text-foreground">
                      {format(day, "MMMM d, yyyy")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'}
                    </p>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {dayTasks.map((task) => (
                      <div 
                        key={task.id}
                        className="p-4 border-b border-border last:border-0 hover:bg-accent/5 transition-colors"
                      >
                        <h4 className="font-medium text-foreground">{task.title}</h4>
                        {task.marketing_items && (
                          <p className="text-sm text-accent mt-1">
                            Series: {task.marketing_items.title}
                          </p>
                        )}
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            task.status === 'pending' && "bg-primary/20 text-primary",
                            task.status === 'completed' && "bg-green-100 text-green-700",
                          )}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </HoverCardContent>
              )}
            </HoverCard>
          );
        })}
      </div>
    </Card>
  );
}