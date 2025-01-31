import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ContentCreator } from "@/components/content/ContentCreator";
import { useState } from "react";

const Index = () => {
  const { toast } = useToast();
  const [showContentCreator, setShowContentCreator] = useState(false);

  const { data: dashboardSections, isLoading: isLoadingSections } = useQuery({
    queryKey: ['dashboard_sections'],
    queryFn: async () => {
      console.log('Fetching dashboard sections...');
      const { data, error } = await supabase
        .from('dashboard_sections')
        .select('*')
        .order('priority', { ascending: true });
      
      if (error) {
        console.error('Error fetching dashboard sections:', error);
        toast({
          title: "Error",
          description: "Failed to fetch dashboard sections",
          variant: "destructive",
        });
        return [];
      }
      return data || [];
    }
  });

  const { data: upcomingContent, isLoading: isLoadingContent } = useQuery({
    queryKey: ['upcoming_marketing_content'],
    queryFn: async () => {
      console.log('Fetching upcoming content...');
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .gte('scheduled_date', new Date().toISOString())
        .order('scheduled_date')
        .limit(5);
      
      if (error) {
        console.error('Error fetching upcoming content:', error);
        toast({
          title: "Error",
          description: "Failed to fetch upcoming content",
          variant: "destructive",
        });
        return [];
      }
      return data || [];
    }
  });

  const renderSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full animate-pulse" />
      <Skeleton className="h-24 w-full animate-pulse delay-150" />
      <Skeleton className="h-24 w-full animate-pulse delay-300" />
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 md:p-8 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-3">
              <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3 animate-scale-in">
                Gym Marketing Dashboard
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                Welcome to your all-in-one marketing toolkit. Create, manage, and schedule your content across all locations.
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => setShowContentCreator(true)}
              className="animate-fade-in hover:animate-hover-scale w-full md:w-auto"
            >
              Create Content
            </Button>
          </div>
        </div>

        <MetricsGrid />

        <div className="w-full animate-fade-in">
          <CalendarView />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* News and Updates Column */}
          <Card className="col-span-1 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <CardHeader>
              <CardTitle>News & Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingSections ? (
                renderSkeleton()
              ) : !dashboardSections?.length ? (
                <p className="text-muted-foreground">No news or updates available</p>
              ) : (
                dashboardSections?.filter(section => section.active).map((section, index) => (
                  <div 
                    key={section.id} 
                    className="bg-card rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-primary/5"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <h3 className="font-semibold mb-2 text-primary">{section.section_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.content}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Ideas & Inspiration Column */}
          <Card className="col-span-1 transition-all duration-300 hover:shadow-lg animate-fade-in delay-150">
            <CardHeader>
              <CardTitle>Ideas & Inspiration for Your Gym</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingContent ? (
                renderSkeleton()
              ) : !upcomingContent?.length ? (
                <p className="text-muted-foreground">No upcoming content available</p>
              ) : (
                upcomingContent?.map((content, index) => (
                  <div 
                    key={content.id} 
                    className="bg-card rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-primary/5"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <h3 className="font-semibold mb-2 text-primary">{content.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {content.description}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <ContentCreator 
          open={showContentCreator} 
          onOpenChange={setShowContentCreator}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;