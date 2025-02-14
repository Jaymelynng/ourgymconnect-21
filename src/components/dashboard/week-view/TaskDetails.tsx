
import { format } from "date-fns";
import { Type } from "lucide-react";
import type { MarketingItem } from "@/hooks/use-marketing-content";

interface TaskDetailsProps {
  task: MarketingItem;
}

export function TaskDetails({ task }: TaskDetailsProps) {
  return (
    <div 
      className="p-4 bg-primary/5 rounded-lg space-y-3 hover:bg-primary/10 transition-colors"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg text-foreground">{task.title}</h3>
        {task.photo_examples && task.photo_examples.length > 0 && (
          <img 
            src={task.photo_examples[0]} 
            alt="" 
            className="w-12 h-12 rounded-full ring-2 ring-primary/20"
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Type className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">
          {task.content_type}
        </span>
      </div>
      {task.description && (
        <p className="text-sm text-muted-foreground">{task.description}</p>
      )}
      {task.photo_key_points && (
        <div className="text-sm text-muted-foreground">
          <strong>Key Points:</strong> {task.photo_key_points}
        </div>
      )}
    </div>
  );
}
