
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/RichTextEditor';
import { KeyNotesProps } from './types';

export const KeyNotes = ({ keyNotes, onChange, label = "Key Notes" }: KeyNotesProps) => {
  return (
    <div className="bg-[#1A1F2C] p-4 rounded-lg shadow-sm">
      <Label className="text-gray-200 mb-3 block">{label}</Label>
      <RichTextEditor content={keyNotes} onChange={onChange} />
    </div>
  );
};
