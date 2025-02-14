
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import type { MarketingContent } from "@/types/database";

export function ContentSeriesSection() {
  const { data: seriesContent = [], isLoading } = useQuery({
    queryKey: ['content_series'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .eq('content_type', 'series')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as MarketingContent[];
    }
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-muted rounded-lg" />
          ))}
        </div>
      </Card>
    );
  }

  if (!seriesContent.length) {
    return null;
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Content Series</h3>
      <div className="space-y-4">
        {seriesContent.map((series) => (
          <div 
            key={series.id}
            className="p-4 bg-muted rounded-lg space-y-2"
          >
            <h4 className="font-medium">{series.title}</h4>
            <p className="text-sm text-muted-foreground">{series.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-primary">{series.content_type}</span>
              <span>•</span>
              <span className="text-muted-foreground">
                {series.scheduled_date ? new Date(series.scheduled_date).toLocaleDateString() : 'Not scheduled'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
