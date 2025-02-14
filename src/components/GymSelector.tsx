
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GymSelectorProps {
  onGymChange?: (gymId: string) => void;
  onChange?: (gymId: string) => void;
}

export function GymSelector({ onGymChange, onChange }: GymSelectorProps) {
  const { toast } = useToast();
  
  const { data: gyms, isLoading, error } = useQuery({
    queryKey: ['gyms'],
    queryFn: async () => {
      try {
        console.log('Fetching gyms from Supabase...');
        const { data, error } = await supabase
          .from('gym_details')
          .select('*')
          .order('gym_name');
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Gyms fetched successfully:', data?.length || 0, 'gyms');
        return data || [];
      } catch (error) {
        console.error('Error fetching gyms:', error);
        toast({
          title: "Connection Error",
          description: "Could not connect to the server. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    retry: 2,
    retryDelay: 1000,
  });

  const handleChange = (value: string) => {
    onGymChange?.(value);
    onChange?.(value);
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load gyms. Please refresh the page or try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) return <div className="animate-pulse h-10 bg-muted rounded-md" />;

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full bg-white border-secondary/20">
        <SelectValue placeholder="Select a gym" />
      </SelectTrigger>
      <SelectContent className="bg-white max-h-[300px]">
        {gyms?.map((gym) => (
          <SelectItem key={gym.id.toString()} value={gym.id.toString()} className="focus:bg-primary/10">
            {gym.gym_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
