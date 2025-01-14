import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Image } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type MarketingItem = Tables<'marketing_content', 'Row'>;

export function GalleryView() {
  const { data: marketingItems, isLoading } = useQuery<MarketingItem[]>({
    queryKey: ['marketing_items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
      ))}
    </div>
  );

  // Ensure marketingItems is an array and handle empty state
  const items = Array.isArray(marketingItems) ? marketingItems : [];

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No marketing items found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {items.map((item: MarketingItem) => (
        <Card key={item.id} className="p-4 space-y-4 hover:shadow-lg transition-shadow">
          <div className="aspect-square bg-accent/10 rounded-lg flex items-center justify-center">
            {item.photo_examples ? (
              <img 
                src={item.photo_examples} 
                alt={item.title || 'Marketing content'}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Image className="w-12 h-12 text-accent/40" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-lg">{item.title}</h3>
            {item.caption && (
              <p className="text-sm text-muted-foreground mt-1">{item.caption}</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
