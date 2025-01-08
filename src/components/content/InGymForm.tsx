import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface InGymFormProps {
  onCancel: () => void;
}

export const InGymForm: React.FC<InGymFormProps> = ({ onCancel }) => {
  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent>
        <div className="p-6">
          <h2 className="text-2xl mb-4">In-Gym Marketing Form</h2>
          <p className="text-muted-foreground">Coming soon...</p>
          <div className="mt-6 flex justify-end">
            <Button onClick={onCancel}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};