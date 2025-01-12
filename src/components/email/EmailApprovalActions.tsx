import React from 'react';
import { Button } from '@/components/ui/button';

interface EmailApprovalActionsProps {
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
}

export const EmailApprovalActions: React.FC<EmailApprovalActionsProps> = ({
  onApprove,
  onReject,
}) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        variant="outline"
        onClick={onReject}
        className="bg-red-50 hover:bg-red-100 text-red-600"
      >
        Reject
      </Button>
      <Button
        onClick={onApprove}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Approve
      </Button>
    </div>
  );
};