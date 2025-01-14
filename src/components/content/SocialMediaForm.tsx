import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link2, Loader2 } from 'lucide-react';
import { FormHeader } from './social-media/FormHeader';
import { ContentDetails } from './social-media/ContentDetails';
import { VisualTasks } from './social-media/VisualTasks';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SocialMediaFormProps {
  onCancel: () => void;
}

const initialFormState = {
  title: '',
  series: 'single' as 'single' | 'series',
  contentDate: '',
  taskDueDate: '',
  focus: '',
  goal: '',
  type: [] as string[],
  keyNotes: '',
  visualTasks: [{ id: Date.now(), text: '', completed: false }],
  sharePointLink: ''
};

export const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);
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

  const resetForm = () => {
    setFormData(initialFormState);
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
        .select()
        .single();

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

      resetForm();
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

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Label className="text-gray-700">Key Notes</Label>
            <Textarea
              rows={4}
              value={formData.keyNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, keyNotes: e.target.value }))}
              placeholder="Overall notes about the content..."
              className="bg-white border-gray-300 focus:ring-2 focus:ring-primary"
            />
          </div>

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

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Label className="text-gray-700">SharePoint Upload Folder</Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="url"
                className="pl-10 bg-white border-gray-300 focus:ring-2 focus:ring-primary"
                placeholder="Paste SharePoint folder link for photo uploads..."
                value={formData.sharePointLink}
                onChange={(e) => setFormData(prev => ({ ...prev, sharePointLink: e.target.value }))}
              />
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Share this link with contributors to upload their photos
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "bg-primary hover:bg-primary-hover text-white",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Content"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
