import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EditMarketingDialogProps {
  item: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function EditMarketingDialog({ item, isOpen, onClose, onUpdate }: EditMarketingDialogProps) {
  const [title, setTitle] = useState(item.title || "");
  const [caption, setCaption] = useState(item.caption || "");
  const [description, setDescription] = useState(item.description || "");
  const [photoExamples, setPhotoExamples] = useState(item.photo_examples || "");
  const [photoKeyPoints, setPhotoKeyPoints] = useState(item.photo_key_points || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('marketing_content')
        .update({
          title,
          caption,
          description,
          photo_examples: photoExamples,
          photo_key_points: photoKeyPoints,
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id);

      if (error) throw error;

      toast({
        title: "Marketing item updated",
        description: "Your changes have been saved successfully.",
      });
      
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating marketing item:', error);
      toast({
        title: "Error updating marketing item",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Marketing Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="caption" className="text-sm font-medium">Caption</label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div>
            <label htmlFor="photoKeyPoints" className="text-sm font-medium">Photo Key Points</label>
            <Textarea
              id="photoKeyPoints"
              value={photoKeyPoints}
              onChange={(e) => setPhotoKeyPoints(e.target.value)}
              rows={3}
            />
          </div>
          
          <div>
            <label htmlFor="photoExamples" className="text-sm font-medium">Photo Examples</label>
            <Input
              id="photoExamples"
              value={photoExamples}
              onChange={(e) => setPhotoExamples(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}