import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckSquare, Square, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VisualTasksProps } from './types';

export const VisualTasks: React.FC<VisualTasksProps> = ({
  tasks,
  onTasksChange,
  onTaskAdd,
  onTaskDelete,
  onTaskToggle,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-gray-700">Visual Tasks</Label>
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
            <div className="flex-1">
              <Textarea
                rows={2}
                className="resize-none bg-white border-gray-300 focus:ring-2 focus:ring-primary"
                placeholder="Enter task description..."
                value={task.text}
                onChange={(e) => {
                  onTasksChange(
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
              <X className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};