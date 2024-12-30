import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UpcomingContent() {
  const { toast } = useToast();

  const { data: upcomingContent, isLoading } = useQuery({
    queryKey: ['upcoming_marketing_content'],
    queryFn: async () => {
      try {
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
          return [];
        }
        console.log('Upcoming content:', data);
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
    return <div>Loading content...</div>;
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Ideas & Inspiration for Your Gym</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {!upcomingContent?.length ? (
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
  );
}