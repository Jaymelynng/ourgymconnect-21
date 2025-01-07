import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link2 } from 'lucide-react';
import { FormHeader } from './social-media/FormHeader';
import { ContentDetails } from './social-media/ContentDetails';
import { VisualTasks } from './social-media/VisualTasks';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SocialMediaFormProps {
  onCancel: () => void;
  initialData?: any;
  onDataChange?: (data: any) => void;
}

export const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ 
  onCancel,
  initialData,
  onDataChange 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    series: 'single' as 'single' | 'series',
    contentDate: '',
    taskDueDate: '',
    focus: '',
    goal: '',
    type: [] as string[],
    keyNotes: '',
    visualTasks: [{ id: Date.now(), text: '', completed: false }],
    sharePointLink: '',
    ...initialData
  });

  const { toast } = useToast();

  useEffect(() => {
    onDataChange?.(formData);
  }, [formData, onDataChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Error",
        description: "You must be logged in to submit content.",
        variant: "destructive",
      });
      return;
    }

    console.log('Form submitted:', formData);
    // TODO: Implement form submission
  };

  return (
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
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="bg-primary hover:bg-primary-hover text-white"
        >
          Create Content
        </Button>
      </div>
    </form>
  );
};
