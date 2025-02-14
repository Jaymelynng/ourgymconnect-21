
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MarketingContent } from "@/types/database";

interface Event {
  id: number;
  title: string;
  date: string;
  type: string;
  photo?: string;
}

interface EventListProps {
  events: MarketingContent[];
}

export function EventList({ events }: EventListProps) {
  if (!events.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No upcoming events</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start space-x-4 bg-muted/50 p-3 rounded-lg"
            >
              {event.photo_examples?.[0] ? (
                <img
                  src={event.photo_examples[0]}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <Calendar className="h-12 w-12 p-2 bg-primary/10 rounded-full text-primary" />
              )}
              <div className="space-y-1">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {event.scheduled_date ? format(new Date(event.scheduled_date), 'PPP') : 'Date TBD'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
