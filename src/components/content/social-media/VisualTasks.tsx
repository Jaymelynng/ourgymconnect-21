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
    <div className="bg-[#1A1F2C] p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-gray-200">Tasks</Label>
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
            className="flex items-start gap-2 w-full group bg-[#222] p-3 rounded-lg"
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
                placeholder="Enter task description..."
                className="flex-1 bg-[#2F3A4A] border-gray-700 text-gray-200"
              />
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[180px] justify-start text-left font-normal bg-[#2F3A4A] border-gray-700",
                      !task.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {task.dueDate ? format(task.dueDate, "MMM d, yyyy") : <span>Set due date</span>}
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