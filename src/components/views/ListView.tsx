import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { TaskPreview } from "@/components/calendar/TaskPreview";

export function ListView() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          marketing_items (
            *
          )
        `)
        .order('due_date');
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) return <div className="animate-pulse space-y-4">
    {[1,2,3].map(i => (
      <div key={i} className="h-32 bg-muted rounded-lg" />
    ))}
  </div>;

  return (
    <div className="space-y-4 animate-fade-in">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4">
          <TaskPreview task={task} isDialog />
        </Card>
      ))}
    </div>
  );
}