import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tables } from '@/integrations/supabase/types';

type EmailContentType = Tables['email_content']['Row'];

interface EmailContentProps {
  email: EmailContentType;
}

export const EmailContent: React.FC<EmailContentProps> = ({ email }) => {
  const getStatusBadge = () => {
    switch (email?.status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending Approval</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Email Details</h2>
        {getStatusBadge()}
      </div>

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
          dangerouslySetInnerHTML={{ __html: email?.body_content || '' }}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold">Scheduled Date</h2>
        <p className="mt-2">
          {email?.scheduled_date ? new Date(email.scheduled_date).toLocaleDateString() : 'Not scheduled'}
        </p>
      </div>

      {email?.status === 'rejected' && email?.rejection_reason && (
        <div>
          <h2 className="text-lg font-semibold text-red-600">Rejection Reason</h2>
          <p className="mt-2 text-red-600">{email.rejection_reason}</p>
        </div>
      )}
    </div>
  );
};