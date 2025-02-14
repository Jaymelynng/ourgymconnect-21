
import { cn } from "@/lib/utils";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { EditMarketingDialog } from "../marketing/EditMarketingDialog";
import { DayHeader } from "./day-components/DayHeader";
import { ContentPreview } from "./day-components/ContentPreview";
import { DayDialog } from "./day-components/DayDialog";
import type { MarketingItem } from "@/types/marketing";

interface CalendarDayProps {
  day: Date;
  currentDate: Date;
  tasks: any[];
  marketingItems: MarketingItem[];
  hasItems: boolean;
  onDayClick: (date: Date) => void;
  refetchItems: () => void;
  isFullView?: boolean;
}

export function CalendarDay({ 
  day, 
  currentDate, 
  marketingItems = [], 
  hasItems, 
  refetchItems,
  isFullView = false
}: CalendarDayProps) {
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<MarketingItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('marketing_content')
        .delete()
        .eq('id', parseInt(itemId, 10));

      if (error) throw error;

      toast({
        title: "Content deleted successfully",
        variant: "default",
      });
      
      refetchItems();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error deleting content",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsDialogOpen(true)}
        className={cn(
          "min-h-[100px] border-b border-r border-border bg-card",
          "transition-all duration-300 ease-in-out",
          hasItems ? "hover:bg-primary/5" : "hover:bg-secondary/5",
          "cursor-pointer relative group"
        )}
      >
        <DayHeader day={day} currentDate={currentDate} />
        
        {hasItems && (
          <div className="px-2 pb-2">
            <div className="text-xs font-medium text-primary">
              {marketingItems.length} {marketingItems.length === 1 ? 'item' : 'items'}
            </div>
          </div>
        )}
      </div>

      <DayDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        day={day}
        items={marketingItems}
        onEdit={setEditingItem}
        onDelete={handleDelete}
        isFullScreen={isFullView}
      />

      {editingItem && (
        <EditMarketingDialog
          item={editingItem}
          isOpen={true}
          onClose={() => setEditingItem(null)}
          onUpdate={refetchItems}
        />
      )}
    </>
  );
}
