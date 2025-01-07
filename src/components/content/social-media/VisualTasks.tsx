import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckSquare, Square, X } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface VisualTasksProps {
  tasks: Task[];
  onTaskAdd: () => void;
  onTaskUpdate: (tasks: Task[]) => void;
  onTaskDelete: (id: number) => void;
  onTaskToggle: (id: number) => void;
}

export const VisualTasks: React.FC<VisualTasksProps> = ({
  tasks,
  onTaskAdd,
  onTaskUpdate,
  onTaskDelete,
  onTaskToggle,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-primary">Visual Tasks</h3>
          <Button
            type="button"
            variant="ghost"
            onClick={onTaskAdd}
            className="hover:bg-gray-100"
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
                  <Square className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
              <div className="flex-1">
                <Textarea
                  rows={2}
                  className="resize-none bg-white"
                  placeholder="Enter task description..."
                  value={task.text}
                  onChange={(e) => {
                    onTaskUpdate(
                      tasks.map(t =>
                        t.id === task.id ? { ...t, text: e.target.value } : t
                      )
                    );
                  }}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onTaskDelete(task.id)}
                className="mt-3 p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};