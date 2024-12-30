import { colors } from "@/lib/colors";

export function WeekView() {
  return (
    <div className="grid grid-cols-6 gap-2">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center text-sm font-medium p-2 text-muted-foreground">
          {day}
        </div>
      ))}
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`day-${index}`}
          className="aspect-square rounded-lg transition-all cursor-pointer hover:shadow-lg bg-primary/80"
        >
          <div className="h-full p-2">
            <span className="text-white text-sm">{index + 1}</span>
          </div>
        </div>
      ))}
    </div>
  );
}