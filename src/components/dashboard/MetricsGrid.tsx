
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MetricCard } from "@/components/MetricCard";
import { Calendar, Mail, MessageSquare, Users } from "lucide-react";

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

  const { data: socialCount = 0 } = useQuery({
    queryKey: ['social_count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('social_media_details')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: gymCount = 0 } = useQuery({
    queryKey: ['gym_count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('gym_details')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Emails"
        value={emailCount}
        description="Email campaigns created"
        icon={<Mail className="h-4 w-4" />}
      />
      <MetricCard
        title="Social Posts"
        value={socialCount}
        description="Social media posts created"
        icon={<MessageSquare className="h-4 w-4" />}
      />
      <MetricCard
        title="Active Gyms"
        value={gymCount}
        description="Gyms using the platform"
        icon={<Users className="h-4 w-4" />}
      />
      <MetricCard
        title="This Month"
        value={0}
        description="Posts scheduled this month"
        icon={<Calendar className="h-4 w-4" />}
      />
    </div>
  );
}
