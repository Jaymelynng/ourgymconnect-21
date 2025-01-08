import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import { AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useMarketingContent } from "@/hooks/use-marketing-content";
import { DayCard } from "./week-view/DayCard";
import { TaskDetails } from "./week-view/TaskDetails";

interface DayTask {
  name: string;
  date: Date;
  tasks: any[];
}

export function WeekView() {
  const [selectedDay, setSelectedDay] = useState<DayTask | null>(null);

  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const endDate = endOfWeek(startDate, { weekStartsOn: 1 });

  const { data: marketingItems = [], isError } = useMarketingContent(startDate, endDate);

  if (isError) {
    return (
      <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10 text-destructive">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <p>Failed to load weekly content. Please try again later.</p>
        </div>
      </div>
    );
  }

  const weekDays = Array.from({ length: 6 }, (_, index) => {
    const date = addDays(startDate, index);
    const dayTasks = marketingItems.filter(item => 
      item.scheduled_date && 
      format(new Date(item.scheduled_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    return {
      name: format(date, 'EEEE'),
      date,
      tasks: dayTasks
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Weekly Content Schedule</h2>
      <div className="grid grid-cols-6 gap-4">
        {weekDays.map((day) => (
          <DayCard
            key={day.name}
            {...day}
            onClick={() => setSelectedDay(day)}
          />
        ))}
      </div>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDay?.name} - {selectedDay?.date ? format(selectedDay.date, 'MMMM d, yyyy') : ''}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {selectedDay?.tasks.length ? (
              selectedDay.tasks.map((task) => (
                <TaskDetails key={task.id} task={task} />
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No tasks scheduled for this day.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}