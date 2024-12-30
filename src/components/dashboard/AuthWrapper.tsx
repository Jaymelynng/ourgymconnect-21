import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthWrapperProps {
  children: React.ReactNode;
  onAuthStateChange: (isAuthenticated: boolean) => void;
}

export function AuthWrapper({ children, onAuthStateChange }: AuthWrapperProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: 'demo@example.com',
            password: 'demo123',
          });
          
          if (error) {
            console.error('Auth error:', error);
            toast({
              title: "Authentication Error",
              description: "Please try again later",
              variant: "destructive",
            });
            onAuthStateChange(false);
          } else if (data.session) {
            onAuthStateChange(true);
          }
        } else {
          onAuthStateChange(true);
        }
      } catch (error) {
        console.error('Auth error:', error);
        toast({
          title: "Authentication Error",
          description: "Please try again later",
          variant: "destructive",
        });
        onAuthStateChange(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [toast, onAuthStateChange]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}