import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FormHeader } from './social-media/FormHeader';
import { ContentDetails } from './social-media/ContentDetails';
import { KeyNotes } from './social-media/KeyNotes';
import { VisualTasks } from './social-media/VisualTasks';
import { SharePointSection } from './social-media/SharePointSection';
import { FormSubmit } from './social-media/FormSubmit';

interface SocialMediaFormProps {
  onCancel: () => void;
}

export const SocialMediaForm = ({ onCancel }: SocialMediaFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [contentDate, setContentDate] = useState<Date>(new Date());
  const [focus, setFocus] = useState('');
  const [keyNotes, setKeyNotes] = useState('');
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean; }[]>([]);
  const [sharePointLink, setSharePointLink] = useState('');

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      text: '',
      completed: false,
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
    caption,
    scheduled_date: contentDate,
    photo_key_points: keyNotes,
    focus_area: focus,
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[800px]">
        <form className="space-y-6">
          <FormHeader
            title={title}
            contentDate={contentDate}
            onTitleChange={setTitle}
            onContentDateChange={setContentDate}
          />

          <ContentDetails
            focus={focus}
            caption={caption}
            onFocusChange={setFocus}
            onCaptionChange={setCaption}
          />

          <KeyNotes
            keyNotes={keyNotes}
            onChange={setKeyNotes}
          />

          <VisualTasks
            tasks={tasks}
            onTasksChange={setTasks}
            onTaskAdd={handleAddTask}
            onTaskDelete={handleDeleteTask}
            onTaskToggle={handleToggleTask}
          />

          <SharePointSection
            sharePointLink={sharePointLink}
            onChange={setSharePointLink}
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