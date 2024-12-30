import { useState } from "react";
import { WeekView } from "./WeekView";
import { MonthView } from "./MonthView";
import { EventList } from "./EventList";
import { Button } from "@/components/ui/button";

export function CalendarView() {
  const [viewType, setViewType] = useState('week');

  return (
    <div className="bg-card rounded-lg shadow-sm p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-primary">Calendar View</h3>
        <div className="flex gap-2">
          <Button 
            variant={viewType === 'week' ? "default" : "secondary"}
            onClick={() => setViewType('week')}
          >
            Week
          </Button>
          <Button 
            variant={viewType === 'month' ? "default" : "secondary"}
            onClick={() => setViewType('month')}
          >
            Month
          </Button>
          <Button 
            variant={viewType === 'list' ? "default" : "secondary"}
            onClick={() => setViewType('list')}
          >
            List
          </Button>
        </div>
      </div>
      
      {viewType === 'week' && <WeekView />}
      {viewType === 'month' && <MonthView />}
      {viewType === 'list' && <EventList />}
    </div>
  );
}