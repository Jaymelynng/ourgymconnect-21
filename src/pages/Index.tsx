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
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { toast } = useToast();
  const [showContentCreator, setShowContentCreator] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const { error } = await supabase.auth.signInWithPassword({
          email: 'demo@example.com',
          password: 'demo123',
        });
        if (error) {
          console.error('Auth error:', error);
          toast({
            title: "Authentication Error",
            description: "Please check your credentials",
            variant: "destructive",
          });
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, [toast]);

  // Fetch dashboard sections for news and updates
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
          title: "Error loading dashboard sections",
          description: "Please try refreshing the page",
          variant: "destructive",
        });
        throw error;
      }
      console.log('Dashboard sections:', data);
      return data || [];
    },
    enabled: isAuthenticated,
    retry: 3,
    retryDelay: 1000,
  });

  // Fetch marketing content for upcoming posts
  const { data: upcomingContent, isLoading: isLoadingContent } = useQuery({
    queryKey: ['upcoming_marketing_content'],
    queryFn: async () => {
      console.log('Fetching upcoming content...');
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .gte('scheduled_date', new Date().toISOString())
        .order('scheduled_date', { ascending: true })
        .limit(5);
      
      if (error) {
        console.error('Error fetching upcoming content:', error);
        toast({
          title: "Error loading upcoming content",
          description: "Please try refreshing the page",
          variant: "destructive",
        });
        throw error;
      }
      console.log('Upcoming content:', data);
      return data || [];
    },
    enabled: isAuthenticated,
    retry: 3,
    retryDelay: 1000,
  });

  const renderSkeleton = () => (
    <div className="space-y-4">
      {[1,2,3].map(i => (
        <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3 animate-scale-in">
              Gym Marketing Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Welcome to your all-in-one marketing toolkit. Create, manage, and schedule your content across all locations.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => setShowContentCreator(true)}
            className="animate-fade-in"
          >
            Create Content
          </Button>
        </div>
      </div>

      <MetricsGrid />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* News and Updates Column */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>News & Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {isLoadingSections ? (
                  renderSkeleton()
                ) : !dashboardSections?.length ? (
                  <p className="text-muted-foreground">No news or updates available</p>
                ) : (
                  dashboardSections?.filter(section => section.active).map((section) => (
                    <div key={section.id} className="bg-card rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold mb-2 text-primary">{section.section_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {section.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Ideas & Inspiration Column */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ideas & Inspiration for Your Gym</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {isLoadingContent ? (
                  renderSkeleton()
                ) : !upcomingContent?.length ? (
                  <p className="text-muted-foreground">No upcoming content available</p>
                ) : (
                  upcomingContent?.map((content) => (
                    <div key={content.id} className="bg-card rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold mb-2 text-primary">{content.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {content.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <CalendarView />
      
      {showContentCreator && (
        <ContentCreator />
      )}
    </div>
  );
};

export default Index;