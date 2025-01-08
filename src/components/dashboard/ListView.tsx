import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ListView() {
  const { data: marketingItems = [], isLoading } = useQuery({
    queryKey: ['marketing_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .order('scheduled_date');
      
      if (error) throw error;
      
      const groupedItems = (data || []).reduce((acc: Record<string, typeof data>, item) => {
        const date = item.scheduled_date ? format(parseISO(item.scheduled_date), 'yyyy-MM-dd') : 'Unscheduled';
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});

      return groupedItems;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 animate-pulse bg-primary/5 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(marketingItems).map(([date, items]) => (
        <div key={date} className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">
            {date === 'Unscheduled' ? date : format(parseISO(date), 'MMMM d, yyyy')}
          </h2>
          {(items as any[]).map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                  )}
                  {item.content_type && (
                    <Badge variant="secondary">{item.content_type}</Badge>
                  )}
                </div>
                {item.photo_examples && (
                  <img 
                    src={item.photo_examples} 
                    alt="" 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}