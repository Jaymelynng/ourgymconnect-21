import { cn } from "@/lib/utils";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { EditMarketingDialog } from "../marketing/EditMarketingDialog";
import { DayHeader } from "./day-components/DayHeader";
import { ContentPreview } from "./day-components/ContentPreview";
import { DayDialog } from "./day-components/DayDialog";
import { X } from "lucide-react";
import { Button } from "../ui/button";

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

  const handleExpand = () => {
    setIsExpanded(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div 
        onClick={handleExpand}
        className={cn(
          // Base styles
          "min-h-[120px] border-b border-r border-border bg-card",
          // Animation and transition
          "transition-all duration-500 ease-in-out transform",
          // Expanded state
          isExpanded && [
            "fixed inset-0 z-50",
            "min-h-screen w-screen",
            "bg-background",
            "overflow-y-auto"
          ],
          // Normal hover state
          !isExpanded && [
            hasItems && "hover:bg-primary/5",
            !hasItems && "hover:bg-secondary/5",
          ],
          // Animation
          "animate-fade-in cursor-pointer"
        )}
      >
        <div className={cn(
          "transition-all duration-300",
          isExpanded ? "container mx-auto py-8" : ""
        )}>
          <div className={cn(
            "flex items-center justify-between",
            isExpanded ? "mb-6" : ""
          )}>
            <DayHeader day={day} currentDate={currentDate} />
            {isExpanded && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCollapse();
                }}
                className="animate-fade-in"
              >
                <X className="h-6 w-6" />
              </Button>
            )}
          </div>
          
          <div className={cn(
            "space-y-4",
            isExpanded ? "mt-8" : "px-2 pb-2"
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
            
            {marketingItems.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
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
    </>
  );
}