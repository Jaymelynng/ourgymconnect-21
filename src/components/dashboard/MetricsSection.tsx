
import { MetricCard } from "@/components/MetricCard";
import { Calendar, ListTodo, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfWeek, endOfWeek, addDays } from "date-fns";

export function MetricsSection() {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);
  const nextWeek = addDays(today, 7);

  const { data: tasksThisWeek } = useQuery({
    queryKey: ['tasks_this_week'],
    queryFn: async () => {
      const { count } = await supabase
        .from('marketing_content')
        .select('*', { count: 'exact', head: true })
        .gte('scheduled_date', weekStart.toISOString())
        .lte('scheduled_date', weekEnd.toISOString());
      return count || 0;
    }
  });

  const { data: upcomingTasks } = useQuery({
    queryKey: ['upcoming_tasks'],
    queryFn: async () => {
      const { count } = await supabase
        .from('marketing_content')
        .select('*', { count: 'exact', head: true })
        .gt('scheduled_date', today.toISOString())
        .lte('scheduled_date', nextWeek.toISOString());
      return count || 0;
    }
  });

  const { data: activeContent } = useQuery({
    queryKey: ['active_content'],
    queryFn: async () => {
      const { count } = await supabase
        .from('marketing_content')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');
      return count || 0;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <MetricCard
        title="This Week's Tasks"
        value={`${tasksThisWeek || 0} Tasks`}
        icon={<Calendar className="h-5 w-5" />}
        description="Tasks scheduled for this week"
        className="bg-primary/10"
      />
      <MetricCard
        title="Upcoming Tasks"
        value={`${upcomingTasks || 0} Due`}
        icon={<ListTodo className="h-5 w-5" />}
        description="Tasks due in the next 7 days"
        className="bg-secondary/10"
      />
      <MetricCard
        title="Active Content"
        value={activeContent || 0}
        icon={<FileText className="h-5 w-5" />}
        description="Currently active marketing content"
        className="bg-accent/10"
      />
    </div>
  );
}
