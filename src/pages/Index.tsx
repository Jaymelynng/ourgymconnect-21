
import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ContentCreator } from "@/components/content/ContentCreator";
import { useState } from "react";

const Index = () => {
  const { toast } = useToast();
  const [showContentCreator, setShowContentCreator] = useState(false);

  const { data: marketingContent, isLoading: isLoadingContent } = useQuery({
    queryKey: ['marketing_content'],
    queryFn: async () => {
      console.log('Fetching marketing content...');
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .order('scheduled_date', { ascending: true });
      
      if (error) {
        console.error('Error fetching marketing content:', error);
        toast({
          title: "Error",
          description: "Failed to fetch content",
          variant: "destructive",
        });
        return [];
      }
      return data || [];
    }
  });

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

        <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in">
          <CardContent className="space-y-4 p-6">
            {isLoadingContent ? (
              <p className="text-muted-foreground">Loading content...</p>
            ) : !marketingContent?.length ? (
              <p className="text-muted-foreground">No content available</p>
            ) : (
              marketingContent.map((content) => (
                <div 
                  key={content.id} 
                  className="bg-card rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-primary/5"
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
