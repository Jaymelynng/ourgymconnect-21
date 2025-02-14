
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GymSelector } from '@/components/GymSelector';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { MarketingContent, EmailDetails } from '@/types/database';

interface EmailWithDetails extends MarketingContent {
  email_details: EmailDetails;
  gym_details: {
    gym_name: string;
  };
}

export const EmailApprovals = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedGym, setSelectedGym] = React.useState<string | null>(null);

  const { data: emails, isLoading } = useQuery({
    queryKey: ['email_approvals', selectedGym],
    queryFn: async () => {
      const query = supabase
        .from('marketing_content')
        .select(`
          *,
          email_details (*),
          gym_details (gym_name)
        `)
        .eq('content_type', 'email')
        .eq('status', 'pending');

      if (selectedGym) {
        query.eq('gym_id', parseInt(selectedGym, 10));
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as EmailWithDetails[];
    }
  });

  const handleGymChange = (gymId: string) => {
    setSelectedGym(gymId);
  };

  const handleReviewEmail = (emailId: number) => {
    navigate(`/email-review/${emailId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Email Approvals</h2>
        <GymSelector onChange={handleGymChange} />
      </div>

      {emails?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No emails pending approval
        </div>
      ) : (
        <div className="space-y-4">
          {emails?.map((email) => (
            <div
              key={email.id}
              className="flex items-center justify-between p-4 bg-background rounded-lg border hover:border-primary transition-colors"
            >
              <div className="space-y-1">
                <h3 className="font-medium">{email.title || 'Untitled Email'}</h3>
                <p className="text-sm text-muted-foreground">
                  {email.gym_details?.gym_name}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">Needs Approval</Badge>
                  {email.scheduled_date && (
                    <Badge variant="outline">
                      Scheduled for {format(new Date(email.scheduled_date), 'MMM d, yyyy')}
                    </Badge>
                  )}
                </div>
              </div>
              <Button 
                onClick={() => handleReviewEmail(email.id)}
                size="sm"
                className="ml-4"
              >
                Review
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
