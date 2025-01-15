import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FormHeader } from './social-media/FormHeader';
import { ContentDetails } from './social-media/ContentDetails';
import { VisualTasks } from './social-media/VisualTasks';
import { KeyNotes } from './social-media/KeyNotes';
import { SharePointSection } from './social-media/SharePointSection';
import { SubmitButtons } from './social-media/SubmitButtons';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FormData } from './social-media/types';

interface SocialMediaFormProps {
  onCancel: () => void;
}

const initialFormState: FormData = {
  title: '',
  series: 'single',
  contentDate: '',
  taskDueDate: '',
  focus: '',
  goal: '',
  type: [],
  keyNotes: '',
  visualTasks: [{ id: Date.now(), text: '', completed: false }],
  sharePointLink: ''
};

export const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    const requiredFields = {
      title: 'Title',
      contentDate: 'Content Date',
      taskDueDate: 'Task Due Date',
      focus: 'Focus',
      type: 'Content Type'
    };

    const missingFields = Object.entries(requiredFields).filter(([key, label]) => {
      if (key === 'type') {
        return formData[key].length === 0;
      }
      return !formData[key as keyof typeof formData];
    });

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(([_, label]) => label).join(', ');
      toast({
        title: "Required Fields Missing",
        description: `Please fill in the following fields: ${missingFieldNames}`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('social_media_content')
        .insert([{
          title: formData.title,
          scheduled_date: formData.contentDate,
          focus_area: formData.focus,
          series_name: formData.series === 'series' ? formData.title : null,
          media_urls: [],
          photo_key_points: formData.keyNotes
        }])
        .select();

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Error",
          description: "Failed to create social media content. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Social media content has been created successfully.",
      });

      setFormData(initialFormState);
      onCancel();

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormHeader
            title={formData.title}
            series={formData.series}
            contentDate={formData.contentDate}
            taskDueDate={formData.taskDueDate}
            onTitleChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
            onSeriesChange={(value) => setFormData(prev => ({ ...prev, series: value }))}
            onContentDateChange={(value) => setFormData(prev => ({ ...prev, contentDate: value }))}
            onTaskDueDateChange={(value) => setFormData(prev => ({ ...prev, taskDueDate: value }))}
          />

          <ContentDetails
            focus={formData.focus}
            goal={formData.goal}
            type={formData.type}
            onFocusChange={(value) => setFormData(prev => ({ ...prev, focus: value }))}
            onGoalChange={(value) => setFormData(prev => ({ ...prev, goal: value }))}
            onTypeChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
          />

          <KeyNotes
            keyNotes={formData.keyNotes}
            onChange={(value) => setFormData(prev => ({ ...prev, keyNotes: value }))}
          />

          <VisualTasks
            tasks={formData.visualTasks}
            onTaskAdd={() => {
              setFormData(prev => ({
                ...prev,
                visualTasks: [
                  ...prev.visualTasks,
                  { id: Date.now(), text: '', completed: false }
                ]
              }));
            }}
            onTaskUpdate={(tasks) => setFormData(prev => ({ ...prev, visualTasks: tasks }))}
            onTaskDelete={(id) => {
              setFormData(prev => ({
                ...prev,
                visualTasks: prev.visualTasks.filter(t => t.id !== id)
              }));
            }}
            onTaskToggle={(id) => {
              setFormData(prev => ({
                ...prev,
                visualTasks: prev.visualTasks.map(t =>
                  t.id === id ? { ...t, completed: !t.completed } : t
                )
              }));
            }}
          />

          <SharePointSection
            sharePointLink={formData.sharePointLink}
            onChange={(value) => setFormData(prev => ({ ...prev, sharePointLink: value }))}
          />

          <SubmitButtons isSubmitting={isSubmitting} onCancel={onCancel} />
        </form>
      </DialogContent>
    </Dialog>
  );
};