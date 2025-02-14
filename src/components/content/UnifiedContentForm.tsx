
import { ContentTypeSelector } from './ContentTypeSelector';

interface UnifiedContentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UnifiedContentForm({ open, onOpenChange }: UnifiedContentFormProps) {
  return <ContentTypeSelector open={open} onOpenChange={onOpenChange} />;
}
