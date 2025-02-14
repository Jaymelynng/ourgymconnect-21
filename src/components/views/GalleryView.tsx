import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Image } from "lucide-react";

type MarketingItem = {
  id: number;
  title: string;
  description: string | null;
  photo_examples: string | null;
};

export function GalleryView() {
  const { data: marketingItems = [], isLoading } = useQuery({
    queryKey: ['marketing_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('id, title, description, photo_examples')
        .not('photo_examples', 'is', null)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching marketing items:', error);
        return [];
      }
      return data || [];
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {marketingItems.map((item: MarketingItem) => (
        <div key={item.id} className="bg-card p-4 rounded-lg shadow-md">
          <h3 className="font-semibold">{item.title}</h3>
          {item.photo_examples && (
            <img src={item.photo_examples} alt={item.title} className="w-full h-auto rounded-lg mt-2" />
          )}
          {item.description && (
            <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}