import { Button } from "@/components/ui/button";
import { format, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { EditMarketingDialog } from "../marketing/EditMarketingDialog";

interface CalendarDayProps {
  day: Date;
  currentDate: Date;
  tasks: any[];
  marketingItems: any[];
  hasItems: boolean;
  onDayClick: (date: Date) => void;
  refetchItems: () => void;
}

export function CalendarDay({ 
  day, 
  currentDate, 
  marketingItems, 
  hasItems, 
  onDayClick,
  refetchItems
}: CalendarDayProps) {
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleDelete = async (itemId: string) => {
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
      
      refetchItems();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error deleting post",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[120px] border-b border-r border-border bg-card hover:bg-secondary/5 transition-colors relative">
      <div 
        className={cn(
          "absolute top-2 right-2 text-sm font-medium",
          !isSameMonth(day, currentDate) && "text-muted-foreground/50",
          isToday(day) && "text-primary font-bold"
        )}
      >
        {format(day, "d")}
      </div>
      
      <div className="pt-8 px-2 pb-2">
        {marketingItems.map((item) => (
          <HoverCard key={item.id}>
            <HoverCardTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left h-auto p-2 mb-1",
                  "bg-secondary/10 hover:bg-secondary/20",
                  "focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                )}
                onClick={() => onDayClick(day)}
              >
                <div className="w-full">
                  <div className="text-xs font-medium truncate">{item.title}</div>
                  {item.caption && (
                    <div className="text-xs text-muted-foreground truncate mt-0.5">
                      {item.caption}
                    </div>
                  )}
                </div>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium">{item.title}</h4>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => setEditingItem(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive/90"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {item.caption && <p className="text-sm text-muted-foreground">{item.caption}</p>}
                
                <Accordion type="single" collapsible className="w-full">
                  {item.visuals_notes && (
                    <AccordionItem value="visuals" className="border-b">
                      <AccordionTrigger className="text-sm">Visuals for Managers</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {item.visuals_notes}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  
                  {item.key_notes && (
                    <AccordionItem value="keynotes" className="border-b">
                      <AccordionTrigger className="text-sm">Key Notes About the Post</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {item.key_notes}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  
                  {item.photo_examples && (
                    <AccordionItem value="photos" className="border-b">
                      <AccordionTrigger className="text-sm">Photo Examples</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {item.photo_examples}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>

      {editingItem && (
        <EditMarketingDialog
          item={editingItem}
          isOpen={true}
          onClose={() => setEditingItem(null)}
          onUpdate={refetchItems}
        />
      )}
    </div>
  );
}