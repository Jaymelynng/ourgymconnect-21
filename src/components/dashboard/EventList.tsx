import { colors } from "@/lib/colors";

export function EventList() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div 
          key={`event-${index}`}
          className="p-3 rounded-lg transition-all cursor-pointer bg-card border-l-4 border-l-primary"
        >
          <div className="text-sm font-medium text-primary">
            Dec {index + 1}, 2024
          </div>
          <div className="text-sm text-muted-foreground">
            Scheduled Event {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
}