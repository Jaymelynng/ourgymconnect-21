import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

interface FormSubmitProps {
  isSubmitting: boolean;
  onCancel: () => void;
  formData: {
    title: string;
    caption: string;
    scheduled_date: Date;
    photo_key_points?: string;
    photo_examples?: string;
    focus_area?: string;
    gym_id?: number;
  };
}

export const FormSubmit = ({ isSubmitting, onCancel, formData }: FormSubmitProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);

  // Check and maintain auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create content",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Submitting form data:", formData);
      
      const { data, error } = await supabase
        .from('marketing_content')
        .insert([{
          ...formData,
          content_type: 'social_media',
          scheduled_date: formData.scheduled_date.toISOString(),
        }])
        .select('*')
        .single();

      if (error) {
        console.error("Supabase error:", error);
        toast({
          title: "Error creating content",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      console.log("Successfully created content:", data);

      // Invalidate all relevant queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['marketing_content'] }),
        queryClient.invalidateQueries({ queryKey: ['marketing_items'] }),
        queryClient.invalidateQueries({ queryKey: ['upcoming_marketing_content'] }),
        queryClient.invalidateQueries({ 
          predicate: (query) => query.queryKey[0] === 'marketing_content' 
        })
      ]);

      toast({
        title: "Success",
        description: "Content created successfully",
      });

      onCancel();
    } catch (error) {
      console.error("Error creating content:", error);
      toast({
        title: "Error",
        description: "Failed to create content. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        disabled={isSubmitting || !session}
        onClick={handleSubmit}
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