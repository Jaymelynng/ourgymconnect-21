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
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          marketing_items (
            *
          )
        `)
        .order('due_date');
      
      if (error) throw error;
      
      // Group tasks by date
      const groupedTasks = (data || []).reduce((acc: Record<string, typeof data>, task) => {
        const date = task.due_date ? format(new Date(task.due_date), 'yyyy-MM-dd') : 'No Date';
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(task);
        return acc;
      }, {});

      return groupedTasks;
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
      {Object.entries(tasks || {}).map(([date, dateTasks]) => (
        <div key={date} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              {date === 'No Date' ? date : format(new Date(date), 'MMMM d, yyyy')}
            </h2>
          </div>
          {(dateTasks as any[]).map((task) => (
            <Card key={task.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium">{task.title}</h3>
                {task.status && (
                  <Badge variant={task.status === 'pending' ? 'secondary' : 'default'} className="ml-2">
                    {task.status}
                  </Badge>
                )}
              </div>

              {task.description && (
                <div className="mb-6 text-muted-foreground">
                  <p>{task.description}</p>
                </div>
              )}
              
              {task.marketing_items && (
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="visuals" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        Visuals for Managers
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 text-muted-foreground">
                      {task.marketing_items.visuals_notes || 'No visuals notes available'}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="keynotes" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        Key Notes About the Post
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 text-muted-foreground">
                      {task.marketing_items.key_notes || 'No key notes available'}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="photos" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        Photo Examples
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 text-muted-foreground">
                      {task.marketing_items.photo_examples || 'No photo examples available'}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}