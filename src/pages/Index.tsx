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
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 rounded-xl shadow-sm">
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

        <div className="grid grid-cols-1 gap-6">
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
