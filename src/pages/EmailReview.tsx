import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function EmailReview() {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: email, isLoading } = useQuery({
    queryKey: ['email_content', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_content')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const handleApprove = async () => {
    try {
      const { error } = await supabase
        .from('email_content')
        .update({ status: 'approved' })
        .eq('id', id);

      if (error) throw error;

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
      const { error } = await supabase
        .from('email_content')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;

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
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Subject Line</h2>
              <p className="mt-2">{email?.subject_line}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Preview Text</h2>
              <p className="mt-2">{email?.preview_text}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Email Content</h2>
              <div 
                className="mt-2 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: email?.body_content }}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Scheduled Date</h2>
              <p className="mt-2">
                {email?.scheduled_date ? new Date(email.scheduled_date).toLocaleDateString() : 'Not scheduled'}
              </p>
            </div>

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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}