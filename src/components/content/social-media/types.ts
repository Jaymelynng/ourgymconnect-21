export interface FormData {
  title: string;
  series: 'single' | 'series';
  contentDate: string;
  taskDueDate: string;
  focus: string;
  goal: string;
  type: string[];
  keyNotes: string;
  visualTasks: { id: number; text: string; completed: boolean }[];
  sharePointLink: string;
}

export interface SubmitButtonProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export interface SharePointSectionProps {
  sharePointLink: string;
  onChange: (value: string) => void;
}

export interface KeyNotesProps {
  keyNotes: string;
  onChange: (value: string) => void;
}

export interface ContentDetailsProps {
  focus: string;
  caption: string;
  onFocusChange: (value: string) => void;
  onCaptionChange: (value: string) => void;
}

export interface VisualTasksProps {
  tasks: { id: number; text: string; completed: boolean }[];
  onTasksChange: (tasks: { id: number; text: string; completed: boolean }[]) => void;
  onTaskAdd: () => void;
  onTaskDelete: (id: number) => void;
  onTaskToggle: (id: number) => void;
}

export interface FormHeaderProps {
  title: string;
  contentDate: Date;
  onTitleChange: (value: string) => void;
  onContentDateChange: (value: Date) => void;
}