import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { EditMarketingDialog } from "../marketing/EditMarketingDialog";
import { useToast } from "@/components/ui/use-toast";

export function ListView() {
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const { data: marketingItems, isLoading, refetch } = useQuery({
    queryKey: ['marketing_items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .order('created_at');
      
      if (error) throw error;
      
      const groupedItems = (data || []).reduce((acc: Record<string, typeof data>, item) => {
        const date = item.created_at ? format(new Date(item.created_at), 'yyyy-MM-dd') : 'No Date';
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});

      return groupedItems;
    }
  });

  const handleDelete = async (itemId: string | number) => {
    try {
      const { error } = await supabase
        .from('marketing_content')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Post deleted successfully",
        variant: "default",
      });
      
      refetch();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error deleting post",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return (
    <div className="animate-pulse space-y-4">
      {[1,2,3].map(i => (
        <div key={i} className="h-32 bg-muted rounded-lg" />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {Object.entries(marketingItems || {}).map(([date, dateItems]) => (
        <div key={date} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transform transition-all duration-300 hover:scale-105">
              {date === 'No Date' ? date : format(new Date(date), 'MMMM d, yyyy')}
            </h2>
          </div>
          {(dateItems as any[]).map((item) => (
            <Card key={item.id} className="p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 transition-all duration-300 hover:scale-110 hover:bg-primary/10"
                    onClick={() => setEditingItem(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive/90 transition-all duration-300 hover:scale-110"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {item.item_type && (
                    <Badge 
                      variant="secondary" 
                      className="ml-2 animate-fade-in hover:bg-primary/20 transition-colors duration-300"
                    >
                      {item.item_type}
                    </Badge>
                  )}
                </div>
              </div>

              {item.caption && (
                <div className="mb-6 text-muted-foreground hover:text-foreground transition-colors duration-300">
                  <p>{item.caption}</p>
                </div>
              )}
              
              <Accordion type="single" collapsible className="w-full space-y-2">
                <AccordionItem value="visuals" className="border rounded-lg px-4 transition-all duration-300 hover:border-primary">
                  <AccordionTrigger className="hover:no-underline py-3 group">
                    <span className="flex items-center gap-2 text-sm font-medium group-hover:text-primary transition-colors duration-300">
                      Visuals for Managers
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-muted-foreground">
                    {item.visuals_notes || 'No visuals notes available'}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="keynotes" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      Key Notes About the Post
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-muted-foreground">
                    {item.key_notes || 'No key notes available'}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="photos" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      Photo Examples
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-muted-foreground">
                    {item.photo_examples || 'No photo examples available'}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          ))}
        </div>
      ))}

      {editingItem && (
        <EditMarketingDialog
          item={editingItem}
          isOpen={true}
          onClose={() => setEditingItem(null)}
          onUpdate={() => {
            refetch();
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}
