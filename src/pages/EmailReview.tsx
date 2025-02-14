
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EmailApprovals } from "@/components/email/EmailApprovals";
import { EmailContent } from "@/components/email/EmailContent";

export default function EmailReview() {
  const { data: emails, isLoading } = useQuery({
    queryKey: ["email_details"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_details')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Email Review</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EmailApprovals />
        {emails && emails.length > 0 && <EmailContent email={emails[0]} />}
      </div>
    </div>
  );
}
