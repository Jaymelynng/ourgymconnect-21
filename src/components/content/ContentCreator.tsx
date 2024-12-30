import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Image, X, Calendar, Clock, Link2, CheckSquare, Square } from 'lucide-react';
import { SocialMediaForm } from './SocialMediaForm';
import { EmailForm } from './EmailForm';
import { InGymForm } from './InGymForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const ContentCreator = () => {
  const [contentType, setContentType] = useState<'social' | 'email' | 'in-gym' | null>(null);
  const [showTypeModal, setShowTypeModal] = useState(true);

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
        return <SocialMediaForm onCancel={() => setContentType(null)} />;
      case 'email':
        return <EmailForm onCancel={() => setContentType(null)} />;
      case 'in-gym':
        return <InGymForm onCancel={() => setContentType(null)} />;
      default:
        return null;
    }
  };

  if (!showTypeModal && !contentType) {
    return null;
  }

  return (
    <Dialog open={showTypeModal || !!contentType} onOpenChange={() => handleClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-2xl font-normal text-primary">
            Create Content Task
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {showTypeModal ? (
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-lg mb-6 text-muted-foreground">
                  Content Type
                </label>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleTypeChange('social')}
                    className="px-6 py-6 rounded-full h-auto"
                  >
                    Social Media
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleTypeChange('email')}
                    className="px-6 py-6 rounded-full h-auto"
                  >
                    Email Marketing
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleTypeChange('in-gym')}
                    className="px-6 py-6 rounded-full h-auto"
                  >
                    In-Gym Marketing
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          renderForm()
        )}
      </DialogContent>
    </Dialog>
  );
};