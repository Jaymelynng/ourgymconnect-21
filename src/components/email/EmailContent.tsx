import React from 'react';
import { Badge } from '@/components/ui/badge';

interface EmailContentType {
  id: number;
  title: string;
  subject_line: string | null;
  preview_text: string | null;
  body_content: string | null;
  status: string | null;
  rejection_reason: string | null;
}

interface EmailContentProps {
  email: EmailContentType;
}

export function EmailContent({ email }: EmailContentProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{email.title}</h2>
        <Badge variant={email.status === 'approved' ? 'default' : 'secondary'}>
          {email.status}
        </Badge>
      </div>
      
      {email.subject_line && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Subject Line</h3>
          <p className="mt-1">{email.subject_line}</p>
        </div>
      )}
      
      {email.preview_text && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Preview Text</h3>
          <p className="mt-1">{email.preview_text}</p>
        </div>
      )}
      
      {email.body_content && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Email Content</h3>
          <div className="mt-1 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: email.body_content }} />
        </div>
      )}
      
      {email.rejection_reason && (
        <div className="bg-destructive/10 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-destructive">Rejection Reason</h3>
          <p className="mt-1 text-destructive">{email.rejection_reason}</p>
        </div>
      )}
    </div>
  );
}