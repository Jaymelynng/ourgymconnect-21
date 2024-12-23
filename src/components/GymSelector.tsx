import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GymSelector() {
  const { data: gyms, isLoading } = useQuery({
    queryKey: ['gyms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gyms')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) return <div className="animate-pulse h-10 bg-muted rounded-md" />;

  return (
    <Select>
      <SelectTrigger className="w-full bg-white border-secondary/20">
        <SelectValue placeholder="Select a gym" />
      </SelectTrigger>
      <SelectContent className="bg-white max-h-[300px]">
        {gyms?.map((gym) => (
          <SelectItem key={gym.id} value={gym.id} className="focus:bg-primary/10">
            {gym.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}