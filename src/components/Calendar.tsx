import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Tag, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
            <HoverCard key={day.toString()} openDelay={200}>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "h-32 relative transition-all duration-200 p-2 flex flex-col items-start justify-start",
                    "hover:bg-primary/10 hover:scale-105 transform",
                    !isSameMonth(day, currentDate) && "text-muted-foreground opacity-50",
                    isToday(day) && "bg-primary/10 font-bold text-primary",
                    hasEvents && "border-l-4 border-primary",
                    "focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
                  )}
                  onClick={() => handleDayClick(day, dayTasks || [])}
                >
                  <span className="text-sm font-semibold mb-1">{format(day, "d")}</span>
                  {hasEvents && (
                    <div className="w-full space-y-1">
                      {dayTasks.slice(0, 3).map((task) => (
                        <div 
                          key={task.id} 
                          className="text-xs truncate text-left bg-accent/10 rounded px-1 py-0.5"
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayTasks.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </Button>
              </HoverCardTrigger>
              {hasEvents && (
                <HoverCardContent 
                  className="w-96 p-0 bg-card shadow-lg animate-scale-in"
                  align="start"
                >
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      {format(day, "MMMM d, yyyy")}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'} scheduled
                    </p>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto divide-y divide-border">
                    {dayTasks.map((task) => (
                      <div 
                        key={task.id}
                        className="p-4 hover:bg-accent/5 transition-colors space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-foreground">{task.title}</h4>
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            task.status === 'pending' && "bg-primary/20 text-primary",
                            task.status === 'completed' && "bg-green-100 text-green-700",
                          )}>
                            {task.status}
                          </span>
                        </div>
                        {task.marketing_items && (
                          <p className="text-sm text-accent flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            Series: {task.marketing_items.title}
                          </p>
                        )}
                        {task.description && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            {task.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due: {format(new Date(task.due_date), "h:mm a")}
                        </p>
                      </div>
                    ))}
                  </div>
                </HoverCardContent>
              )}
            </HoverCard>
          );
        })}
      </div>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-primary" />
              Tasks for {selectedDay ? format(selectedDay, "MMMM d, yyyy") : ""}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {selectedTasks.map((task) => (
              <div 
                key={task.id}
                className="bg-card rounded-lg border border-border p-6 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-foreground">{task.title}</h3>
                  <span className={cn(
                    "text-sm px-3 py-1 rounded-full",
                    task.status === 'pending' && "bg-primary/20 text-primary",
                    task.status === 'completed' && "bg-green-100 text-green-700",
                  )}>
                    {task.status}
                  </span>
                </div>

                {task.marketing_items && (
                  <div className="bg-accent/5 rounded-md p-4">
                    <h4 className="font-medium text-accent mb-2 flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Marketing Series: {task.marketing_items.title}
                    </h4>
                    {task.marketing_items.caption && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Caption: {task.marketing_items.caption}
                      </p>
                    )}
                    {task.marketing_items.key_notes && (
                      <div className="text-sm text-muted-foreground">
                        <strong>Key Notes:</strong>
                        <p>{task.marketing_items.key_notes}</p>
                      </div>
                    )}
                  </div>
                )}

                {task.description && (
                  <div className="text-muted-foreground">
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Description
                    </h4>
                    <p>{task.description}</p>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Due: {format(new Date(task.due_date), "h:mm a")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}