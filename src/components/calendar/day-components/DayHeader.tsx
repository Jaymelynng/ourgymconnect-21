import { format, isToday, isSameMonth } from "date-fns";
import { cn } from "@/lib/utils";

interface DayHeaderProps {
  day: Date;
  currentDate: Date;
}

export function DayHeader({ day, currentDate }: DayHeaderProps) {
  return (
    <div 
      className={cn(
        "absolute top-2 right-2 text-sm font-medium",
        !isSameMonth(day, currentDate) && "text-muted-foreground/50",
        isToday(day) && "text-primary font-bold"
      )}
    >
      {format(day, "d")}
    </div>
  );
}