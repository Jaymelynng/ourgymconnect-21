import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link2 } from 'lucide-react';
import { FormHeader } from './social-media/FormHeader';
import { ContentDetails } from './social-media/ContentDetails';
import { VisualTasks } from './social-media/VisualTasks';

interface SocialMediaFormProps {
  onCancel: () => void;
}

export const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ onCancel }) => {
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
    sharePointLink: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Implement form submission
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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

          <div className="bg-gray-100 p-4 rounded-lg">
            <Label>Key Notes</Label>
            <Textarea
              rows={4}
              value={formData.keyNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, keyNotes: e.target.value }))}
              placeholder="Overall notes about the content..."
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

          <div className="bg-gray-100 p-4 rounded-lg">
            <Label>SharePoint Upload Folder</Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="url"
                className="pl-10"
                placeholder="Paste SharePoint folder link for photo uploads..."
                value={formData.sharePointLink}
                onChange={(e) => setFormData(prev => ({ ...prev, sharePointLink: e.target.value }))}
              />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Share this link with contributors to upload their photos
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-primary hover:bg-primary-hover"
            >
              Create Content
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};