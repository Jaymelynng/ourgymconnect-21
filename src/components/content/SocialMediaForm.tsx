import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FormHeader } from './social-media/FormHeader';
import { ContentDetails } from './social-media/ContentDetails';
import { KeyNotes } from './social-media/KeyNotes';
import { VisualTasks } from './social-media/VisualTasks';
import { SharePointSection } from './social-media/SharePointSection';
import { SubmitButtons } from './social-media/SubmitButtons';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const SocialMediaForm = ({ onCancel }: { onCancel: () => void }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [title, setTitle] = useState('');
  const [series, setSeries] = useState<'single' | 'series'>('single');
  const [contentDate, setContentDate] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [focus, setFocus] = useState('');
  const [goal, setGoal] = useState('');
  const [type, setType] = useState<string[]>([]);
  const [keyNotes, setKeyNotes] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sharePointLink, setSharePointLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('marketing_content')
        .insert([
          {
            title,
            series_type: series,
            scheduled_date: contentDate,
            due_date: taskDueDate,
            focus_area: focus,
            description: goal,
            content_type: type.join(', '),
            photo_key_points: keyNotes,
            media_urls: tasks.map(task => task.text),
            sharepoint_url: sharePointLink,
          }
        ])
        .select();

      if (error) throw error;

      // Invalidate all relevant queries
      await queryClient.invalidateQueries({ queryKey: ['marketing_content'] });
      await queryClient.invalidateQueries({ queryKey: ['marketing_items'] });
      
      toast({
        title: "Success",
        description: "Content created successfully",
      });
      
      onCancel();
    } catch (error) {
      console.error('Error creating content:', error);
      toast({
        title: "Error",
        description: "Failed to create content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTaskAdd = () => {
    setTasks([
      ...tasks,
      { id: Date.now(), text: '', completed: false }
    ]);
  };

  const handleTaskUpdate = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  const handleTaskDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleTaskToggle = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormHeader
        title={title}
        series={series}
        contentDate={contentDate}
        taskDueDate={taskDueDate}
        onTitleChange={setTitle}
        onSeriesChange={setSeries}
        onContentDateChange={setContentDate}
        onTaskDueDateChange={setTaskDueDate}
      />

      <ContentDetails
        focus={focus}
        goal={goal}
        type={type}
        onFocusChange={setFocus}
        onGoalChange={setGoal}
        onTypeChange={setType}
      />

      <KeyNotes
        keyNotes={keyNotes}
        onChange={setKeyNotes}
      />

      <VisualTasks
        tasks={tasks}
        onTaskAdd={handleTaskAdd}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onTaskToggle={handleTaskToggle}
      />

      <SharePointSection
        sharePointLink={sharePointLink}
        onChange={setSharePointLink}
      />

      <SubmitButtons
        isSubmitting={isSubmitting}
        onCancel={onCancel}
      />
    </form>
  );
};