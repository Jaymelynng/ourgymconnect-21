import { MetricCard } from "@/components/MetricCard";
import { Calendar, Building2, ListTodo } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, endOfMonth, addDays } from "date-fns";

export function MetricsSection() {
  const today = new Date();
  const startMonth = startOfMonth(today);
  const endMonth = endOfMonth(today);
  const nextWeek = addDays(today, 7);

  const { data: totalPosts } = useQuery({
    queryKey: ['marketing_content_count_month'],
    queryFn: async () => {
      const { count } = await supabase
        .from('marketing_content')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startMonth.toISOString())
        .lte('created_at', endMonth.toISOString());
      return count || 0;
    }
  });

  const { data: activeGyms } = useQuery({
    queryKey: ['active_gyms'],
    queryFn: async () => {
      const { count } = await supabase
        .from('gym_details')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: upcomingTasks } = useQuery({
    queryKey: ['upcoming_tasks'],
    queryFn: async () => {
      const { count } = await supabase
        .from('marketing_content')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString())
        .lte('created_at', nextWeek.toISOString());
      return count || 0;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <MetricCard
        title="Total Posts"
        value={`${totalPosts || 0} This month`}
        icon={<Calendar className="h-5 w-5" />}
        className="bg-primary/10"
      />
      <MetricCard
        title="Active Gyms"
        value={activeGyms || 0}
        icon={<Building2 className="h-5 w-5" />}
        className="bg-secondary/10"
      />
      <MetricCard
        title="Upcoming Tasks"
        value={`${upcomingTasks || 0} Next 7 days`}
        icon={<ListTodo className="h-5 w-5" />}
        className="bg-accent/10"
      />
    </div>
  );
}