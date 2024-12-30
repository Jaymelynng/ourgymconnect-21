import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";
import { Image } from "lucide-react";

export function EventList() {
  const { data: marketingItems = [] } = useQuery({
    queryKey: ['marketing_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .order('scheduled_date');
      
      if (error) throw error;
      return data || [];
    }
  });

  return (
    <div className="space-y-2">
      {marketingItems.map((item) => (
        <div 
          key={item.id}
          className="p-3 rounded-lg transition-all cursor-pointer bg-card hover:shadow-md border-l-4 border-primary"
        >
          <div className="flex items-center gap-3">
            {item.photo_examples ? (
              <img 
                src={item.photo_examples} 
                alt="" 
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Image className="w-5 h-5 text-primary" />
              </div>
            )}
            <div className="flex-1">
              <div className="text-sm font-medium text-primary">
                {item.scheduled_date ? format(parseISO(item.scheduled_date), 'MMM d, yyyy') : 'No date'}
              </div>
              <div className="text-sm text-foreground">
                {item.title}
              </div>
              {item.theme && (
                <div className="text-xs text-muted-foreground mt-1">
                  Theme: {item.theme}
                </div>
              )}
            </div>
          </div>
          {item.caption && (
            <div className="mt-2 text-sm text-muted-foreground">
              {item.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}