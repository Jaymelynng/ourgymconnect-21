
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";
import { useMarketingContent } from "@/hooks/use-marketing-content";
import { CalendarHeader } from "../calendar/CalendarHeader";
import { CalendarDay } from "../calendar/CalendarDay";

interface MonthViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export function MonthView({ currentDate, onDateChange }: MonthViewProps) {
  const { marketingItems, isLoading } = useMarketingContent();

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevMonth = () => onDateChange(subMonths(currentDate, 1));
  const handleNextMonth = () => onDateChange(addMonths(currentDate, 1));
  const handleDayClick = (date: Date) => {
    console.log('Day clicked:', format(date, 'yyyy-MM-dd'));
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-1/3" />
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <div className="grid grid-cols-6 gap-4">
        {days.map((day) => {
          const dayItems = marketingItems.filter((item) => {
            if (!item.scheduled_date) return false;
            return format(new Date(item.scheduled_date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
          });

          return (
            <CalendarDay
              key={day.toISOString()}
              day={day}
              currentDate={currentDate}
              tasks={[]}
              marketingItems={dayItems}
              hasItems={dayItems.length > 0}
              onDayClick={handleDayClick}
              refetchItems={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}
