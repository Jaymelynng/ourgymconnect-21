import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { Card } from "@/components/ui/card";
import { TaskPreview } from "@/components/calendar/TaskPreview";

export function WeeklyView() {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', format(today, 'yyyy-w')],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          marketing_items (
            *
          )
        `)
        .gte('due_date', weekStart.toISOString())
        .lte('due_date', weekEnd.toISOString());
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) return <div className="animate-pulse space-y-4">
    {[1,2,3].map(i => (
      <div key={i} className="h-32 bg-muted rounded-lg" />
    ))}
  </div>;

  const getTasksForDay = (date: Date) => {
    return tasks?.filter(task => 
      format(new Date(task.due_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="grid grid-cols-7 gap-4 animate-fade-in">
      {days.map((day) => (
        <div key={day.toString()} className="space-y-2">
          <h3 className="font-medium text-center p-2 bg-primary/10 rounded-md">
            {format(day, 'EEE do')}
          </h3>
          <div className="space-y-2">
            {getTasksForDay(day).map((task) => (
              <Card key={task.id} className="p-2">
                <TaskPreview task={task} />
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}