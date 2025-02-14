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

  return (
    <>
      <div 
        onClick={() => setIsDialogOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          // Base styles
          "min-h-[120px] border-b border-r border-border bg-card",
          // Animation and transition
          "transition-all duration-500 ease-in-out transform",
          // Hover states with expanded size
          isHovered && [
            "absolute inset-4 z-50 scale-[1.02]",
            "shadow-2xl rounded-xl border",
            "min-h-[80vh]",
            "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95"
          ],
          hasItems && "hover:bg-primary/5",
          !hasItems && "hover:bg-secondary/5",
          // Animation
          "animate-fade-in cursor-pointer"
        )}
        style={{
          transformOrigin: 'center',
        }}
      >
        <DayHeader day={day} currentDate={currentDate} />
        
        <div className={cn(
          "px-2 pb-2 space-y-2",
          "transition-all duration-300",
          isHovered ? "pt-4 px-4 md:px-8" : "pt-8",
          isHovered && "overflow-y-auto max-h-[calc(80vh-4rem)]"
        )}>
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