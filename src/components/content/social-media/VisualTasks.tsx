import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, CheckSquare, Square, X, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface VisualTasksProps {
  tasks: { id: number; text: string; completed: boolean; dueDate: Date; assignedTo?: string }[];
  onTasksChange: (tasks: { id: number; text: string; completed: boolean; dueDate: Date; assignedTo?: string }[]) => void;
  onTaskAdd: () => void;
  onTaskDelete: (id: number) => void;
  onTaskToggle: (id: number) => void;
  contentType: 'photos' | 'video' | 'canvas';
}

export const VisualTasks = ({
  tasks,
  onTasksChange,
  onTaskAdd,
  onTaskDelete,
  onTaskToggle,
  contentType,
}: VisualTasksProps) => {
  const getTaskPlaceholder = () => {
    switch (contentType) {
      case 'video':
        return "Enter video production task...";
      case 'canvas':
        return "Enter template design task...";
      default:
        return "Enter photo task...";
    }
  };

  return (
    <div className="bg-[#2F3A4A] p-6 rounded-lg shadow-md border border-gray-700 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <Label className="text-gray-200 text-lg font-semibold">Tasks</Label>
          <p className="text-sm text-gray-400 mt-1">
            {contentType === 'video' ? 'Video Production Tasks' : 
             contentType === 'canvas' ? 'Template Design Tasks' : 
             'Photo Shoot Tasks'}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={onTaskAdd}
          className="text-primary hover:text-primary-hover hover:bg-[#222222]"
        >
          + Add Task
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-2 w-full group bg-[#222222] p-4 rounded-lg border border-gray-700"
          >
            <Button
              type="button"
              variant="ghost"
              onClick={() => onTaskToggle(task.id)}
              className="p-0 h-auto hover:bg-[#333333]"
            >
              {task.completed ? (
                <CheckSquare className="w-5 h-5 text-primary" />
              ) : (
                <Square className="w-5 h-5 text-gray-400" />
              )}
            </Button>
            
            <div className="flex-1 flex items-start gap-3">
              <Input
                value={task.text}
                onChange={(e) => {
                  onTasksChange(
                    tasks.map(t =>
                      t.id === task.id ? { ...t, text: e.target.value } : t
                    )
                  );
                }}
                placeholder={getTaskPlaceholder()}
                className="flex-1 bg-[#1A1F2C] border-gray-700 text-gray-200"
              />

              <Input
                value={task.assignedTo || ''}
                onChange={(e) => {
                  onTasksChange(
                    tasks.map(t =>
                      t.id === task.id ? { ...t, assignedTo: e.target.value } : t
                    )
                  );
                }}
                placeholder="Assigned to"
                className="w-40 bg-[#1A1F2C] border-gray-700 text-gray-200"
              />
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[140px] justify-start text-left font-normal bg-[#1A1F2C] border-gray-700",
                      !task.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {task.dueDate ? format(task.dueDate, "MMM d") : <span>Due date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={task.dueDate}
                    onSelect={(date) => {
                      if (date) {
                        onTasksChange(
                          tasks.map(t =>
                            t.id === task.id ? { ...t, dueDate: date } : t
                          )
                        );
                      }
                    }}
                    initialFocus
                    className="bg-[#2F3A4A] border-gray-700"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button
              type="button"
              variant="ghost"
              onClick={() => onTaskDelete(task.id)}
              className="p-1 opacity-0 group-hover:opacity-100 hover:bg-[#333333]"
            >
              <X className="w-4 h-4 text-gray-400" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};