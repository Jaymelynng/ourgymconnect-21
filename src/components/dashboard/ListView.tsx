import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

export function ListView() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  const { data: marketingItems, isLoading, refetch } = useQuery({
    queryKey: ['marketing_items', startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .gte('scheduled_date', startDate.toISOString())
        .lte('scheduled_date', endDate.toISOString())
        .order('scheduled_date');
      
      if (error) throw error;
      
      const groupedItems = (data || []).reduce((acc: Record<string, typeof data>, item) => {
        const date = item.scheduled_date ? format(new Date(item.scheduled_date), 'yyyy-MM-dd') : 'No Date';
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});

      return groupedItems;
    }
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  if (isLoading) return (
    <div className="animate-pulse space-y-4">
      {[1,2,3].map(i => (
        <div key={i} className="h-32 bg-muted rounded-lg" />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {Object.entries(marketingItems || {}).map(([date, dateItems]) => (
        <div key={date} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {date === 'No Date' ? date : format(new Date(date), 'MMMM d, yyyy')}
            </h2>
          </div>
          {(dateItems as any[]).map((item) => (
            <Card key={item.id} className="p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                {item.content_type && (
                  <Badge 
                    variant="secondary" 
                    className="animate-fade-in hover:bg-primary/20 transition-colors duration-300"
                  >
                    {item.content_type}
                  </Badge>
                )}
              </div>

              {item.description && (
                <div className="mb-6 text-muted-foreground hover:text-foreground transition-colors duration-300">
                  <p>{item.description}</p>
                </div>
              )}
              
              <Accordion type="single" collapsible className="w-full space-y-2">
                <AccordionItem value="details" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      Additional Details
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-muted-foreground">
                    {item.theme && <p>Theme: {item.theme}</p>}
                    {item.scheduled_date && (
                      <p>Scheduled for: {format(new Date(item.scheduled_date), 'PPP p')}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          ))}
        </div>
      ))}

      {(!marketingItems || Object.keys(marketingItems).length === 0) && (
        <Card className="p-6">
          <p className="text-center text-muted-foreground">
            No content scheduled for {format(currentDate, 'MMMM yyyy')}
          </p>
        </Card>
      )}
    </div>
  );
}