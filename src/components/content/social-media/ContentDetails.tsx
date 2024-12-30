import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ContentDetailsProps {
  focus: string;
  goal: string;
  type: string[];
  onFocusChange: (value: string) => void;
  onGoalChange: (value: string) => void;
  onTypeChange: (types: string[]) => void;
}

export const ContentDetails: React.FC<ContentDetailsProps> = ({
  focus,
  goal,
  type,
  onFocusChange,
  onGoalChange,
  onTypeChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Focus (1-2 words)</Label>
          <Input
            value={focus}
            onChange={(e) => onFocusChange(e.target.value)}
          />
        </div>
        <div>
          <Label>Goal</Label>
          <Input
            value={goal}
            onChange={(e) => onGoalChange(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label>Type</Label>
        <div className="flex gap-3">
          {['post', 'story'].map((t) => (
            <Button
              key={t}
              type="button"
              variant={type.includes(t) ? 'default' : 'outline'}
              onClick={() => {
                onTypeChange(
                  type.includes(t)
                    ? type.filter(item => item !== t)
                    : [...type, t]
                );
              }}
              className="bg-primary hover:bg-primary-hover"
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};