
import { cn } from "@/lib/utils";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { EditMarketingDialog } from "../marketing/EditMarketingDialog";
import { DayHeader } from "./day-components/DayHeader";
import { ContentPreview } from "./day-components/ContentPreview";
import { DayDialog } from "./day-components/DayDialog";
import { ChevronDown } from "lucide-react";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = async (itemId: string | number) => {
    try {
      const id = typeof itemId === 'string' ? parseInt(itemId, 10) : itemId;
      
      const { error } = await supabase
        .from('marketing_content')
        .delete()
        .eq('id', id);

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={cn(
        "min-h-[120px] border-b border-r border-border bg-card",
        "transition-all duration-300 ease-in-out",
        hasItems ? "hover:bg-primary/5" : "hover:bg-secondary/5",
        "animate-fade-in cursor-pointer",
        isExpanded ? "col-span-2 row-span-2" : ""
      )}
      onClick={toggleExpand}
    >
      <div 
        className="p-4 flex items-center justify-between group"
      >
        <DayHeader day={day} currentDate={currentDate} />
        <ChevronDown className={cn(
          "h-4 w-4 text-muted-foreground transition-transform duration-300",
          "opacity-0 group-hover:opacity-100",
          isExpanded && "transform rotate-180 opacity-100"
        )} />
      </div>
      
      <div 
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4 space-y-4">
            {marketingItems.map((item) => (
              <ContentPreview
                key={item.id}
                item={item}
                onEdit={setEditingItem}
                onDelete={handleDelete}
                onDayClick={(e) => {
                  e.stopPropagation();
                  setIsDialogOpen(true);
                }}
              />
            ))}
            
            {marketingItems.length === 0 && (
              <p className="text-center text-muted-foreground py-2">
                No content scheduled for this day
              </p>
            )}
          </div>
        </div>
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
