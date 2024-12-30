import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricsSection } from "@/components/dashboard/MetricsSection";
import { ContentSeriesSection } from "@/components/dashboard/ContentSeriesSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const { data: summerCampItems, isLoading } = useQuery({
    queryKey: ['marketing-content', 'summer-camp'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('marketing_content')
          .select('*')
          .or('title.ilike.%summer camp%,title.ilike.%half day%')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Tables<'marketing_content'>[];
      } catch (error) {
        console.error('Error fetching summer camp items:', error);
        toast({
          title: "Error fetching summer camp items",
          description: "Please try again later",
          variant: "destructive"
        });
        return [];
      }
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

      <Card>
        <CardHeader>
          <CardTitle>Summer Camp & Half Day Programs</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : summerCampItems && summerCampItems.length > 0 ? (
            <div className="space-y-4">
              {summerCampItems.map((item) => (
                <Card key={item.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  {item.description && (
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  )}
                  {item.content_type && (
                    <div className="mt-2 text-sm">
                      <strong>Type:</strong> {item.content_type}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No summer camp or half day programs found.
            </p>
          )}
        </CardContent>
      </Card>

      <MetricsSection />
      <ContentSeriesSection />
    </div>
  );
};

export default Index;