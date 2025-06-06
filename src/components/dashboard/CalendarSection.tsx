
import { useState, useCallback } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { CalendarEvent } from "@/types/marketing";

const WeekView = ({ events }: { events: CalendarEvent[] }) => (
  <div className="grid grid-cols-6 gap-2">
    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
      <div key={day} className="text-center text-sm font-medium p-2 text-muted-foreground">
        {day}
      </div>
    ))}
    {Array.from({ length: 6 }).map((_, index) => {
      const dayEvents = events.filter(event => {
        const eventDate = event.scheduled_date ? parseISO(event.scheduled_date) : null;
        return eventDate && format(eventDate, 'd') === String(index + 1);
      });
      
      return (
        <div
          key={`day-${index}`}
          className="aspect-square rounded-lg transition-all cursor-pointer hover:shadow-lg bg-primary/80 group hover:bg-primary"
        >
          <div className="h-full p-2 flex flex-col">
            <span className="text-primary-foreground text-sm">{index + 1}</span>
            {dayEvents.map(event => (
              <div 
                key={event.id} 
                className="text-xs text-primary-foreground mt-1 truncate opacity-80 group-hover:opacity-100"
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

const MonthView = ({ events }: { events: CalendarEvent[] }) => (
  <div className="grid grid-cols-7 gap-2">
    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
      <div key={day} className="text-center text-sm font-medium p-2 text-muted-foreground">
        {day}
      </div>
    ))}
    {Array.from({ length: 28 }).map((_, index) => {
      const dayEvents = events.filter(event => {
        const eventDate = event.scheduled_date ? parseISO(event.scheduled_date) : null;
        return eventDate && format(eventDate, 'd') === String(index + 1);
      });
      
      return (
        <div
          key={`day-${index}`}
          className="aspect-square rounded-lg transition-all cursor-pointer hover:shadow-lg bg-primary/80 group hover:bg-primary"
        >
          <div className="h-full p-2 flex flex-col">
            <span className="text-primary-foreground text-sm">{index + 1}</span>
            {dayEvents.map(event => (
              <div 
                key={event.id} 
                className="text-xs text-primary-foreground mt-1 truncate opacity-80 group-hover:opacity-100"
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

const ListView = ({ events }: { events: CalendarEvent[] }) => (
  <div className="space-y-2">
    {events.map((event) => (
      <div 
        key={event.id}
        className="p-3 rounded-lg transition-all cursor-pointer bg-card hover:shadow-md border-l-4 border-primary"
      >
        <div className="text-sm font-medium text-primary">
          {event.scheduled_date ? format(parseISO(event.scheduled_date), 'MMM d, yyyy') : 'No date set'}
        </div>
        <div className="text-sm text-muted-foreground">
          {event.title}
        </div>
      </div>
    ))}
  </div>
);

export function CalendarSection() {
  const [viewType, setViewType] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const { toast } = useToast();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['marketing_content', format(currentDate, 'yyyy-MM')],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('marketing_content')
          .select('*')
          .gte('scheduled_date', calendarStart.toISOString())
          .lte('scheduled_date', calendarEnd.toISOString())
          .order('scheduled_date');

        if (error) throw error;

        // Transform the data to match CalendarEvent type
        return (data || []).map(item => ({
          ...item,
          type: 'marketing' as const
        })) as CalendarEvent[];
      } catch (error) {
        console.error('Error fetching calendar events:', error);
        toast({
          title: "Error fetching calendar events",
          description: "Please try again later",
          variant: "destructive",
        });
        return [];
      }
    }
  });

  const nextMonth = useCallback(() => setCurrentDate(addMonths(currentDate, 1)), [currentDate]);
  const prevMonth = useCallback(() => setCurrentDate(subMonths(currentDate, 1)), [currentDate]);

  if (isLoading) {
    return <Card className="p-4 animate-pulse h-[400px]" />;
  }

  return (
    <Card className="p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-primary">Calendar View</h3>
        <div className="flex gap-2">
          <Button 
            variant={viewType === 'week' ? 'default' : 'secondary'}
            onClick={() => setViewType('week')}
          >
            Week
          </Button>
          <Button 
            variant={viewType === 'month' ? 'default' : 'secondary'}
            onClick={() => setViewType('month')}
          >
            Month
          </Button>
          <Button 
            variant={viewType === 'list' ? 'default' : 'secondary'}
            onClick={() => setViewType('list')}
          >
            List
          </Button>
        </div>
      </div>
      
      {viewType === 'week' && <WeekView events={events} />}
      {viewType === 'month' && <MonthView events={events} />}
      {viewType === 'list' && <ListView events={events} />}
    </Card>
  );
}
