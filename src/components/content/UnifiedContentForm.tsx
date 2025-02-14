
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import RichTextEditor from '@/components/RichTextEditor';
import { useToast } from '@/hooks/use-toast';
import { GymSelector } from '../GymSelector';
import { supabase } from '@/integrations/supabase/client';
import type { UnifiedContentForm as UnifiedContentFormType, MarketingTask } from '@/types/marketing';

interface UnifiedContentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UnifiedContentForm({ open, onOpenChange }: UnifiedContentFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<UnifiedContentFormType>({
    title: '',
    contentType: 'social_media',
    scheduledDate: new Date(),
    tasks: [],
    rawNotes: '',
  });

  const handleInputChange = (field: keyof UnifiedContentFormType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const processRawNotes = (notes: string) => {
    const lines = notes.split('\n');
    const processed: Partial<UnifiedContentFormType> = {
      tasks: [],
    };

    lines.forEach(line => {
      if (line.toLowerCase().includes('title:')) {
        processed.title = line.split('title:')[1].trim();
      } else if (line.toLowerCase().includes('task:')) {
        const taskName = line.split('task:')[1].trim();
        const task: MarketingTask = {
          task_name: taskName,
          task_type: formData.contentType,
          status: 'Pending',
        };
        processed.tasks?.push(task);
      } else if (line.toLowerCase().includes('notes:')) {
        processed.keyNotes = line.split('notes:')[1].trim();
      }
    });

    return processed;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Process raw notes if present
      if (formData.rawNotes) {
        const processedData = processRawNotes(formData.rawNotes);
        Object.assign(formData, processedData);
      }

      // Insert main content
      const { data: contentData, error: contentError } = await supabase
        .from('marketing_content')
        .insert({
          title: formData.title,
          content_type: formData.contentType,
          scheduled_date: formData.scheduledDate.toISOString(),
          description: formData.description,
          key_notes: formData.keyNotes,
          caption: formData.caption,
          visuals_notes: formData.visualNotes,
          photo_key_points: formData.photoKeyPoints,
          email_subject_line: formData.emailSubjectLine,
          email_preview_text: formData.emailPreviewText,
          email_body_content: formData.emailBodyContent,
          in_gym_location: formData.inGymLocation,
          in_gym_display_type: formData.inGymDisplayType,
          gym_id: formData.gymId,
          content_raw_notes: formData.rawNotes,
        })
        .select()
        .single();

      if (contentError) throw contentError;

      // Insert tasks if any
      if (formData.tasks.length > 0) {
        const tasksToInsert = formData.tasks.map(task => ({
          task_name: task.task_name,
          task_type: task.task_type,
          content_id: contentData.id,
          status: task.status || 'Pending',
        }));

        const { error: tasksError } = await supabase
          .from('marketing_tasks')
          .insert(tasksToInsert);

        if (tasksError) throw tasksError;
      }

      toast({
        title: "Content created successfully",
        description: "Your content has been saved and tasks have been created.",
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error creating content:', error);
      toast({
        title: "Error creating content",
        description: "There was a problem saving your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="structured" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="structured">Structured Form</TabsTrigger>
            <TabsTrigger value="raw">Raw Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="raw" className="space-y-4">
            <div className="space-y-4">
              <Label>Paste your notes here</Label>
              <RichTextEditor
                content={formData.rawNotes || ''}
                onChange={(value) => handleInputChange('rawNotes', value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="structured" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter content title"
                  />
                </div>

                <div>
                  <Label>Content Type</Label>
                  <select
                    className="w-full p-2 border rounded"
                    value={formData.contentType}
                    onChange={(e) => handleInputChange('contentType', e.target.value)}
                  >
                    <option value="social_media">Social Media</option>
                    <option value="email">Email</option>
                    <option value="in_gym">In-Gym Marketing</option>
                  </select>
                </div>

                <div>
                  <Label>Scheduled Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.scheduledDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.scheduledDate ? format(formData.scheduledDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.scheduledDate}
                        onSelect={(date) => date && handleInputChange('scheduledDate', date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Gym</Label>
                  <GymSelector onGymChange={(gymId) => handleInputChange('gymId', gymId)} />
                </div>
              </div>

              <div className="space-y-4">
                {formData.contentType === 'social_media' && (
                  <>
                    <div>
                      <Label>Caption</Label>
                      <Input
                        value={formData.caption || ''}
                        onChange={(e) => handleInputChange('caption', e.target.value)}
                        placeholder="Enter caption"
                      />
                    </div>
                    <div>
                      <Label>Visual Notes</Label>
                      <RichTextEditor
                        content={formData.visualNotes || ''}
                        onChange={(value) => handleInputChange('visualNotes', value)}
                      />
                    </div>
                  </>
                )}

                {formData.contentType === 'email' && (
                  <>
                    <div>
                      <Label>Subject Line</Label>
                      <Input
                        value={formData.emailSubjectLine || ''}
                        onChange={(e) => handleInputChange('emailSubjectLine', e.target.value)}
                        placeholder="Enter email subject"
                      />
                    </div>
                    <div>
                      <Label>Preview Text</Label>
                      <Input
                        value={formData.emailPreviewText || ''}
                        onChange={(e) => handleInputChange('emailPreviewText', e.target.value)}
                        placeholder="Enter preview text"
                      />
                    </div>
                    <div>
                      <Label>Email Content</Label>
                      <RichTextEditor
                        content={formData.emailBodyContent || ''}
                        onChange={(value) => handleInputChange('emailBodyContent', value)}
                      />
                    </div>
                  </>
                )}

                {formData.contentType === 'in_gym' && (
                  <>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={formData.inGymLocation || ''}
                        onChange={(e) => handleInputChange('inGymLocation', e.target.value)}
                        placeholder="Enter display location"
                      />
                    </div>
                    <div>
                      <Label>Display Type</Label>
                      <Input
                        value={formData.inGymDisplayType || ''}
                        onChange={(e) => handleInputChange('inGymDisplayType', e.target.value)}
                        placeholder="Enter display type"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Content"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
