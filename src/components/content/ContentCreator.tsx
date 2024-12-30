import { useState } from 'react';
import { SocialMediaForm } from './SocialMediaForm';
import { EmailForm } from './EmailForm';
import { InGymForm } from './InGymForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ContentCreator = () => {
  const [showTypeModal, setShowTypeModal] = useState(true);
  const [contentType, setContentType] = useState<'social' | 'email' | 'in-gym' | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleTypeChange = (type: 'social' | 'email' | 'in-gym') => {
    console.log('Selected type:', type);
    setContentType(type);
    setShowTypeModal(false);
  };

  const handleClose = () => {
    setContentType(null);
    setShowTypeModal(false);
  };

  const renderForm = () => {
    switch (contentType) {
      case 'social':
        return <SocialMediaForm onCancel={handleClose} />;
      case 'email':
        return <EmailForm onCancel={handleClose} />;
      case 'in-gym':
        return <InGymForm onCancel={handleClose} />;
      default:
        return null;
    }
  };

  if (!showTypeModal && !contentType) {
    return null;
  }

  const contentTypes = [
    { id: 'social', label: 'Social Media', gradient: 'from-rose-400 to-orange-300' },
    { id: 'email', label: 'Email Marketing', gradient: 'from-violet-400 to-indigo-300' },
    { id: 'in-gym', label: 'In-Gym Marketing', gradient: 'from-emerald-400 to-cyan-300' }
  ];

  return (
    <Dialog 
      open={showTypeModal || !!contentType} 
      onOpenChange={() => handleClose()}
    >
      <DialogContent className={cn(
        "sm:max-w-2xl transition-all duration-300 ease-in-out",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      )}>
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-2xl font-normal text-primary animate-fade-in">
            Create Content Task
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8 p-0 hover:rotate-90 transition-transform duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {showTypeModal ? (
          <div className="p-6 animate-fade-in">
            <div className="space-y-6">
              <div>
                <label className="block text-lg mb-6 text-muted-foreground">
                  Content Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {contentTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant="outline"
                      onClick={() => handleTypeChange(type.id as 'social' | 'email' | 'in-gym')}
                      onMouseEnter={() => setHoveredButton(type.id)}
                      onMouseLeave={() => setHoveredButton(null)}
                      className={cn(
                        "relative overflow-hidden px-6 py-8 rounded-xl h-auto",
                        "transition-all duration-300 ease-in-out transform",
                        "hover:scale-105 hover:shadow-lg",
                        hoveredButton === type.id ? `bg-gradient-to-r ${type.gradient} text-white` : "",
                        "group"
                      )}
                    >
                      <span className={cn(
                        "transition-colors duration-300",
                        hoveredButton === type.id ? "text-white" : "text-foreground"
                      )}>
                        {type.label}
                      </span>
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300",
                        type.gradient,
                        "group-hover:opacity-10"
                      )} />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-scale-in">
            {renderForm()}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};