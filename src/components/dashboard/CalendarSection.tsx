
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { WeekView } from "./WeekView";
import { MonthView } from "./MonthView";
import { ListView } from "./ListView";
import { Button } from "@/components/ui/button";
import type { MarketingContent } from "@/types/database";

export function CalendarSection() {
  const [viewType, setViewType] = useState<'week' | 'month' | 'list'>('week');

  return (
    <Card className="p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-primary">Calendar View</h3>
        <div className="flex gap-2">
          <Button 
            variant={viewType === 'week' ? 'default' : 'secondary'}
            onClick={() => setViewType('week')}
          >
            Week
          </Button>
          <Button 
            variant={viewType === 'month' ? 'default' : 'secondary'}
            onClick={() => setViewType('month')}
          >
            Month
          </Button>
          <Button 
            variant={viewType === 'list' ? 'default' : 'secondary'}
            onClick={() => setViewType('list')}
          >
            List
          </Button>
        </div>
      </div>
      
      {viewType === 'week' && <WeekView currentDate={new Date()} onDateChange={(date) => console.log(date)} />}
      {viewType === 'month' && <MonthView currentDate={new Date()} onDateChange={(date) => console.log(date)} />}
      {viewType === 'list' && <ListView currentDate={new Date()} onDateChange={(date) => console.log(date)} />}
    </Card>
  );
}
