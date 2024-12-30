import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function WeeklyView() {
  const { toast } = useToast();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['marketing_content'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('marketing_content')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching marketing content:', error);
        toast({
          title: "Error fetching content",
          description: "Please try again later",
          variant: "destructive",
        });
        return [];
      }
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="mb-2">
            <h4 className="font-medium text-sm">{item.title}</h4>
            {item.content_type && (
              <Badge variant="secondary" className="mt-1 text-xs">
                {item.content_type}
              </Badge>
            )}
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="details">
              <AccordionTrigger className="text-xs">View Details</AccordionTrigger>
              <AccordionContent>
                {item.description && (
                  <div className="mb-2">
                    <h5 className="text-xs font-medium">Description</h5>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  Created: {format(new Date(item.created_at), 'MMM d, yyyy')}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}
    </div>
  );
}