import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link2, CheckSquare, Square, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

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
          <div className="bg-rose-50 p-4 rounded-lg space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div>
              <Label>Post Type</Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={formData.series === 'single' ? 'default' : 'outline'}
                  onClick={() => setFormData(prev => ({ ...prev, series: 'single' }))}
                  className="flex-1"
                >
                  Single Post
                </Button>
                <Button
                  type="button"
                  variant={formData.series === 'series' ? 'default' : 'outline'}
                  onClick={() => setFormData(prev => ({ ...prev, series: 'series' }))}
                  className="flex-1"
                >
                  Series
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Content Live Date</Label>
                <Input
                  type="date"
                  value={formData.contentDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, contentDate: e.target.value }))}
                />
              </div>
              <div>
                <Label>Task Due Date</Label>
                <Input
                  type="date"
                  value={formData.taskDueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, taskDueDate: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Focus (1-2 words)</Label>
              <Input
                value={formData.focus}
                onChange={(e) => setFormData(prev => ({ ...prev, focus: e.target.value }))}
              />
            </div>
            <div>
              <Label>Goal</Label>
              <Input
                value={formData.goal}
                onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label>Type</Label>
            <div className="flex gap-3">
              {['post', 'story'].map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={formData.type.includes(type) ? 'default' : 'outline'}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      type: prev.type.includes(type)
                        ? prev.type.filter(t => t !== type)
                        : [...prev.type, type]
                    }));
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Key Notes</Label>
            <Textarea
              rows={4}
              value={formData.keyNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, keyNotes: e.target.value }))}
              placeholder="Overall notes about the content..."
            />
          </div>

          <div className="bg-rose-50 p-4 rounded-lg space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-primary">Visual Tasks</h3>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      visualTasks: [
                        ...prev.visualTasks,
                        { id: Date.now(), text: '', completed: false }
                      ]
                    }));
                  }}
                >
                  + Add Task
                </Button>
              </div>
              <div className="space-y-3">
                {formData.visualTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-2 w-full group"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          visualTasks: prev.visualTasks.map(t =>
                            t.id === task.id ? { ...t, completed: !t.completed } : t
                          )
                        }));
                      }}
                      className="mt-3 p-0 h-auto"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-primary" />
                      ) : (
                        <Square className="w-5 h-5 text-muted-foreground" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <Textarea
                        rows={2}
                        className="resize-none"
                        placeholder="Enter task description..."
                        value={task.text}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            visualTasks: prev.visualTasks.map(t =>
                              t.id === task.id ? { ...t, text: e.target.value } : t
                            )
                          }));
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          visualTasks: prev.visualTasks.filter(t => t.id !== task.id)
                        }));
                      }}
                      className="mt-3 p-1 opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-rose-200">
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
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Content
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};