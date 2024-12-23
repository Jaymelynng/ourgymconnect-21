import { Clock, Tag, Info } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskPreviewProps {
  task: any;
  isDialog?: boolean;
}

export function TaskPreview({ task, isDialog = false }: TaskPreviewProps) {
  return (
    <div 
      className={cn(
        "space-y-2",
        isDialog ? "bg-card rounded-lg border border-border p-6 space-y-4" : "p-4 hover:bg-accent/5 transition-colors"
      )}
    >
      <div className="flex items-start justify-between">
        <h4 className={cn("font-medium text-foreground", isDialog && "text-xl")}>{task.title}</h4>
        <span className={cn(
          "text-xs px-2 py-1 rounded-full",
          task.status === 'pending' && "bg-primary/20 text-primary",
          task.status === 'completed' && "bg-green-100 text-green-700",
          isDialog && "text-sm px-3"
        )}>
          {task.status}
        </span>
      </div>

      {task.marketing_items && (
        <div className={cn("", isDialog && "bg-accent/5 rounded-md p-4")}>
          <p className={cn(
            "text-sm text-accent flex items-center gap-1",
            isDialog && "font-medium mb-2"
          )}>
            <Tag className="h-3 w-3" />
            Series: {task.marketing_items.title}
          </p>
          {isDialog && task.marketing_items.caption && (
            <p className="text-sm text-muted-foreground mb-2">
              Caption: {task.marketing_items.caption}
            </p>
          )}
          {isDialog && task.marketing_items.key_notes && (
            <div className="text-sm text-muted-foreground">
              <strong>Key Notes:</strong>
              <p>{task.marketing_items.key_notes}</p>
            </div>
          )}
        </div>
      )}

      {task.description && (
        <div className="text-muted-foreground">
          <h4 className={cn(
            "text-sm flex items-center gap-1",
            isDialog && "font-medium text-foreground mb-2"
          )}>
            <Info className="h-3 w-3" />
            {isDialog ? "Description" : task.description}
          </h4>
          {isDialog && <p>{task.description}</p>}
        </div>
      )}

      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <Clock className="h-3 w-3" />
        Due: {format(new Date(task.due_date), "h:mm a")}
      </p>
    </div>
  );
}