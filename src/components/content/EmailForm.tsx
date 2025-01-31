import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { GymSelector } from '../GymSelector';
import RichTextEditor from '../RichTextEditor';
import { supabase } from '@/integrations/supabase/client';

interface EmailFormProps {
  onCancel: () => void;
}

export const EmailForm: React.FC<EmailFormProps> = ({ onCancel }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: '',
      subject: '',
      previewText: '',
      content: '',
      scheduledDate: new Date(),
      gymId: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const { data: emailContent, error } = await supabase
        .from('email_content')
        .insert({
          title: data.subject, // Use subject as title
          subject_line: data.subject,
          preview_text: data.previewText,
          body_content: data.content,
          scheduled_date: data.scheduledDate.toISOString(),
          gym_id: data.gymId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Email Created",
        description: "Your email has been sent for review.",
      });
      
      onCancel();
      navigate(`/email-review/${emailContent.id}`);
    } catch (error) {
      console.error('Error creating email:', error);
      toast({
        title: "Error",
        description: "Failed to create email",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Email Campaign</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="gymId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Gym</FormLabel>
                    <FormControl>
                      <GymSelector onGymChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Line</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email subject..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="previewText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preview Text</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter preview text..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Content</FormLabel>
                    <FormControl>
                      <RichTextEditor 
                        content={field.value} 
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduledDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Schedule Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Create Email
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};