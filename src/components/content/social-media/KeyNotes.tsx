import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { KeyNotesProps } from './types';

export const KeyNotes = ({ keyNotes, onChange }: KeyNotesProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <Label className="text-gray-700">Key Notes</Label>
      <Textarea
        rows={4}
        value={keyNotes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Overall notes about the content..."
        className="bg-white border-gray-300 focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};