
import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { MarketingContent, EmailDetails } from '@/types/database';

interface EmailContentProps {
  content: MarketingContent;
  details: EmailDetails;
}

export function EmailContent({ content, details }: EmailContentProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{content.title}</h2>
        <Badge variant={content.status === 'approved' ? 'default' : 'secondary'}>
          {content.status}
        </Badge>
      </div>
      
      {details.subject_line && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Subject Line</h3>
          <p className="mt-1">{details.subject_line}</p>
        </div>
      )}
      
      {details.preview_text && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Preview Text</h3>
          <p className="mt-1">{details.preview_text}</p>
        </div>
      )}
      
      {details.body_content && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Email Content</h3>
          <div className="mt-1 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: details.body_content }} />
        </div>
      )}
      
      {content.rejection_reason && (
        <div className="bg-destructive/10 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-destructive">Rejection Reason</h3>
          <p className="mt-1 text-destructive">{content.rejection_reason}</p>
        </div>
      )}
    </div>
  );
}
