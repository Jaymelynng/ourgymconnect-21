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
        "transition-all duration-300 transform",
        "hover:scale-125 hover:font-bold",
        !isSameMonth(day, currentDate) && "text-muted-foreground/50",
        isToday(day) && "text-primary font-bold bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center"
      )}
    >
      {format(day, "d")}
    </div>
  );
}