import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "./ui/use-toast";

interface GymSelectorProps {
  onGymChange?: (gymId: string) => void;
}

export function GymSelector({ onGymChange }: GymSelectorProps) {
  const { toast } = useToast();
  
  const { data: gyms, isLoading } = useQuery({
    queryKey: ['gyms'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('gyms')
          .select('*')
          .order('name');
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching gyms:', error);
        toast({
          title: "Error fetching gyms",
          description: "Please try again later",
          variant: "destructive",
        });
        return [];
      }
    }
  });

  if (isLoading) return <div className="animate-pulse h-10 bg-muted rounded-md" />;

  return (
    <Select onValueChange={onGymChange}>
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