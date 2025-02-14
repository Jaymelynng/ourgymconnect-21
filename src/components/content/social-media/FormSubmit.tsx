import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface FormSubmitProps {
  isSubmitting: boolean;
  onCancel: () => void;
  formData: any;
}

export const FormSubmit = ({ isSubmitting, onCancel, formData }: FormSubmitProps) => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // First create the content
      const { data: contentData, error: contentError } = await supabase
        .from('social_media_content')
        .insert({
          title: formData.title,
          caption: formData.caption,
          scheduled_date: formData.contentDate,
          photo_key_points: formData.keyNotes,
          focus_area: formData.focus,
        })
        .select()
        .single();

      if (contentError) throw contentError;

      // Then create tasks for each visual task
      const taskPromises = formData.tasks.map(async (task: any) => {
        const { error: taskError } = await supabase
          .from('marketing_tasks')
          .insert({
            content_id: contentData.id,
            task_type: 'visual',
            due_date: formData.taskDueDate || formData.contentDate, // Use task due date if set, otherwise use content date
            status: task.completed ? 'Completed' : 'Pending',
            group_due_date: formData.taskDueDate // Add group due date
          });

        if (taskError) throw taskError;
      });

      await Promise.all(taskPromises);

      toast({
        title: "Content Created",
        description: "Your social media content has been created successfully.",
      });

      onCancel();
    } catch (error) {
      console.error('Error creating content:', error);
      toast({
        title: "Error",
        description: "Failed to create content",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-end gap-4 mt-6">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
        {isSubmitting ? "Creating..." : "Create Content"}
      </Button>
    </div>
  );
};