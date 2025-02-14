
import { useState } from "react";
import { WeekView } from "./WeekView";
import { MonthView } from "./MonthView";
import { ListView } from "./ListView";
import { Button } from "@/components/ui/button";
import { FullViewModal } from "../views/FullViewModal";

export function CalendarView() {
  const [viewType, setViewType] = useState<'week' | 'month' | 'list'>('week');
  const [isFullView, setIsFullView] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleViewClick = () => {
    setIsFullView(true);
  };

  return (
    <div className="bg-card rounded-lg shadow-lg w-full overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold text-xl text-primary">Calendar View</h3>
        <div className="flex gap-2">
          <Button 
            variant={viewType === 'week' ? "default" : "secondary"}
            onClick={() => setViewType('week')}
            className="transform hover:scale-105 transition-transform"
          >
            Week
          </Button>
          <Button 
            variant={viewType === 'month' ? "default" : "secondary"}
            onClick={() => setViewType('month')}
            className="transform hover:scale-105 transition-transform"
          >
            Month
          </Button>
          <Button 
            variant={viewType === 'list' ? "default" : "secondary"}
            onClick={() => setViewType('list')}
            className="transform hover:scale-105 transition-transform"
          >
            List
          </Button>
        </div>
      </div>
      
      <div 
        onClick={handleViewClick} 
        className="cursor-pointer w-full min-h-[calc(100vh-200px)] p-4"
      >
        {viewType === 'week' && (
          <WeekView 
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        )}
        {viewType === 'month' && (
          <MonthView 
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        )}
        {viewType === 'list' && (
          <ListView 
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        )}
      </div>

      <FullViewModal
        isOpen={isFullView}
        onClose={() => setIsFullView(false)}
        viewType={viewType}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />
    </div>
  );
}
