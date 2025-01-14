import { MetricCard } from "@/components/MetricCard";
import { BarChart3, Mail, Calendar, Image } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { addDays, startOfMonth, endOfMonth } from "date-fns";

export function MetricsGrid() {
  const today = new Date();
  const nextWeek = addDays(today, 7);
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  // Fetch tasks due in the next 7 days
  const { data: tasksDueSoon = 0 } = useQuery({
    queryKey: ['tasks_due_soon'],
    queryFn: async () => {
      console.log('Fetching tasks due soon...');
      const { count } = await supabase
        .from('marketing_tasks')
        .select('*', { count: 'exact', head: true })
        .gte('due_date', today.toISOString())
        .lte('due_date', nextWeek.toISOString());
      return count || 0;
    }
  });

  // Fetch pending emails
  const { data: pendingEmails = 0 } = useQuery({
    queryKey: ['pending_emails'],
    queryFn: async () => {
      console.log('Fetching pending emails...');
      const { count } = await supabase
        .from('email_content')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      return count || 0;
    }
  });

  // Fetch scheduled posts for current month
  const { data: scheduledPosts = 0 } = useQuery({
    queryKey: ['scheduled_posts'],
    queryFn: async () => {
      console.log('Fetching scheduled posts...');
      const { count } = await supabase
        .from('marketing_content')
        .select('*', { count: 'exact', head: true })
        .gte('scheduled_date', monthStart.toISOString())
        .lte('scheduled_date', monthEnd.toISOString());
      return count || 0;
    }
  });

  // Fetch total media items
  const { data: uploadedMedia = 0 } = useQuery({
    queryKey: ['uploaded_media'],
    queryFn: async () => {
      console.log('Fetching uploaded media...');
      const { count } = await supabase
        .from('marketing_content')
        .select('*', { count: 'exact', head: true })
        .not('photo_examples', 'is', null);
      return count || 0;
    }
  });

  const metrics = [
    { 
      title: 'Tasks Due Soon',
      value: `${tasksDueSoon}`,
      description: 'Next 7 days',
      icon: <BarChart3 className="h-4 w-4" />
    },
    { 
      title: 'Pending Emails',
      value: `${pendingEmails}`,
      description: 'Pending approval',
      icon: <Mail className="h-4 w-4" />
    },
    { 
      title: 'Scheduled Posts',
      value: `${scheduledPosts}`,
      description: 'This month',
      icon: <Calendar className="h-4 w-4" />
    },
    { 
      title: 'Uploaded Media',
      value: `${uploadedMedia}`,
      description: 'Total assets',
      icon: <Image className="h-4 w-4" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
        />
      ))}
    </div>
  );
}