import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { CalendarDay } from "./CalendarDay";
import { useCallback } from "react";

interface CalendarGridProps {
  currentDate: Date;
  marketingItems: any[];
  refetchItems: () => void;
}

export function CalendarGrid({ currentDate, marketingItems, refetchItems }: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getItemsForDay = useCallback((date: Date) => {
    console.group(`=== Checking Items for ${format(date, 'yyyy-MM-dd')} ===`);
    console.log("Available Items:", {
      total: marketingItems?.length || 0,
      date: format(date, 'yyyy-MM-dd')
    });
    
    const dayMarketingItems = marketingItems?.filter(item => {
      if (!item.scheduled_date) {
        console.log("Skipping Item - No scheduled date:", {
          id: item.id,
          title: item.title
        });
        return false;
      }
      
      const itemDate = format(item.scheduled_date, 'yyyy-MM-dd');
      const targetDate = format(date, 'yyyy-MM-dd');
      const matches = itemDate === targetDate;
      
      console.log("Comparing Dates:", {
        itemId: item.id,
        itemTitle: item.title,
        itemDate,
        targetDate,
        matches
      });
      
      return matches;
    }) || [];

    console.log("Results for day:", {
      date: format(date, 'yyyy-MM-dd'),
      itemsFound: dayMarketingItems.length,
      items: dayMarketingItems.map(item => ({
        id: item.id,
        title: item.title,
        scheduled_date: item.scheduled_date ? format(item.scheduled_date, 'yyyy-MM-dd HH:mm:ss') : null
      }))
    });
    console.groupEnd();
    
    return {
      marketingItems: dayMarketingItems,
      hasItems: dayMarketingItems.length > 0
    };
  }, [marketingItems]);

  return (
    <div className="grid grid-cols-7 border-t border-l border-border">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div 
          key={day} 
          className="text-sm font-medium text-muted-foreground p-2 text-center border-b border-r border-border"
        >
          {day}
        </div>
      ))}
      
      {days.map((day) => {
        const { marketingItems: dayMarketingItems, hasItems } = getItemsForDay(day);
        return (
          <CalendarDay
            key={day.toString()}
            day={day}
            currentDate={currentDate}
            tasks={[]}
            marketingItems={dayMarketingItems}
            hasItems={hasItems}
            onDayClick={() => {}}
            refetchItems={refetchItems}
          />
        );
      })}
    </div>
  );
}