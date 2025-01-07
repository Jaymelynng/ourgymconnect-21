import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="bg-white"
        />
      </div>

      <div>
        <Label>Post Type</Label>
        <div className="flex gap-3">
          <Button
            type="button"
            variant={series === 'single' ? 'default' : 'outline'}
            onClick={() => onSeriesChange('single')}
            className={series === 'single' ? 'bg-primary hover:bg-primary-hover flex-1' : 'flex-1'}
          >
            Single Post
          </Button>
          <Button
            type="button"
            variant={series === 'series' ? 'default' : 'outline'}
            onClick={() => onSeriesChange('series')}
            className={series === 'series' ? 'bg-primary hover:bg-primary-hover flex-1' : 'flex-1'}
          >
            Series
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Content Live Date</Label>
          <Input
            type="date"
            value={contentDate}
            onChange={(e) => onContentDateChange(e.target.value)}
            className="bg-white"
          />
        </div>
        <div>
          <Label>Task Due Date</Label>
          <Input
            type="date"
            value={taskDueDate}
            onChange={(e) => onTaskDueDateChange(e.target.value)}
            className="bg-white"
          />
        </div>
      </div>
    </div>
  );
};