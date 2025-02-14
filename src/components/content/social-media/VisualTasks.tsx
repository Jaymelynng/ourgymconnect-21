
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckSquare, Square, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisualTasksProps } from "./types";

export const VisualTasks = ({
  tasks,
  onTasksChange,
  onTaskAdd,
  onTaskDelete,
  onTaskToggle,
}: VisualTasksProps) => {
  return (
    <div className="space-y-4 p-6 bg-rose-50/50 rounded-lg">
      <div className="flex justify-between items-center">
        <Label className="text-rose-900 text-lg font-medium">Visual Tasks</Label>
        <Button
          type="button"
          variant="ghost"
          onClick={onTaskAdd}
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-100"
        >
          + Add Task
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 w-full group"
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onTaskToggle(task.id)}
              className="p-0 h-auto hover:bg-rose-100"
            >
              {task.completed ? (
                <CheckSquare className="w-5 h-5 text-rose-600" />
              ) : (
                <Square className="w-5 h-5 text-gray-400" />
              )}
            </Button>
            
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
              className={cn(
                "flex-1 border-gray-200",
                task.completed && "line-through text-gray-400"
              )}
            />
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onTaskDelete(task.id)}
              className="p-1 opacity-0 group-hover:opacity-100 hover:bg-rose-100"
            >
              <X className="w-4 h-4 text-gray-400" />
            </Button>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No tasks added yet. Click "Add Task" to get started.
          </div>
        )}
      </div>
    </div>
  );
};
