import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Image, X, Calendar, Clock, Link2, CheckSquare, Square } from 'lucide-react';
import { SocialMediaForm } from './SocialMediaForm';
import { EmailForm } from './EmailForm';
import { InGymForm } from './InGymForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const ContentCreator = () => {
  const [contentType, setContentType] = useState<'social' | 'email' | 'in-gym' | null>(null);
  const [showTypeModal, setShowTypeModal] = useState(true);

  const handleTypeChange = (type: 'social' | 'email' | 'in-gym') => {
    console.log('Selected type:', type);
    setContentType(type);
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

  return (
    <Dialog open={showTypeModal} onOpenChange={setShowTypeModal}>
      <DialogContent className="sm:max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-normal text-primary">
              Create Content Task
            </h2>
          </div>

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

            <div className="flex justify-end gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setShowTypeModal(false)}
              >
                Cancel
              </Button>
              <Button>
                Create Task
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      {contentType && renderForm()}
    </Dialog>
  );
};