import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FormHeader } from './social-media/FormHeader';
import { ContentDetails } from './social-media/ContentDetails';
import { KeyNotes } from './social-media/KeyNotes';
import { VisualTasks } from './social-media/VisualTasks';
import { SharePointSection } from './social-media/SharePointSection';
import { FormSubmit } from './social-media/FormSubmit';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SocialMediaFormProps {
  onCancel: () => void;
}

export const SocialMediaForm = ({ onCancel }: SocialMediaFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [contentDate, setContentDate] = useState<Date>(new Date());
  const [focus, setFocus] = useState('');
  const [goal, setGoal] = useState('');
  const [type, setType] = useState<string[]>([]);
  const [keyNotes, setKeyNotes] = useState('');
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean; dueDate: Date; assignedTo?: string; }[]>([]);
  const [sharePointLink, setSharePointLink] = useState('');
  const [contentType, setContentType] = useState<'photos' | 'video' | 'canvas'>('photos');
  const [photoCount, setPhotoCount] = useState<string>('');

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      text: '',
      completed: false,
      dueDate: new Date(),
      assignedTo: '',
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const formData = {
    title,
    caption: keyNotes,
    scheduled_date: contentDate,
    photo_key_points: keyNotes,
    focus_area: focus,
    content_type: contentType,
    tasks,
    photo_count: photoCount,
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[800px] bg-background">
        <form className="space-y-6">
          <div className="p-6 rounded-lg border">
            <Label className="text-foreground text-lg font-semibold mb-4 block">Visuals</Label>
            <RadioGroup
              defaultValue="photos"
              value={contentType}
              onValueChange={(value) => setContentType(value as 'photos' | 'video' | 'canvas')}
              className="flex flex-col space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="photos" id="photos" />
                  <Label htmlFor="photos">Photo Post</Label>
                </div>
                {contentType === 'photos' && (
                  <div className="ml-6">
                    <Input
                      type="number"
                      placeholder="Number of photos needed"
                      value={photoCount}
                      onChange={(e) => setPhotoCount(e.target.value)}
                      className="w-40"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video">Video Post</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="canvas" id="canvas" />
                <Label htmlFor="canvas">Canvas Template</Label>
              </div>
            </RadioGroup>
          </div>

          <FormHeader
            title={title}
            contentDate={contentDate}
            onTitleChange={setTitle}
            onContentDateChange={setContentDate}
          />

          <ContentDetails
            focus={focus}
            goal={goal}
            type={type}
            onFocusChange={setFocus}
            onGoalChange={setGoal}
            onTypeChange={setType}
          />

          {contentType === 'canvas' ? (
            <div className="p-6 rounded-lg border">
              <Label className="text-foreground text-lg font-semibold mb-3 block">Canvas Template Details</Label>
              <p className="text-muted-foreground text-sm">
                This will be a canvas template that can be customized with specific content later.
              </p>
            </div>
          ) : (
            <KeyNotes
              keyNotes={keyNotes}
              onChange={setKeyNotes}
              label={contentType === 'video' ? 'Video Description & Key Points' : 'Photo Key Points'}
            />
          )}

          <VisualTasks
            tasks={tasks}
            onTasksChange={setTasks}
            onTaskAdd={handleAddTask}
            onTaskDelete={handleDeleteTask}
            onTaskToggle={handleToggleTask}
            contentType={contentType}
          />

          <SharePointSection
            sharePointLink={sharePointLink}
            onChange={setSharePointLink}
            contentType={contentType}
          />

          <FormSubmit
            isSubmitting={isSubmitting}
            onCancel={onCancel}
            formData={formData}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};