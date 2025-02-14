
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";
import { useMarketingContent } from "@/hooks/use-marketing-content";
import { CalendarHeader } from "../calendar/CalendarHeader";
import { CalendarDay } from "../calendar/CalendarDay";
import type { MarketingContent } from "@/types/database";

interface MonthViewProps {
  events: MarketingContent[];
}

export function MonthView({ events }: MonthViewProps) {
  const currentDate = new Date();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handleDayClick = (date: Date) => {
    console.log('Day clicked:', format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-7 gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div 
            key={day} 
            className="text-sm font-medium text-muted-foreground p-2 text-center"
          >
            {day}
          </div>
        ))}
        
        {days.map((day) => {
          const dayEvents = events.filter((event) => {
            if (!event.scheduled_date) return false;
            return format(new Date(event.scheduled_date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
          });

          return (
            <div
              key={day.toISOString()}
              onClick={() => handleDayClick(day)}
              className="min-h-[100px] p-2 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="font-medium text-sm mb-1">
                {format(day, 'd')}
              </div>
              {dayEvents.map((event) => (
                <div 
                  key={event.id}
                  className="text-xs p-1 bg-primary/10 rounded mb-1 truncate"
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
