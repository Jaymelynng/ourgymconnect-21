import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function ListView() {
  const { data: marketingItems, isLoading } = useQuery({
    queryKey: ['marketing_items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_items')
        .select('*')
        .order('created_at');
      
      if (error) throw error;
      
      // Group items by date
      const groupedItems = (data || []).reduce((acc: Record<string, typeof data>, item) => {
        const date = item.created_at ? format(new Date(item.created_at), 'yyyy-MM-dd') : 'No Date';
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});

      return groupedItems;
    }
  });

  if (isLoading) return (
    <div className="animate-pulse space-y-4">
      {[1,2,3].map(i => (
        <div key={i} className="h-32 bg-muted rounded-lg" />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {Object.entries(marketingItems || {}).map(([date, dateItems]) => (
        <div key={date} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              {date === 'No Date' ? date : format(new Date(date), 'MMMM d, yyyy')}
            </h2>
          </div>
          {(dateItems as any[]).map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium">{item.title}</h3>
                {item.item_type && (
                  <Badge variant="secondary" className="ml-2">
                    {item.item_type}
                  </Badge>
                )}
              </div>

              {item.caption && (
                <div className="mb-6 text-muted-foreground">
                  <p>{item.caption}</p>
                </div>
              )}
              
              <Accordion type="single" collapsible className="w-full space-y-2">
                <AccordionItem value="visuals" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      Visuals for Managers
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-muted-foreground">
                    {item.visuals_notes || 'No visuals notes available'}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="keynotes" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      Key Notes About the Post
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-muted-foreground">
                    {item.key_notes || 'No key notes available'}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="photos" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      Photo Examples
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-muted-foreground">
                    {item.photo_examples || 'No photo examples available'}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}