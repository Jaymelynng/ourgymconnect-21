import { useQuery } from "@tanstack/react-query";
import { format, parseISO, startOfWeek, endOfWeek, addDays } from "date-fns";
import { Image, Calendar, Type, CheckSquare, AlertCircle } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MarketingItem {
  id: number;
  title: string;
  content_type?: string;
  description?: string;
  scheduled_date: string;
  photo_examples?: string;
  photo_key_points?: string;
}

interface DayTask {
  name: string;
  date: Date;
  tasks: MarketingItem[];
}

export function WeekView() {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<DayTask | null>(null);

  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDate = endOfWeek(startDate, { weekStartsOn: 1 });

  const { data: marketingItems = [], isError } = useQuery({
    queryKey: ['marketing_content', startDate, endDate],
    queryFn: async () => {
      console.log('Fetching marketing items for week:', {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      });

      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .gte('scheduled_date', startDate.toISOString())
        .lte('scheduled_date', endDate.toISOString())
        .order('scheduled_date');
      
      if (error) {
        toast({
          title: "Error fetching content",
          description: "Please try again later",
          variant: "destructive",
        });
        throw error;
      }

      return data || [];
    }
  });

  if (isError) {
    return (
      <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10 text-destructive">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <p>Failed to load weekly content. Please try again later.</p>
        </div>
      </div>
    );
  }

  const weekDays = Array.from({ length: 6 }, (_, index) => {
    const date = addDays(startDate, index);
    const dayTasks = marketingItems.filter(item => 
      item.scheduled_date && 
      format(parseISO(item.scheduled_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    return {
      name: format(date, 'EEEE'),
      date,
      tasks: dayTasks
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Weekly Content Schedule</h2>
      <div className="grid grid-cols-6 gap-4">
        {weekDays.map((day) => (
          <div key={day.name}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div
                  onClick={() => setSelectedDay(day)}
                  className="aspect-square rounded-lg transition-all duration-300 cursor-pointer 
                           bg-primary/5 hover:bg-primary/20 group transform hover:scale-105 
                           shadow-sm hover:shadow-md p-4"
                >
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-primary text-lg font-medium">
                          {format(day.date, 'd')}
                        </span>
                      </div>
                      {day.tasks[0]?.photo_examples && (
                        <img 
                          src={day.tasks[0].photo_examples} 
                          alt="" 
                          className="w-8 h-8 rounded-full ring-2 ring-primary/20 transition-all duration-300 
                                   group-hover:ring-primary/40 shadow-sm"
                        />
                      )}
                    </div>
                    
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {day.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Type className="w-4 h-4 text-primary" />
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
                          key={task.id}
                          className="p-3 bg-primary/5 rounded-lg space-y-1"
                        >
                          <p className="font-medium text-foreground">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.content_type}</p>
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
                  key={task.id}
                  className="p-4 bg-primary/5 rounded-lg space-y-3 hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-foreground">{task.title}</h3>
                    {task.photo_examples && (
                      <img 
                        src={task.photo_examples} 
                        alt="" 
                        className="w-12 h-12 rounded-full ring-2 ring-primary/20"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {task.content_type}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  )}
                  {task.photo_key_points && (
                    <div className="text-sm text-muted-foreground">
                      <strong>Key Points:</strong> {task.photo_key_points}
                    </div>
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