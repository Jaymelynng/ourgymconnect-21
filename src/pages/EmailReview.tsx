import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/DashboardLayout";
import { EmailContent } from "@/components/email/EmailContent";
import { EmailApprovalActions } from "@/components/email/EmailApprovalActions";
import { EmailContentType } from "@/integrations/supabase/types";

export default function EmailReview() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: email, isLoading } = useQuery({
    queryKey: ['email_content', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_content')
        .select('*')
        .eq('id', Number(id))
        .single();

      if (error) throw error;
      return data as EmailContentType;
    }
  });

  const updateEmailStatus = useMutation({
    mutationFn: async ({ status }: { status: 'approved' | 'rejected' }) => {
      const { error } = await supabase
        .from('email_content')
        .update({ status })
        .eq('id', Number(id));

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email_content', id] });
    },
  });

  const handleApprove = async () => {
    try {
      await updateEmailStatus.mutateAsync({ status: 'approved' });
      toast({
        title: "Email Approved",
        description: "The email has been approved for sending.",
      });
    } catch (error) {
      console.error('Error approving email:', error);
      toast({
        title: "Error",
        description: "Failed to approve email",
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {
    try {
      await updateEmailStatus.mutateAsync({ status: 'rejected' });
      toast({
        title: "Email Rejected",
        description: "The email has been rejected.",
      });
    } catch (error) {
      console.error('Error rejecting email:', error);
      toast({
        title: "Error",
        description: "Failed to reject email",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Email Review</h1>
          
          {email && (
            <>
              <EmailContent email={email} />
              <div className="mt-6">
                <EmailApprovalActions
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}