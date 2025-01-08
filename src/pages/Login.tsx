import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthError } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCacheClearing, setIsCacheClearing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Login component mounted');
    console.log('Current origin:', window.location.origin);

    // Check if we're already signed in
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('Initial session check:', session, error);
      if (session) {
        console.log('Session found, redirecting to /');
        navigate("/");
        toast.success("Welcome back!");
      }
      if (error) {
        console.error('Initial session error:', error);
        setError(error.message);
        toast.error(error.message);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      setIsLoading(true);
      try {
        switch (event) {
          case 'SIGNED_IN':
            console.log('User signed in, redirecting to /');
            navigate("/");
            toast.success("Successfully signed in!");
            break;
          case 'SIGNED_OUT':
            toast.info("You have been signed out.");
            break;
          case 'USER_UPDATED':
            toast.success("Account created successfully!");
            break;
          case 'PASSWORD_RECOVERY':
            toast.info("Check your email for password reset instructions.");
            break;
          case 'USER_DELETED':
            toast.error("Account deleted.");
            break;
          default:
            console.log('Unhandled auth event:', event);
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
        if (error instanceof AuthError) {
          setError(error.message);
          toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const clearCache = async () => {
    setIsCacheClearing(true);
    try {
      // Clear all local storage
      localStorage.clear();
      // Clear all session storage
      sessionStorage.clear();
      // Clear Supabase session
      await supabase.auth.signOut();
      // Reload the page
      window.location.reload();
      toast.success("Cache cleared successfully!");
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast.error("Failed to clear cache");
    } finally {
      setIsCacheClearing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to continue to your account</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-card p-6 rounded-lg shadow-sm border relative">
          {isLoading && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-lg z-50">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(var(--primary))',
                    brandAccent: 'rgb(var(--primary))',
                  },
                },
              },
            }}
            theme="light"
            providers={[]}
            redirectTo={`${window.location.origin}/`}
          />
        </div>

        <div className="mt-4 text-center">
          <Button 
            variant="outline" 
            onClick={clearCache}
            disabled={isCacheClearing}
            className="text-sm"
          >
            {isCacheClearing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Clearing...
              </>
            ) : (
              'Clear Cache & Reload'
            )}
          </Button>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Need help? Contact support for assistance</p>
        </div>
      </div>
    </div>
  );
}