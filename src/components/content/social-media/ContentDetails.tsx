
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ContentDetailsProps } from './types';

export const ContentDetails: React.FC<ContentDetailsProps> = ({
  focus,
  goal,
  type,
  onFocusChange,
  onGoalChange,
  onTypeChange,
}) => {
  const contentTypes = ['Post', 'Story'];

  const toggleType = (selectedType: string) => {
    if (type.includes(selectedType)) {
      onTypeChange(type.filter(t => t !== selectedType));
    } else {
      onTypeChange([...type, selectedType]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div>
        <Label className="text-gray-700">Focus (1-2 words)</Label>
        <Input
          value={focus}
          onChange={(e) => onFocusChange(e.target.value)}
          className="bg-white border-gray-300 focus:ring-2 focus:ring-primary"
          placeholder="e.g., Brand Awareness"
        />
      </div>

      <div>
        <Label className="text-gray-700">Goal</Label>
        <Input
          value={goal}
          onChange={(e) => onGoalChange(e.target.value)}
          className="bg-white border-gray-300 focus:ring-2 focus:ring-primary"
          placeholder="e.g., Increase engagement"
        />
      </div>

      <div>
        <Label className="text-gray-700">Type</Label>
        <div className="flex flex-wrap gap-2">
          {contentTypes.map((contentType) => (
            <Button
              key={contentType}
              type="button"
              variant={type.includes(contentType) ? 'default' : 'outline'}
              onClick={() => toggleType(contentType)}
              className={cn(
                type.includes(contentType)
                  ? "bg-primary hover:bg-primary-hover text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              )}
            >
              {contentType}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
