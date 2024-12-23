import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Image } from "lucide-react";

export function GalleryView() {
  const { data: marketingItems, isLoading } = useQuery({
    queryKey: ['marketing_items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
    {[1,2,3,4,5,6].map(i => (
      <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
    ))}
  </div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {marketingItems.map((item) => (
        <Card key={item.id} className="p-4 space-y-4 hover:shadow-lg transition-shadow">
          <div className="aspect-square bg-accent/10 rounded-lg flex items-center justify-center">
            {item.photo_examples ? (
              <img 
                src={item.photo_examples} 
                alt={item.title}
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