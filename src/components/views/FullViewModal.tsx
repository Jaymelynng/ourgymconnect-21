import { Dialog, DialogContent } from "@/components/ui/dialog";
import { WeekView } from "../dashboard/WeekView";
import { MonthView } from "../dashboard/MonthView";
import { ListView } from "../dashboard/ListView";

interface FullViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewType: 'week' | 'month' | 'list';
}

export function FullViewModal({ isOpen, onClose, viewType }: FullViewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        {viewType === 'week' && <WeekView />}
        {viewType === 'month' && <MonthView />}
        {viewType === 'list' && <ListView />}
      </DialogContent>
    </Dialog>
  );
}