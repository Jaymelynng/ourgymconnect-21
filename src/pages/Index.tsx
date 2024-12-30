import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  // Fetch dashboard sections for news and updates
  const { data: dashboardSections } = useQuery({
    queryKey: ['dashboard_sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dashboard_sections')
        .select('*')
        .order('priority', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch marketing content for upcoming posts
  const { data: upcomingContent } = useQuery({
    queryKey: ['upcoming_marketing_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .gte('scheduled_date', new Date().toISOString())
        .order('scheduled_date')
        .limit(5);
      
      if (error) throw error;
      return data || [];
    }
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold text-foreground mb-3 animate-scale-in">
          Gym Marketing Dashboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Welcome to your all-in-one marketing toolkit. Create, manage, and schedule your content across all locations.
        </p>
      </div>

      <MetricsGrid />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* News and Updates Column */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>News & Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardSections?.filter(section => section.active).map((section) => (
              <div key={section.id} className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-2 text-primary">{section.section_name}</h3>
                <p className="text-sm text-muted-foreground">
                  {section.content}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Ideas & Inspiration Column */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ideas & Inspiration for Your Gym</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingContent?.map((content) => (
              <div key={content.id} className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-2 text-primary">{content.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {content.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <CalendarView />
    </div>
  );
};

export default Index;