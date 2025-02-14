
import { CalendarSection } from "@/components/dashboard/CalendarSection";
import { ContentSeriesSection } from "@/components/dashboard/ContentSeriesSection";
import { EventList } from "@/components/dashboard/EventList";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function Index() {
  const { data: gymDetails } = useQuery({
    queryKey: ['gym_details'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gym_details')
        .select('*')
        .single();
      
      if (error) throw error;
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
        </div>
      </div>
      <ContentSeriesSection />
    </div>
  );
}
