
import { useState } from "react";
import { format, startOfWeek, endOfWeek, addDays, addWeeks, subWeeks } from "date-fns";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMarketingContent } from "@/hooks/use-marketing-content";
import { DayCard } from "./week-view/DayCard";
import { TaskDetails } from "./week-view/TaskDetails";
import type { MarketingContent } from "@/types/database";

interface WeekViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

interface DayTask {
  name: string;
  date: Date;
  tasks: MarketingContent[];
}

export function WeekView({ currentDate, onDateChange }: WeekViewProps) {
  const [selectedDay, setSelectedDay] = useState<DayTask | null>(null);

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = endOfWeek(startDate, { weekStartsOn: 1 });

  const { marketingItems, isLoading } = useMarketingContent();

  const nextWeek = () => onDateChange(addWeeks(currentDate, 1));
  const prevWeek = () => onDateChange(subWeeks(currentDate, 1));

  if (isLoading) {
    return (
      <div className="grid grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
        ))}
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Week of {format(startDate, 'MMMM d, yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

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
