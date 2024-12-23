import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function WeeklyView() {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const { data: marketingItems, isLoading } = useQuery({
    queryKey: ['marketing_items', format(today, 'yyyy-w')],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_items')
        .select('*')
        .gte('created_at', weekStart.toISOString())
        .lte('created_at', weekEnd.toISOString());
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) return (
    <div className="animate-pulse space-y-4">
      {[1,2,3].map(i => (
        <div key={i} className="h-32 bg-muted rounded-lg" />
      ))}
    </div>
  );

  const getItemsForDay = (date: Date) => {
    return marketingItems?.filter(item => 
      format(new Date(item.created_at), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    ) || [];
  };

  return (
    <div className="grid grid-cols-7 gap-4 animate-fade-in">
      {days.map((day) => (
        <div key={day.toString()} className="space-y-2">
          <h3 className="font-medium text-center p-2 bg-primary/10 rounded-md">
            {format(day, 'EEE do')}
          </h3>
          <div className="space-y-2">
            {getItemsForDay(day).map((item) => (
              <Card key={item.id} className="p-4">
                <div className="mb-2">
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  {item.item_type && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {item.item_type}
                    </Badge>
                  )}
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="details">
                    <AccordionTrigger className="text-xs">View Details</AccordionTrigger>
                    <AccordionContent>
                      {item.visuals_notes && (
                        <div className="mb-2">
                          <h5 className="text-xs font-medium">Visuals for Managers</h5>
                          <p className="text-xs text-muted-foreground">{item.visuals_notes}</p>
                        </div>
                      )}
                      {item.key_notes && (
                        <div className="mb-2">
                          <h5 className="text-xs font-medium">Key Notes About the Post</h5>
                          <p className="text-xs text-muted-foreground">{item.key_notes}</p>
                        </div>
                      )}
                      {item.photo_examples && (
                        <div>
                          <h5 className="text-xs font-medium">Photo Examples</h5>
                          <p className="text-xs text-muted-foreground">{item.photo_examples}</p>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}