
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ContentTypeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContentTypeSelector({ open, onOpenChange }: ContentTypeSelectorProps) {
  const navigate = useNavigate();

  const handleSelectType = (type: string) => {
    onOpenChange(false);
    switch (type) {
      case "social":
        navigate("/content/social-media/new");
        break;
      case "email":
        navigate("/content/email/new");
        break;
      case "in-gym":
        navigate("/content/in-gym/new");
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-gray-700">Create Content Task</DialogTitle>
        </DialogHeader>
        <div className="pt-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-600 mb-4">Content Type</h2>
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="h-16 text-lg justify-start px-6 hover:border-primary hover:bg-primary/5"
              onClick={() => handleSelectType("social")}
            >
              Social Media
            </Button>
            <Button
              variant="outline"
              className="h-16 text-lg justify-start px-6 hover:border-primary hover:bg-primary/5"
              onClick={() => handleSelectType("email")}
            >
              Email Marketing
            </Button>
            <Button
              variant="outline"
              className="h-16 text-lg justify-start px-6 hover:border-primary hover:bg-primary/5"
              onClick={() => handleSelectType("in-gym")}
            >
              In-Gym Marketing
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
