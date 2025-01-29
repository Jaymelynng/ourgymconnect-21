import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, CheckSquare, Square, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface VisualTasksProps {
  tasks: { id: number; text: string; completed: boolean; dueDate: Date }[];
  onTasksChange: (tasks: { id: number; text: string; completed: boolean; dueDate: Date }[]) => void;
  onTaskAdd: () => void;
  onTaskDelete: (id: number) => void;
  onTaskToggle: (id: number) => void;
}

export const VisualTasks = ({
  tasks,
  onTasksChange,
  onTaskAdd,
  onTaskDelete,
  onTaskToggle,
}: VisualTasksProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-gray-700">Tasks</Label>
        <Button
          type="button"
          variant="ghost"
          onClick={onTaskAdd}
          className="text-primary hover:text-primary-hover hover:bg-gray-100"
        >
          + Add Task
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-2 w-full group"
          >
            <Button
              type="button"
              variant="ghost"
              onClick={() => onTaskToggle(task.id)}
              className="mt-3 p-0 h-auto hover:bg-gray-100"
            >
              {task.completed ? (
                <CheckSquare className="w-5 h-5 text-primary" />
              ) : (
                <Square className="w-5 h-5 text-gray-500" />
              )}
            </Button>
            <div className="flex-1 space-y-2">
              <Input
                value={task.text}
                onChange={(e) => {
                  onTasksChange(
                    tasks.map(t =>
                      t.id === task.id ? { ...t, text: e.target.value } : t
                    )
                  );
                }}
                placeholder="Enter task description..."
                className="w-full"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !task.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {task.dueDate ? format(task.dueDate, "PPP") : <span>Set due date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onTaskDelete(task.id)}
              className="mt-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};