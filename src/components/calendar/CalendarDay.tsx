import { cn } from "@/lib/utils";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { EditMarketingDialog } from "../marketing/EditMarketingDialog";
import { DayHeader } from "./day-components/DayHeader";
import { ContentPreview } from "./day-components/ContentPreview";
import { DayDialog } from "./day-components/DayDialog";

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
  const [isHovered, setIsHovered] = useState(false);

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
    <>
      <div 
        onClick={() => setIsDialogOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "min-h-[120px] border-b border-r border-border bg-card",
          "transition-all duration-300 ease-in-out transform",
          isHovered && "scale-[1.02] shadow-lg",
          hasItems && "hover:bg-primary/10",
          !hasItems && "hover:bg-secondary/5",
          "animate-fade-in cursor-pointer"
        )}
      >
        <DayHeader day={day} currentDate={currentDate} />
        
        <div className={cn(
          "pt-8 px-2 pb-2 space-y-2",
          "transition-all duration-300",
          isHovered && "transform translate-y-[-4px]"
        )}>
          {marketingItems.map((item) => (
            <ContentPreview
              key={item.id}
              item={item}
              onEdit={setEditingItem}
              onDelete={handleDelete}
              onDayClick={(e) => {
                e.stopPropagation();
                onDayClick(day);
              }}
            />
          ))}
        </div>
      </div>

      <DayDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        day={day}
        items={marketingItems}
        onEdit={setEditingItem}
        onDelete={handleDelete}
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