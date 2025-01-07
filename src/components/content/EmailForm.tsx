import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EmailFormProps {
  onCancel: () => void;
  initialData?: any;
  onDataChange?: (data: any) => void;
}

export const EmailForm: React.FC<EmailFormProps> = ({ onCancel, initialData, onDataChange }) => {
  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent>
        <div className="p-6">
          <h2 className="text-2xl mb-4">Email Marketing Form</h2>
          <p className="text-muted-foreground">Coming soon...</p>
          <div className="mt-6 flex justify-end">
            <Button onClick={onCancel}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};