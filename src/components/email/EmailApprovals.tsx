import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GymSelector } from '@/components/GymSelector';
import { useToast } from '@/hooks/use-toast';

export const EmailApprovals = () => {
  const { toast } = useToast();

  const handleApprove = (gymId: number) => {
    toast({
      title: "Email Approved",
      description: "The email has been approved for sending.",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Email Approvals</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <GymSelector />
        </div>
        <div className="space-y-2">
          {/* Example email approval items */}
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
            <div>
              <h3 className="font-medium">Summer Camp Announcement</h3>
              <p className="text-sm text-muted-foreground">Scheduled for June 1st</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Needs Approval</Badge>
              </div>
            </div>
            <Button onClick={() => handleApprove(1)} size="sm">
              Approve
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
