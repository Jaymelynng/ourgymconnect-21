import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface DayDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  day: Date;
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export function DayDialog({ isOpen, onOpenChange, day, items, onEdit, onDelete }: DayDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "max-w-3xl max-h-[80vh] overflow-y-auto",
        "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom duration-300",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom"
      )}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl animate-fade-in">
            <Calendar className="h-6 w-6 text-primary animate-scale-in" />
            Content for {format(day, "MMMM d, yyyy")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className={cn(
                "bg-card rounded-lg border p-4 space-y-4",
                "animate-fade-in",
                "hover:shadow-md transition-shadow duration-200",
                "transform transition-transform hover:scale-[1.01]"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.scheduled_date && (
                    <p className="text-sm text-primary/80">
                      Going live: {format(new Date(item.scheduled_date), "PPP 'at' h:mm a")}
                    </p>
                  )}
                  {item.due_date && (
                    <p className="text-sm text-rose-500">
                      Due: {format(new Date(item.due_date), "PPP 'at' h:mm a")}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)}
                    className="h-8 w-8 hover:scale-110 transition-transform"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive/90 hover:scale-110 transition-transform"
                    onClick={() => onDelete(item.id)}
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
                  <AccordionItem value="visuals" className="border rounded-lg px-4 hover:bg-accent/5 transition-colors">
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
                  <AccordionItem value="keynotes" className="border rounded-lg px-4 hover:bg-accent/5 transition-colors">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        Key Notes About the Post
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 text-muted-foreground animate-accordion-down">
                      {item.key_notes}
                    </AccordionContent>
                  </AccordionItem>
                )}
                
                {item.photo_examples && (
                  <AccordionItem value="photos" className="border rounded-lg px-4 hover:bg-accent/5 transition-colors">
                    <AccordionTrigger className="hover:no-underline py-3">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        Photo Examples
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 text-muted-foreground animate-accordion-down">
                      <img 
                        src={item.photo_examples} 
                        alt="Example" 
                        className="rounded-lg max-h-64 object-cover transform transition-transform hover:scale-105"
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}