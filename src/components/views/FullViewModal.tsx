import { Dialog, DialogContent } from "@/components/ui/dialog";
import { WeekView } from "../dashboard/WeekView";
import { MonthView } from "../dashboard/MonthView";
import { ListView } from "../dashboard/ListView";

interface FullViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewType: 'week' | 'month' | 'list';
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export function FullViewModal({ 
  isOpen, 
  onClose, 
  viewType,
  currentDate,
  onDateChange
}: FullViewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        {viewType === 'week' && (
          <WeekView 
            currentDate={currentDate}
            onDateChange={onDateChange}
          />
        )}
        {viewType === 'month' && (
          <MonthView 
            currentDate={currentDate}
            onDateChange={onDateChange}
          />
        )}
        {viewType === 'list' && (
          <ListView 
            currentDate={currentDate}
            onDateChange={onDateChange}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}