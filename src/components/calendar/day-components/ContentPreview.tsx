import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Edit, Eye, Trash2 } from "lucide-react";

interface ContentPreviewProps {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onDayClick: (e: React.MouseEvent) => void;
}

export function ContentPreview({ item, onEdit, onDelete, onDayClick }: ContentPreviewProps) {
  return (
    <HoverCard key={item.id}>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-left h-auto p-2 mb-1",
            "bg-secondary/10 hover:bg-secondary/20",
            "focus:ring-2 focus:ring-secondary/20 focus:outline-none",
            "transform transition-all duration-200 hover:scale-[1.02]",
            "group"
          )}
          onClick={onDayClick}
        >
          <div className="w-full space-y-1">
            <div className="text-xs font-medium truncate flex items-center justify-between">
              {item.title}
              <Eye className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {item.description && (
              <div className="text-xs text-muted-foreground truncate">
                {item.description}
              </div>
            )}
            <div className="text-xs text-primary/80">
              {item.scheduled_date && `Going live: ${format(new Date(item.scheduled_date), "h:mm a")}`}
            </div>
            {item.due_date && (
              <div className="text-xs text-rose-500">
                Due: {format(new Date(item.due_date), "h:mm a")}
              </div>
            )}
          </div>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent 
        className={cn(
          "w-80 p-4",
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        )}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h4 className="font-medium">{item.title}</h4>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
                onClick={() => onEdit(item)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive/90 hover:scale-110 transition-all"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {item.description && (
            <p className="text-sm text-muted-foreground">{item.description}</p>
          )}
          <div className="text-sm space-y-1">
            {item.scheduled_date && (
              <p className="text-primary/80">
                Going live: {format(new Date(item.scheduled_date), "PPP 'at' h:mm a")}
              </p>
            )}
            {item.due_date && (
              <p className="text-rose-500">
                Due: {format(new Date(item.due_date), "PPP 'at' h:mm a")}
              </p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}