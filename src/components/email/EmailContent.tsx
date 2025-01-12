import React from 'react';
import { EmailContentType } from '@/integrations/supabase/types';

interface EmailContentProps {
  email: EmailContentType;
}

export const EmailContent: React.FC<EmailContentProps> = ({ email }) => {
  return (
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
          dangerouslySetInnerHTML={{ __html: email?.body_content || '' }}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold">Scheduled Date</h2>
        <p className="mt-2">
          {email?.scheduled_date ? new Date(email.scheduled_date).toLocaleDateString() : 'Not scheduled'}
        </p>
      </div>
    </div>
  );
};