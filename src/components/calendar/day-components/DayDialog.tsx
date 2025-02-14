
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { MarketingItem } from "@/types/marketing";

interface DayDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  day: Date;
  items: MarketingItem[];
  onEdit: (item: MarketingItem) => void;
  onDelete: (id: string) => void;
  isFullScreen?: boolean;
}

export function DayDialog({ 
  isOpen, 
  onOpenChange, 
  day, 
  items, 
  onEdit, 
  onDelete,
  isFullScreen = false
}: DayDialogProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const Content = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">
            {format(day, "MMMM d, yyyy")}
          </h2>
        </div>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className={cn(
              "bg-card rounded-lg border p-4 space-y-4",
              "animate-fade-in",
              "transition-all duration-300",
              "hover:shadow-md",
              "transform",
              hoveredItem === item.id.toString() ? "scale-[1.02]" : "scale-100"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredItem(item.id.toString())}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-primary/80">
                  {format(new Date(item.scheduled_date), "PPP 'at' h:mm a")}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(item)}
                  className={cn(
                    "h-8 w-8",
                    "transition-all duration-300",
                    hoveredItem === item.id.toString() ? "scale-110" : "scale-100"
                  )}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 text-destructive",
                    "transition-all duration-300",
                    hoveredItem === item.id.toString() ? "scale-110" : "scale-100"
                  )}
                  onClick={() => onDelete(item.id.toString())}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {item.description && (
              <p className="text-sm text-muted-foreground">{item.description}</p>
            )}
            
            <Accordion type="single" collapsible className="w-full space-y-2">
              {item.visuals_notes && (
                <AccordionItem value="visuals" className={cn(
                  "border rounded-lg px-4",
                  "transition-colors duration-300",
                  "hover:bg-accent/5"
                )}>
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      Visuals for Managers
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-muted-foreground animate-accordion-down">
                    {item.visuals_notes}
                  </AccordionContent>
                </AccordionItem>
              )}
              
              {item.key_notes && (
                <AccordionItem value="keynotes" className={cn(
                  "border rounded-lg px-4",
                  "transition-colors duration-300",
                  "hover:bg-accent/5"
                )}>
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      Key Notes
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-muted-foreground animate-accordion-down">
                    {item.key_notes}
                  </AccordionContent>
                </AccordionItem>
              )}
              
              {item.photo_examples && (
                <AccordionItem value="photos" className={cn(
                  "border rounded-lg px-4",
                  "transition-colors duration-300",
                  "hover:bg-accent/5"
                )}>
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      Photo Examples
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-muted-foreground animate-accordion-down">
                    <img 
                      src={item.photo_examples} 
                      alt="Example" 
                      className={cn(
                        "rounded-lg max-h-64 object-cover",
                        "transform transition-transform duration-300",
                        "hover:scale-105"
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No tasks or content scheduled for this day
          </div>
        )}
      </div>
    </div>
  );

  if (isFullScreen) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Calendar View</DialogTitle>
          </DialogHeader>
          <Content />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Calendar View</SheetTitle>
        </SheetHeader>
        <Content />
      </SheetContent>
    </Sheet>
  );
}
