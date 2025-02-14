
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfWeek, endOfWeek, subWeeks, addWeeks, isBefore } from "date-fns";
import { MetricCard } from "@/components/MetricCard";
import { Clock, CheckCircle2, AlertCircle, CalendarClock } from "lucide-react";

export function MetricsGrid() {
  const currentDate = new Date();
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const lastWeekStart = subWeeks(weekStart, 1);
  const nextWeekEnd = addWeeks(weekEnd, 1);

  // Tasks due this week
  const { data: currentWeekTasks = 0 } = useQuery({
    queryKey: ['marketing_tasks', 'current_week'],
    queryFn: async () => {
      const { count } = await supabase
        .from('marketing_tasks')
        .select('*', { count: 'exact', head: true })
        .gte('due_date', weekStart.toISOString())
        .lte('due_date', weekEnd.toISOString())
        .eq('status', 'Pending');

      return count || 0;
    }
  });

  // Overdue tasks from last week
  const { data: overdueTasks = 0 } = useQuery({
    queryKey: ['marketing_tasks', 'overdue'],
    queryFn: async () => {
      const { count } = await supabase
        .from('marketing_tasks')
        .select('*', { count: 'exact', head: true })
        .gte('due_date', lastWeekStart.toISOString())
        .lt('due_date', weekStart.toISOString())
        .eq('status', 'Pending');

      return count || 0;
    }
  });

  // Upcoming tasks for next week
  const { data: upcomingTasks = 0 } = useQuery({
    queryKey: ['marketing_tasks', 'upcoming'],
    queryFn: async () => {
      const { count } = await supabase
        .from('marketing_tasks')
        .select('*', { count: 'exact', head: true })
        .gt('due_date', weekEnd.toISOString())
        .lte('due_date', nextWeekEnd.toISOString())
        .eq('status', 'Pending');

      return count || 0;
    }
  });

  // Completed tasks this week
  const { data: completedTasks = 0 } = useQuery({
    queryKey: ['marketing_tasks', 'completed'],
    queryFn: async () => {
      const { count } = await supabase
        .from('marketing_tasks')
        .select('*', { count: 'exact', head: true })
        .gte('due_date', weekStart.toISOString())
        .lte('due_date', weekEnd.toISOString())
        .eq('status', 'Completed');

      return count || 0;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Due This Week"
        value={`${currentWeekTasks} Tasks`}
        description="Tasks scheduled for this week"
        icon={<Clock className="h-5 w-5 text-blue-500" />}
        className="bg-blue-50 border-blue-100"
      />
      <MetricCard
        title="Completed"
        value={`${completedTasks} Tasks`}
        description="Completed tasks this week"
        icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
        className="bg-green-50 border-green-100"
      />
      <MetricCard
        title="Overdue"
        value={`${overdueTasks} Tasks`}
        description="Tasks overdue from last week"
        icon={<AlertCircle className="h-5 w-5 text-red-500" />}
        className="bg-red-50 border-red-100"
      />
      <MetricCard
        title="Upcoming"
        value={`${upcomingTasks} Tasks`}
        description="Tasks scheduled for next week"
        icon={<CalendarClock className="h-5 w-5 text-purple-500" />}
        className="bg-purple-50 border-purple-100"
      />
    </div>
  );
}
