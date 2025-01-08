import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, isValid } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface MarketingItem {
  id: number;
  title: string;
  description?: string;
  content_type?: string;
  scheduled_date?: string;
  photo_examples?: string;
}

type GroupedItems = Record<string, MarketingItem[]>;

export function ListView() {
  const { toast } = useToast();

  const { data: marketingItems = {}, isLoading } = useQuery({
    queryKey: ['marketing_content'],
    queryFn: async () => {
      try {
        console.log('Fetching marketing items for list view');
        const { data, error } = await supabase
          .from('marketing_content')
          .select('id, title, description, content_type, scheduled_date, photo_examples')
          .order('scheduled_date');
        
        if (error) {
          console.error('Error fetching marketing items:', error);
          toast({
            title: "Error fetching content",
            description: "Please try again later",
            variant: "destructive",
          });
          throw error;
        }

        const groupedItems = (data || []).reduce<GroupedItems>((acc, item) => {
          // Validate the date before parsing
          const date = item.scheduled_date && isValid(parseISO(item.scheduled_date))
            ? format(parseISO(item.scheduled_date), 'yyyy-MM-dd')
            : 'Unscheduled';

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {});

        console.log('Grouped marketing items:', groupedItems);
        return groupedItems;
      } catch (error) {
        console.error('Failed to process marketing items:', error);
        toast({
          title: "Error processing content",
          description: "There was an error organizing the content",
          variant: "destructive",
        });
        return {};
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
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

  if (Object.keys(marketingItems).length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No content scheduled</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {Object.entries(marketingItems).map(([date, items]) => (
        <div key={date} className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">
            {date === 'Unscheduled' ? date : format(parseISO(date), 'MMMM d, yyyy')}
          </h2>
          <div className="grid gap-4">
            {items.map((item) => (
              <Card key={item.id} className="p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                    {item.description && (
                      <p className="text-muted-foreground">{item.description}</p>
                    )}
                    {item.content_type && (
                      <Badge variant="secondary" className="mt-2">
                        {item.content_type}
                      </Badge>
                    )}
                  </div>
                  {item.photo_examples && (
                    <img 
                      src={item.photo_examples} 
                      alt={`Preview for ${item.title}`}
                      className="w-16 h-16 rounded-lg object-cover shadow-sm"
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}