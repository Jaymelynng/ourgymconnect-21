
import { useQuery } from "@tanstack/react-query";
import { format, parseISO, startOfWeek, addDays, endOfWeek, isBefore } from "date-fns";
import { Calendar, Type, CheckSquare } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { MarketingTask } from "@/types/marketing";

interface DayTask {
  name: string;
  date: Date;
  tasks: MarketingTask[];
}

export function WeekView() {
  const [selectedDay, setSelectedDay] = useState<DayTask | null>(null);
  const today = new Date();

  const { data: marketingTasks = [] } = useQuery({
    queryKey: ['marketing_tasks'],
    queryFn: async () => {
      const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
      const endDate = endOfWeek(startDate, { weekStartsOn: 1 });
      
      console.log('Fetching marketing tasks for week:', {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      });

      const { data, error } = await supabase
        .from('marketing_tasks')
        .select('*')
        .gte('due_date', startDate.toISOString())
        .lte('due_date', endDate.toISOString())
        .order('due_date');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Get the start of the current week (Monday)
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  
  // Create an array of the 6 days (Mon-Sat)
  const weekDays = Array.from({ length: 6 }, (_, index) => {
    const date = addDays(startOfCurrentWeek, index);
    const dayTasks = marketingTasks.filter(item => 
      item.due_date && 
      format(parseISO(item.due_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    return {
      name: format(date, 'EEEE'),
      date: date,
      tasks: dayTasks
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Weekly Task Schedule</h2>
      <div className="grid grid-cols-6 gap-4">
        {weekDays.map((day) => (
          <div key={day.name}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "aspect-square rounded-lg transition-all duration-300 cursor-pointer",
                    "bg-primary/5 hover:bg-primary/20 group transform hover:scale-105",
                    "shadow-sm hover:shadow-md p-4",
                    isBefore(day.date, today) && day.tasks.length > 0 && "bg-red-50 hover:bg-red-100"
                  )}
                >
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className={cn(
                          "w-4 h-4",
                          isBefore(day.date, today) && day.tasks.length > 0 ? "text-red-500" : "text-primary/70"
                        )} />
                        <span className={cn(
                          "text-lg font-medium",
                          isBefore(day.date, today) && day.tasks.length > 0 ? "text-red-600" : "text-primary"
                        )}>
                          {format(day.date, 'd')}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {day.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Type className="w-4 h-4 text-primary/70" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {day.tasks.length > 0 ? 'Tasks Available' : 'No Tasks'}
                      </span>
                    </div>
                    
                    {day.tasks.length > 0 && (
                      <div className="mt-auto flex items-center gap-2 text-primary">
                        <CheckSquare className="w-4 h-4" />
                        <span className="text-sm">
                          {day.tasks.length} {day.tasks.length === 1 ? 'task' : 'tasks'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent 
                className="w-80 p-4 bg-card shadow-lg border-primary/10 animate-in fade-in-0 zoom-in-95"
                align="center"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-lg">{day.name}</h4>
                  </div>
                  {day.tasks.length > 0 ? (
                    <div className="space-y-2">
                      {day.tasks.map((task) => (
                        <div 
                          key={task.id || `${task.task_name}-${task.created_at}`}
                          className={cn(
                            "p-3 rounded-lg space-y-1",
                            isBefore(day.date, today) ? "bg-red-50" : "bg-primary/5"
                          )}
                        >
                          <p className="font-medium text-foreground">{task.task_name}</p>
                          <p className="text-sm text-muted-foreground">{task.task_type}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No tasks scheduled for this day.</p>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDay?.name} - {selectedDay?.date ? format(selectedDay.date, 'MMMM d, yyyy') : ''}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {selectedDay?.tasks.length ? (
              selectedDay.tasks.map((task) => (
                <div 
                  key={task.id || `${task.task_name}-${task.created_at}`}
                  className={cn(
                    "p-4 rounded-lg space-y-3 transition-colors",
                    isBefore(selectedDay.date, today) 
                      ? "bg-red-50 hover:bg-red-100"
                      : "bg-primary/5 hover:bg-primary/10"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-foreground">{task.task_name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {task.task_type}
                    </span>
                  </div>
                  {task.assigned_to && (
                    <p className="text-sm text-muted-foreground">
                      Assigned to: {task.assigned_to}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No tasks scheduled for this day.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
