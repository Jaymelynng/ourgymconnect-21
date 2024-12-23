import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <CalendarIcon className="h-6 w-6 text-primary" />
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onPrevMonth}
          className="hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onNextMonth}
          className="hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}