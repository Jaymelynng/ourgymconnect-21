import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { GymDetails } from '@/types/database';

interface GymSelectorProps {
  onChange: (value: string) => void;
}

export function GymSelector({ onChange }: GymSelectorProps) {
  const { data: gyms, isLoading } = useQuery({
    queryKey: ['gyms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gym_details')
        .select('*')
        .order('gym_name', { ascending: true });
      
      if (error) throw error;
      return data as GymDetails[];
    }
  });

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Loading gyms..." />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a gym" />
      </SelectTrigger>
      <SelectContent>
        {gyms?.map((gym) => (
          <SelectItem key={gym.id} value={gym.id.toString()}>
            {gym.gym_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}