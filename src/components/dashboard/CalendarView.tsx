import { useState } from "react";
import { WeekView } from "./WeekView";
import { MonthView } from "./MonthView";
import { ListView } from "./ListView";
import { Button } from "@/components/ui/button";
import { FullViewModal } from "../views/FullViewModal";

export function CalendarView() {
  const [viewType, setViewType] = useState<'week' | 'month' | 'list'>('week');
  const [isFullView, setIsFullView] = useState(false);

  const handleViewClick = () => {
    setIsFullView(true);
  };

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-xl text-primary">Calendar View</h3>
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
      
      <div onClick={handleViewClick} className="cursor-pointer">
        {viewType === 'week' && <WeekView />}
        {viewType === 'month' && <MonthView />}
        {viewType === 'list' && <ListView />}
      </div>

      <FullViewModal
        isOpen={isFullView}
        onClose={() => setIsFullView(false)}
        viewType={viewType}
      />
    </div>
  );
}