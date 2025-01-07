import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormHeaderProps {
  title: string;
  series: 'single' | 'series';
  contentDate: string;
  taskDueDate: string;
  onTitleChange: (value: string) => void;
  onSeriesChange: (value: 'single' | 'series') => void;
  onContentDateChange: (value: string) => void;
  onTaskDueDateChange: (value: string) => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  series,
  contentDate,
  taskDueDate,
  onTitleChange,
  onSeriesChange,
  onContentDateChange,
  onTaskDueDateChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div>
        <Label className="text-gray-700">Title</Label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="bg-white border-gray-300 focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <Label className="text-gray-700">Post Type</Label>
        <div className="flex gap-3">
          <Button
            type="button"
            variant={series === 'single' ? 'default' : 'outline'}
            onClick={() => onSeriesChange('single')}
            className={cn(
              "flex-1",
              series === 'single' 
                ? "bg-primary hover:bg-primary-hover text-white" 
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            )}
          >
            Single Post
          </Button>
          <Button
            type="button"
            variant={series === 'series' ? 'default' : 'outline'}
            onClick={() => onSeriesChange('series')}
            className={cn(
              "flex-1",
              series === 'series' 
                ? "bg-primary hover:bg-primary-hover text-white" 
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            )}
          >
            Series
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-700">Content Live Date</Label>
          <Input
            type="date"
            value={contentDate}
            onChange={(e) => onContentDateChange(e.target.value)}
            className="bg-white border-gray-300 focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <Label className="text-gray-700">Task Due Date</Label>
          <Input
            type="date"
            value={taskDueDate}
            onChange={(e) => onTaskDueDateChange(e.target.value)}
            className="bg-white border-gray-300 focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
};