
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormHeaderProps } from './types';

export const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  contentDate,
  onTitleChange,
  onContentDateChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-gray-700">Title</Label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="bg-white border-gray-300 focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <Label className="text-gray-700">Content Live Date</Label>
        <Input
          type="date"
          value={contentDate.toISOString().split('T')[0]}
          onChange={(e) => onContentDateChange(new Date(e.target.value))}
          className="bg-white border-gray-300 focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};
