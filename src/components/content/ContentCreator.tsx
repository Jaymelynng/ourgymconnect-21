
import { UnifiedContentForm } from './UnifiedContentForm';

interface ContentCreatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContentCreator = ({ open, onOpenChange }: ContentCreatorProps) => {
  return <UnifiedContentForm open={open} onOpenChange={onOpenChange} />;
};
