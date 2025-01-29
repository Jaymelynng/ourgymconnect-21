import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/RichTextEditor';

interface KeyNotesProps {
  keyNotes: string;
  onChange: (value: string) => void;
  label?: string;
}

export const KeyNotes = ({ keyNotes, onChange, label = "Key Notes" }: KeyNotesProps) => {
  return (
    <div className="bg-[#1A1F2C] p-4 rounded-lg shadow-sm">
      <Label className="text-gray-200 mb-3 block">{label}</Label>
      <RichTextEditor content={keyNotes} onChange={onChange} />
    </div>
  );
};