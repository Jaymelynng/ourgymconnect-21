import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, startOfWeek, addDays } from "date-fns";
import { Image, Calendar, Type, CheckSquare } from "lucide-react";

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

  // Get the start of the current week (Monday)
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  
  // Create an array of the 6 days (Mon-Sat)
  const weekDays = Array.from({ length: 6 }, (_, index) => {
    const date = addDays(startOfCurrentWeek, index);
    return {
      name: format(date, 'EEE'),
      date: date,
    };
  });

  return (
    <div className="grid grid-cols-6 gap-2">
      {weekDays.map(({ name, date }) => (
        <div key={name} className="text-center text-sm font-medium p-2 text-primary bg-primary/5 rounded-md transform transition-all duration-300 hover:scale-105">
          {name}
        </div>
      ))}
      {marketingItems.map((item) => {
        if (!item.scheduled_date) return null;
        
        const itemDate = parseISO(item.scheduled_date);
        const dayIndex = format(itemDate, 'i') - 1; // Get day index (1-7, where 1 is Monday)
        
        // Only show items for Monday-Saturday (indexes 0-5)
        if (dayIndex > 5) return null;

        return (
          <div
            key={item.id}
            className="aspect-square rounded-lg transition-all duration-300 cursor-pointer hover:shadow-lg bg-primary/80 group hover:bg-primary transform hover:scale-105"
          >
            <div className="h-full p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-foreground/70" />
                  <span className="text-primary-foreground text-lg font-medium bg-primary/90 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                    {format(itemDate, 'd')}
                  </span>
                </div>
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
              
              <div className="flex items-center gap-2 mb-2">
                <Type className="w-4 h-4 text-primary-foreground/70" />
                <span className="text-xs font-medium text-primary-foreground/80 bg-primary-foreground/10 px-2 py-0.5 rounded-full">
                  {item.content_type || 'Content'}
                </span>
              </div>
              
              <div className="text-sm font-medium text-primary-foreground mb-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                {item.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}