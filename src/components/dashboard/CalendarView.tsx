
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
    <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border/40 h-[calc(100vh-180px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 border-b bg-muted/30">
        <h3 className="font-semibold text-3xl text-primary">Calendar View</h3>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant={viewType === 'week' ? "default" : "secondary"}
            onClick={() => setViewType('week')}
            size="lg"
            className="transform hover:scale-105 transition-transform min-w-[120px] text-lg"
          >
            Week
          </Button>
          <Button 
            variant={viewType === 'month' ? "default" : "secondary"}
            onClick={() => setViewType('month')}
            size="lg"
            className="transform hover:scale-105 transition-transform min-w-[120px] text-lg"
          >
            Month
          </Button>
          <Button 
            variant={viewType === 'list' ? "default" : "secondary"}
            onClick={() => setViewType('list')}
            size="lg"
            className="transform hover:scale-105 transition-transform min-w-[120px] text-lg"
          >
            List
          </Button>
        </div>
      </div>
      
      <div 
        onClick={handleViewClick} 
        className="flex-1 overflow-auto p-8 bg-white dark:bg-gray-950"
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
