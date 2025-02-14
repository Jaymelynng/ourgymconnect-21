
import { CalendarSection } from "@/components/dashboard/CalendarSection";
import { ContentSeriesSection } from "@/components/dashboard/ContentSeriesSection";
import { EventList } from "@/components/dashboard/EventList";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { GymDetails } from "@/types/database";

export default function Index() {
  const { data: gyms = [] } = useQuery<GymDetails[]>({
    queryKey: ['gym_details'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gym_details')
        .select('*')
        .order('gym_name', { ascending: true });
      
      if (error) {
        console.error('Error fetching gyms:', error);
        return [];
      }
      return data;
    }
  });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CalendarSection />
        </div>
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Upcoming Events</h3>
            <EventList />
          </Card>
          {gyms.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Gyms ({gyms.length})</h3>
              <div className="space-y-2">
                {gyms.map(gym => (
                  <div key={gym.id} className="text-sm text-muted-foreground">
                    {gym.gym_name}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
      <ContentSeriesSection />
    </div>
  );
}
