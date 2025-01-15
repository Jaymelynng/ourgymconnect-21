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