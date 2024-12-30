import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardSections() {
  const { toast } = useToast();

  const { data: dashboardSections, isLoading } = useQuery({
    queryKey: ['dashboard_sections'],
    queryFn: async () => {
      try {
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
          return [];
        }
        console.log('Dashboard sections:', data);
        return data || [];
      } catch (error) {
        console.error('Error:', error);
        return [];
      }
    },
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) {
    return <div>Loading sections...</div>;
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>News & Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {!dashboardSections?.length ? (
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
  );
}