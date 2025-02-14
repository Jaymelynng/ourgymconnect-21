
import { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DayCard } from "../dashboard/week-view/DayCard";
import { TaskDetails } from "../dashboard/week-view/TaskDetails";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { MarketingItem } from "@/hooks/use-marketing-content";

interface WeekViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

interface DayTask {
  name: string;
  date: Date;
  tasks: MarketingItem[];
}

export function WeekView({ currentDate }: WeekViewProps) {
  const [selectedDay, setSelectedDay] = useState<DayTask | null>(null);

  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });

  const { data: marketingItems = [] } = useQuery({
    queryKey: ['marketing_content', format(currentDate, 'yyyy-MM-dd')],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .order('scheduled_date');

      if (error) throw error;
      return data as MarketingItem[];
    }
  });

  // Create an array of the 6 days (Mon-Sat)
  const weekDays = Array.from({ length: 6 }, (_, index) => {
    const date = addDays(startOfCurrentWeek, index);
    const dayItems = marketingItems.filter(item => 
      item.scheduled_date && 
      format(new Date(item.scheduled_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    return {
      name: format(date, 'EEEE'),
      date: date,
      tasks: dayItems
    };
  });

  const handleSelectDay = (day: DayTask) => {
    setSelectedDay(day);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Weekly Content Schedule</h2>
      <div className="grid grid-cols-6 gap-4">
        {weekDays.map((day) => (
          <DayCard
            key={day.name}
            name={day.name}
            date={day.date}
            tasks={day.tasks}
            onClick={() => handleSelectDay(day)}
          />
        ))}
      </div>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="space-y-4">
            {selectedDay?.tasks.map((task) => (
              <TaskDetails key={task.id} task={task} />
            ))}
            {!selectedDay?.tasks.length && (
              <p className="text-center text-muted-foreground py-4">
                No tasks scheduled for this day
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
