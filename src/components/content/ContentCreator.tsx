import { useState, useEffect } from 'react';
import { SocialMediaForm } from './SocialMediaForm';
import { EmailForm } from './EmailForm';
import { InGymForm } from './InGymForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  social: any;
  email: any;
  inGym: any;
}

export const ContentCreator = () => {
  const [showTypeModal, setShowTypeModal] = useState(true);
  const [contentType, setContentType] = useState<'social' | 'email' | 'in-gym' | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    social: {},
    email: {},
    inGym: {}
  });
  const { toast } = useToast();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Access Denied",
          description: "You must be logged in to create content.",
          variant: "destructive",
        });
        handleClose();
      }
    };
    checkAuth();
  }, []);

  const handleTypeChange = (type: 'social' | 'email' | 'in-gym') => {
    setContentType(type);
    setShowTypeModal(false);
  };

  const handleClose = () => {
    setContentType(null);
    setShowTypeModal(false);
  };

  const updateFormData = (type: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [type]: data
    }));
  };

  const renderForm = () => {
    switch (contentType) {
      case 'social':
        return (
          <SocialMediaForm 
            onCancel={handleClose} 
            initialData={formData.social}
            onDataChange={(data) => updateFormData('social', data)}
          />
        );
      case 'email':
        return (
          <EmailForm 
            onCancel={handleClose}
            initialData={formData.email}
            onDataChange={(data) => updateFormData('email', data)}
          />
        );
      case 'in-gym':
        return (
          <InGymForm 
            onCancel={handleClose}
            initialData={formData.inGym}
            onDataChange={(data) => updateFormData('inGym', data)}
          />
        );
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
        "sm:max-w-2xl transition-all duration-300 ease-in-out bg-gray-200",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        !showTypeModal && "sm:max-w-3xl"
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

        {!showTypeModal && (
          <div className="flex gap-4 mb-6">
            {contentTypes.map((type) => (
              <Button
                key={type.id}
                variant={contentType === type.id ? 'default' : 'outline'}
                onClick={() => handleTypeChange(type.id as 'social' | 'email' | 'in-gym')}
                className={cn(
                  "flex-1",
                  contentType === type.id ? "bg-primary text-white" : "bg-white text-gray-700"
                )}
              >
                {type.label}
              </Button>
            ))}
          </div>
        )}

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