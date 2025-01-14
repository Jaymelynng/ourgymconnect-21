import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EmailContent } from "@/components/email/EmailContent";
import { EmailApprovalActions } from "@/components/email/EmailApprovalActions";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface EmailContentType {
  id: number;
  title: string;
  subject_line: string | null;
  preview_text: string | null;
  body_content: string | null;
  status: string | null;
  rejection_reason: string | null;
}

export default function EmailReview() {
  const { toast } = useToast();

  const { data: emails = [], isLoading } = useQuery({
    queryKey: ['pending_emails'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_content')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching emails:', error);
        toast({
          title: "Error fetching emails",
          description: "Please try again later",
          variant: "destructive",
        });
        throw error;
      }

      return data || [];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Email Review</h1>
      
      {emails.length === 0 ? (
        <Card className="p-6">
          <p className="text-center text-muted-foreground">No emails pending review</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {emails.map((email) => (
            <Card key={email.id} className="p-6">
              <EmailContent email={email} />
              <div className="mt-6 pt-6 border-t">
                <EmailApprovalActions email={email} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}