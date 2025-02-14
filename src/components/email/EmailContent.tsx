
import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { EmailDetails } from '@/types/database';

interface EmailContentProps {
  content: EmailDetails;
}

export function EmailContent({ content }: EmailContentProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{content.subject_line}</h2>
        <Badge variant={content.status === 'approved' ? 'default' : 'secondary'}>
          {content.status || 'Pending'}
        </Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Subject Line</h3>
        <p className="mt-1">{content.subject_line}</p>
      </div>
      
      {content.preview_text && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Preview Text</h3>
          <p className="mt-1">{content.preview_text}</p>
        </div>
      )}
      
      {content.body_content && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Email Content</h3>
          <div className="mt-1 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content.body_content }} />
        </div>
      )}
    </div>
  );
}
