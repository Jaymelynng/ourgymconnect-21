import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Content for {format(day, "MMMM d, yyyy")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-lg border p-4 space-y-4">
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
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/90"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              )}
              
              <Accordion type="single" collapsible>
                {item.visuals_notes && (
                  <AccordionItem value="visuals">
                    <AccordionTrigger>Visuals for Managers</AccordionTrigger>
                    <AccordionContent>{item.visuals_notes}</AccordionContent>
                  </AccordionItem>
                )}
                
                {item.key_notes && (
                  <AccordionItem value="keynotes">
                    <AccordionTrigger>Key Notes</AccordionTrigger>
                    <AccordionContent>{item.key_notes}</AccordionContent>
                  </AccordionItem>
                )}
                
                {item.photo_examples && (
                  <AccordionItem value="photos">
                    <AccordionTrigger>Photo Examples</AccordionTrigger>
                    <AccordionContent>
                      <img 
                        src={item.photo_examples} 
                        alt="Example" 
                        className="rounded-lg max-h-64 object-cover"
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