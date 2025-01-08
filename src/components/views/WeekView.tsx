import { useQuery } from "@tanstack/react-query";
import { format, parseISO, startOfWeek, addDays, isToday } from "date-fns";
import { Image, Calendar, Type } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { supabase } from "@/integrations/supabase/client";

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
      {weekDays.map(({ name }) => (
        <div key={name} className="text-center text-base font-semibold p-2 text-primary bg-primary/5 rounded-md">
          {name}
        </div>
      ))}
      {marketingItems.map((item) => {
        if (!item.scheduled_date) return null;
        
        const itemDate = parseISO(item.scheduled_date);
        const dayOfWeek = parseInt(format(itemDate, 'i'));
        
        // Only show items for Monday-Saturday (indexes 1-6)
        if (dayOfWeek > 6 || dayOfWeek < 1) return null;

        return (
          <HoverCard key={item.id}>
            <HoverCardTrigger asChild>
              <div
                className="aspect-square rounded-lg transition-all duration-300 cursor-pointer 
                         hover:shadow-lg bg-primary/80 group hover:bg-primary transform 
                         hover:scale-105 relative"
              >
                <div className="h-full p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-foreground/70" />
                      <span className={`
                        text-primary-foreground text-lg font-medium px-3 py-1 rounded-full 
                        shadow-sm backdrop-blur-sm transition-all duration-300
                        ${isToday(itemDate) 
                          ? 'bg-accent ring-2 ring-accent-foreground/50 scale-110' 
                          : 'bg-primary/90'
                        }
                      `}>
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
                    <span className="text-sm font-medium text-primary-foreground bg-primary-foreground/10 px-2 py-0.5 rounded-full">
                      {item.content_type || 'Content'}
                    </span>
                  </div>
                  
                  <div className="text-base font-medium text-primary-foreground mb-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {item.title}
                  </div>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent 
              className="w-80 p-4 bg-card shadow-lg border-primary/10 animate-in fade-in-0 zoom-in-95"
              align="center"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {item.caption && (
                  <div>
                    <h5 className="font-medium text-sm mb-1">Caption</h5>
                    <p className="text-sm text-muted-foreground">{item.caption}</p>
                  </div>
                )}
                {item.photo_key_points && (
                  <div>
                    <h5 className="font-medium text-sm mb-1">Key Points</h5>
                    <p className="text-sm text-muted-foreground">{item.photo_key_points}</p>
                  </div>
                )}
                <div className="pt-2 border-t">
                  <p className="text-sm text-primary">
                    Scheduled for {format(itemDate, 'PPP')} at {format(itemDate, 'h:mm a')}
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}