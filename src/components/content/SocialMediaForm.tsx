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

  const formData = {
    title,
    caption,
    scheduled_date: contentDate,
    photo_key_points: keyNotes,
    focus_area: focus,
    // Add gym_id if available from context
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