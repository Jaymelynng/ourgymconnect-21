
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MarketingContent } from "@/types/database";

interface ListViewProps {
  events: MarketingContent[];
}

export function ListView({ events }: ListViewProps) {
  const sortedEvents = [...events].sort((a, b) => {
    if (!a.scheduled_date || !b.scheduled_date) return 0;
    return new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedEvents.length === 0 ? (
        <Card className="p-6">
          <p className="text-center text-muted-foreground">No events scheduled</p>
        </Card>
      ) : (
        sortedEvents.map((event) => (
          <Card key={event.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{event.title}</h3>
                {event.scheduled_date && (
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.scheduled_date), 'PPP')}
                  </p>
                )}
              </div>
              <Badge variant="secondary">
                {event.content_type}
              </Badge>
            </div>
            {event.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {event.description}
              </p>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
