import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";
import { Image } from "lucide-react";

export function WeekView() {
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
    <div className="grid grid-cols-6 gap-4">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div 
          key={day} 
          className="text-center font-semibold text-base p-3 text-primary bg-primary/10 rounded-md transform transition-all duration-300 hover:scale-105 shadow-sm"
        >
          {day}
        </div>
      ))}
      {marketingItems.map((item) => (
        <div
          key={item.id}
          className="aspect-square rounded-lg transition-all duration-300 cursor-pointer hover:shadow-lg bg-primary/80 group hover:bg-primary transform hover:scale-105"
        >
          <div className="h-full p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary-foreground text-lg font-medium bg-primary/90 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
                {item.scheduled_date ? format(parseISO(item.scheduled_date), 'd') : ''}
              </span>
              {item.photo_examples ? (
                <img 
                  src={item.photo_examples} 
                  alt="" 
                  className="w-8 h-8 rounded-full ring-2 ring-white/20 transition-all duration-300 group-hover:ring-white/40 shadow-sm"
                />
              ) : (
                <Image className="w-6 h-6 text-primary-foreground/70" />
              )}
            </div>
            <div className="text-sm font-medium text-primary-foreground mt-2 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
              {item.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}