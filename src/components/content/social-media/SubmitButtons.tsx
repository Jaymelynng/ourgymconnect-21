import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SubmitButtonProps } from './types';

export const SubmitButtons = ({ isSubmitting, onCancel }: SubmitButtonProps) => {
  return (
    <div className="flex justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
        className="border-gray-300 text-gray-700 hover:bg-gray-100"
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "bg-primary hover:bg-primary-hover text-white",
          isSubmitting && "opacity-50 cursor-not-allowed"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Create Content"
        )}
      </Button>
    </div>
  );
};