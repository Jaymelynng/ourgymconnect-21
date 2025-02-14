
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
import { Home } from "lucide-react";
import type { DashboardSection } from "@/types/database";

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
      return data as DashboardSection[];
    }
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 md:p-8 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-3">
              <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3 animate-scale-in flex items-center gap-2">
                <Home className="h-8 w-8 text-primary animate-scale-in" />
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

        <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle>News & Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingSections ? (
              <div className="animate-pulse space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="h-32 bg-muted rounded-lg" />
                ))}
              </div>
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

        <div className="w-full animate-fade-in">
          <CalendarView />
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
