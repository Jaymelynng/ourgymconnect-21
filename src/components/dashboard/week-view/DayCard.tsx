import { format } from "date-fns";
import { Calendar, Type, CheckSquare } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import type { MarketingItem } from "@/hooks/use-marketing-content";

interface DayCardProps {
  name: string;
  date: Date;
  tasks: MarketingItem[];
  onClick: () => void;
}

export function DayCard({ name, date, tasks, onClick }: DayCardProps) {
  const taskCount = tasks.length;
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          onClick={onClick}
          className="aspect-square rounded-lg transition-all duration-300 cursor-pointer 
                   bg-primary/5 hover:bg-primary/20 group transform hover:scale-105 
                   shadow-sm hover:shadow-md p-4"
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-primary text-lg font-medium">
                  {format(date, 'd')}
                </span>
              </div>
              {tasks[0]?.photo_examples && (
                <img 
                  src={tasks[0].photo_examples} 
                  alt={`Preview for ${tasks[0].title}`}
                  className="w-8 h-8 rounded-full ring-2 ring-primary/20 transition-all duration-300 
                           group-hover:ring-primary/40 shadow-sm"
                />
              )}
            </div>
            
            <h3 className="text-base font-semibold text-foreground mb-2">
              {name}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <Type className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {taskCount > 0 ? `${taskCount} Task${taskCount !== 1 ? 's' : ''}` : 'No Tasks'}
              </span>
            </div>
            
            {taskCount > 0 && (
              <div className="mt-auto flex items-center gap-2 text-primary">
                <CheckSquare className="w-4 h-4" />
                <span className="text-sm">
                  View Details
                </span>
              </div>
            )}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 p-4 bg-card shadow-lg border-primary/10 animate-in fade-in-0 zoom-in-95"
        align="center"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-lg">{name}</h4>
          </div>
          {taskCount > 0 ? (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className="p-3 bg-primary/5 rounded-lg space-y-1"
                >
                  <p className="font-medium text-foreground">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.content_type}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No tasks scheduled for this day.</p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}