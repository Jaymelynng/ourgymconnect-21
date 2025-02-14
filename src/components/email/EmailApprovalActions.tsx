
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface EmailApprovalActionsProps {
  emailId: number;
  onSuccess?: () => void;
}

export const EmailApprovalActions: React.FC<EmailApprovalActionsProps> = ({
  emailId,
  onSuccess,
}) => {
  const { toast } = useToast();

  const handleApprove = async () => {
    const { error } = await supabase
      .from('email_details')
      .update({ status: 'approved' })
      .eq('id', emailId);

    if (error) {
      toast({
        title: "Error approving email",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Email approved",
      description: "The email has been approved successfully",
    });
    onSuccess?.();
  };

  const handleReject = async () => {
    const { error } = await supabase
      .from('email_details')
      .update({ status: 'rejected' })
      .eq('id', emailId);

    if (error) {
      toast({
        title: "Error rejecting email",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Email rejected",
      description: "The email has been rejected",
    });
    onSuccess?.();
  };

  return (
    <div className="flex justify-end space-x-4">
      <Button
        variant="outline"
        onClick={handleReject}
        className="bg-red-50 hover:bg-red-100 text-red-600"
      >
        Reject
      </Button>
      <Button
        onClick={handleApprove}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Approve
      </Button>
    </div>
  );
};
