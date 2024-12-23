import { Button } from "@/components/ui/button";
import { format, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { CalendarIcon } from "lucide-react";
import { TaskPreview } from "./TaskPreview";

interface CalendarDayProps {
  day: Date;
  currentDate: Date;
  tasks: any[];
  marketingItems: any[];
  hasItems: boolean;
  onDayClick: (date: Date, tasks: any[]) => void;
}

export function CalendarDay({ 
  day, 
  currentDate, 
  tasks, 
  marketingItems, 
  hasItems, 
  onDayClick 
}: CalendarDayProps) {
  return (
    <div className="min-h-[120px] border-b border-r border-border relative">
      <div 
        className={cn(
          "absolute top-1 right-2 text-sm font-medium",
          !isSameMonth(day, currentDate) && "text-muted-foreground",
          isToday(day) && "text-primary font-bold"
        )}
      >
        {format(day, "d")}
      </div>
      
      <div className="pt-8 px-2 pb-2">
        {tasks.map((task) => (
          <Button
            key={task.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left h-auto p-2 mb-1",
              "hover:bg-primary/10 hover:text-primary",
              "focus:ring-2 focus:ring-primary/20 focus:outline-none"
            )}
            onClick={() => onDayClick(day, [task])}
          >
            <div className="w-full">
              <div className="text-xs font-medium truncate">{task.title}</div>
              {task.description && (
                <div className="text-xs text-muted-foreground truncate mt-0.5">
                  {task.description}
                </div>
              )}
            </div>
          </Button>
        ))}
        
        {marketingItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left h-auto p-2 mb-1",
              "bg-accent/5 hover:bg-accent/10 hover:text-accent",
              "focus:ring-2 focus:ring-accent/20 focus:outline-none"
            )}
            onClick={() => onDayClick(day, [])}
          >
            <div className="w-full">
              <div className="text-xs font-medium truncate">{item.title}</div>
              {item.caption && (
                <div className="text-xs text-muted-foreground truncate mt-0.5">
                  {item.caption}
                </div>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}