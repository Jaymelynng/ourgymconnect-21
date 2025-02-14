import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, endOfMonth } from "date-fns";
import { MetricCard } from "@/components/MetricCard";
import { Calendar, Mail, Image, Clock } from "lucide-react";

export function MetricsGrid() {
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const { data: tasksDueSoon = 0 } = useQuery({
    queryKey: ['tasks_due_soon'],
    queryFn: async () => {
      console.log('Fetching tasks due soon...');
      const { count, error } = await supabase
        .from('marketing_tasks')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Pending')
        .gte('due_date', new Date().toISOString())
        .lte('due_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;
      return count || 0;
    }
  });

  const { data: pendingEmails = 0 } = useQuery({
    queryKey: ['pending_emails'],
    queryFn: async () => {
      console.log('Fetching pending emails...');
      const { count, error } = await supabase
        .from('email_content')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (error) throw error;
      return count || 0;
    }
  });

  const { data: scheduledPosts = 0 } = useQuery({
    queryKey: ['scheduled_posts'],
    queryFn: async () => {
      console.log('Fetching scheduled posts...');
      const { count, error } = await supabase
        .from('marketing_content')
        .select('*', { count: 'exact', head: true })
        .not('scheduled_date', 'is', null)
        .gte('scheduled_date', monthStart.toISOString())
        .lte('scheduled_date', monthEnd.toISOString());

      if (error) throw error;
      return count || 0;
    }
  });

  const { data: uploadedMedia = 0 } = useQuery({
    queryKey: ['uploaded_media'],
    queryFn: async () => {
      console.log('Fetching uploaded media...');
      const { count, error } = await supabase
        .from('marketing_content')
        .select('*', { count: 'exact', head: true })
        .not('photo_examples', 'is', null);

      if (error) throw error;
      return count || 0;
    }
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <MetricCard
        title="Tasks Due Soon"
        value={tasksDueSoon}
        description="Tasks due in the next 7 days"
        icon={<Clock className="h-4 w-4" />}
      />
      <MetricCard
        title="Pending Emails"
        value={pendingEmails}
        description="Emails awaiting approval"
        icon={<Mail className="h-4 w-4" />}
      />
      <MetricCard
        title="Scheduled Posts"
        value={scheduledPosts}
        description="Posts scheduled this month"
        icon={<Calendar className="h-4 w-4" />}
      />
      <MetricCard
        title="Uploaded Media"
        value={uploadedMedia}
        description="Total media assets"
        icon={<Image className="h-4 w-4" />}
      />
    </div>
  );
}