import { Button } from "@/components/ui/button";
import { format, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { CalendarIcon, FileText } from "lucide-react";
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
    <HoverCard key={day.toString()} openDelay={200}>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-32 relative transition-all duration-200 p-2 flex flex-col items-start justify-start",
            "hover:bg-primary/10 hover:scale-105 transform",
            !isSameMonth(day, currentDate) && "text-muted-foreground opacity-50",
            isToday(day) && "bg-primary/10 font-bold text-primary",
            hasItems && "border-l-4 border-primary",
            "focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
          )}
          onClick={() => onDayClick(day, tasks)}
        >
          <span className="text-sm font-semibold mb-1">{format(day, "d")}</span>
          <div className="w-full space-y-1">
            {tasks.slice(0, 2).map((task) => (
              <div 
                key={task.id} 
                className="text-xs truncate text-left bg-accent/10 rounded px-1 py-0.5"
              >
                {task.title}
              </div>
            ))}
            {marketingItems.slice(0, 2).map((item) => (
              <div 
                key={item.id} 
                className="text-xs truncate text-left bg-primary/10 rounded px-1 py-0.5 flex items-center gap-1"
              >
                <FileText className="h-3 w-3" />
                {item.title}
              </div>
            ))}
            {(tasks.length + marketingItems.length) > 4 && (
              <div className="text-xs text-muted-foreground">
                +{(tasks.length + marketingItems.length) - 4} more
              </div>
            )}
          </div>
        </Button>
      </HoverCardTrigger>
      {hasItems && (
        <HoverCardContent 
          className="w-96 p-0 bg-card shadow-lg animate-scale-in"
          align="start"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              {format(day, "MMMM d, yyyy")}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {tasks.length + marketingItems.length} items scheduled
            </p>
          </div>
          <div className="max-h-[400px] overflow-y-auto divide-y divide-border">
            {tasks.map((task) => (
              <TaskPreview key={task.id} task={task} />
            ))}
            {marketingItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-accent/5 transition-colors">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <h4 className="font-medium text-foreground">{item.title}</h4>
                </div>
                {item.caption && (
                  <p className="text-sm text-muted-foreground mt-1">{item.caption}</p>
                )}
              </div>
            ))}
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}