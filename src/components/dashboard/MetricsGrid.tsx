import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MetricCard } from "@/components/MetricCard";
import { Calendar, Mail, MessageSquare } from "lucide-react";

export function MetricsGrid() {
  const { data: emailCount = 0 } = useQuery({
    queryKey: ['email_count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('email_details')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: socialMediaCount = 0 } = useQuery({
    queryKey: ['social_media_count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('social_media_details')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: inGymCount = 0 } = useQuery({
    queryKey: ['in_gym_count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('in_gym_details')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: taskCount = 0 } = useQuery({
    queryKey: ['task_count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('marketing_tasks')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total Emails"
        value={emailCount}
        description="Total email campaigns created"
        icon={Mail}
      />
      <MetricCard
        title="Social Media Posts"
        value={socialMediaCount}
        description="Total social media posts scheduled"
        icon={MessageSquare}
      />
      <MetricCard
        title="In-Gym Marketing"
        value={inGymCount}
        description="Total in-gym marketing materials created"
        icon={Calendar}
      />
       <MetricCard
        title="Total Tasks"
        value={taskCount}
        description="Total marketing tasks created"
        icon={Calendar}
      />
    </div>
  );
}
