
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { MarketingItem } from "@/types/marketing";

export function ContentSeriesSection() {
  const { toast } = useToast();

  const { data: contentSeries = [], isLoading } = useQuery({
    queryKey: ['content_series'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('marketing_content')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        return data as MarketingItem[];
      } catch (error) {
        console.error('Error fetching content series:', error);
        toast({
          title: "Error fetching content series",
          description: "Please try again later",
          variant: "destructive",
        });
        return [];
      }
    }
  });

  if (isLoading) {
    return <Card className="p-4 animate-pulse h-[200px]" />;
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-primary mb-4">Recent Content Series</h3>
      <div className="space-y-2">
        {contentSeries.map((series) => (
          <div
            key={series.id}
            className="p-3 rounded-lg transition-all cursor-pointer hover:bg-accent"
          >
            <div className="text-sm font-medium">{series.title}</div>
            <div className="text-sm text-muted-foreground">{series.content_type}</div>
          </div>
        ))}
        {contentSeries.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-4">
            No content series available
          </div>
        )}
      </div>
    </Card>
  );
}
