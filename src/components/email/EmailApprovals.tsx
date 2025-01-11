import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GymSelector } from "@/components/GymSelector";
import { Eye, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EmailApprovals() {
  const { toast } = useToast();
  const [selectedGymId, setSelectedGymId] = useState<string>("");
  const [previewLink, setPreviewLink] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [status, setStatus] = useState("needs_approval");
  const [notes, setNotes] = useState("");

  const { data: emailContent, isLoading } = useQuery({
    queryKey: ['email_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_content')
        .select(`
          *,
          gym_details(*)
        `)
        .order('scheduled_date', { ascending: true });
      
      if (error) {
        console.error('Error fetching email content:', error);
        toast({
          title: "Error fetching emails",
          description: "Please try again later",
          variant: "destructive",
        });
        return [];
      }
      return data || [];
    }
  });

  const handleUpdateStatus = async () => {
    if (!selectedGymId) {
      toast({
        title: "Error",
        description: "Please select a gym",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('gym_details')
      .update({
        email_approved: status === 'approved',
        email_approval_date: status === 'approved' ? new Date().toISOString() : null,
        email_approval_notes: notes
      })
      .eq('id', selectedGymId);

    if (error) {
      console.error('Error updating email status:', error);
      toast({
        title: "Error updating status",
        description: "Please try again later",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Status updated",
      description: "Email approval status has been updated successfully",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-foreground">Email Approvals</h2>
        <Button variant="secondary">Create New Email</Button>
      </div>

      <div className="space-y-6">
        {/* Email List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-24 bg-muted rounded-lg" />
              <div className="h-24 bg-muted rounded-lg" />
            </div>
          ) : (
            emailContent?.map((email) => (
              <div
                key={email.id}
                className="border rounded-lg p-4 space-y-2 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {email.gym_details?.gym_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{email.title}</p>
                    <p className="text-sm text-primary/80">
                      Scheduled: {format(new Date(email.scheduled_date), "yyyy-MM-dd")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={email.gym_details?.email_approved ? "secondary" : "destructive"}
                      className="capitalize"
                    >
                      {email.gym_details?.email_approved ? "Has Edits" : "Needs Approval"}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Update Form */}
        <div className="border rounded-lg p-6 space-y-6">
          <h3 className="text-lg font-medium">Update Email Status</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Gym</label>
              <GymSelector onGymChange={setSelectedGymId} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Preview Link</label>
              <Input
                placeholder="https://"
                value={previewLink}
                onChange={(e) => setPreviewLink(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Scheduled Send Date</label>
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="needs_approval">Needs Approval</SelectItem>
                  <SelectItem value="has_edits">Has Edits</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                placeholder="Add any comments or feedback..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button
              className="w-full"
              onClick={handleUpdateStatus}
            >
              Update Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}