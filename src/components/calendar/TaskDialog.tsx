import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TaskPreview } from "./TaskPreview";

interface TaskDialogProps {
  selectedDay: Date | null;
  selectedTasks: any[];
  onOpenChange: (open: boolean) => void;
}

export function TaskDialog({ selectedDay, selectedTasks, onOpenChange }: TaskDialogProps) {
  return (
    <Dialog open={!!selectedDay} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-primary" />
            Tasks for {selectedDay ? format(selectedDay, "MMMM d, yyyy") : ""}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {selectedTasks.map((task) => (
            <TaskPreview key={task.id} task={task} isDialog />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}