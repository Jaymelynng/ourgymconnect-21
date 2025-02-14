
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MarketingContent } from "@/types/database";

interface DayCardProps {
  name: string;
  date: Date;
  tasks: MarketingContent[];
  onClick: () => void;
}

export function DayCard({ name, date, tasks, onClick }: DayCardProps) {
  return (
    <Card 
      onClick={onClick}
      className="p-6 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col border-2 hover:border-primary/50"
    >
      <div className="mb-4">
        <h3 className="text-2xl font-semibold text-primary mb-1">
          {format(date, 'd')}
        </h3>
        <p className="text-lg text-muted-foreground">
          {name}
        </p>
      </div>

      <div className="flex-1">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm">No Tasks</p>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className="bg-primary/10 rounded-lg p-3 text-sm hover:bg-primary/20 transition-colors"
              >
                <p className="font-medium truncate">{task.title}</p>
                {task.content_type && (
                  <Badge variant="secondary" className="mt-2">
                    {task.content_type}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
