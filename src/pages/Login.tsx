import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [error, setError] = useState("");
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      if (event === 'SIGNED_IN') {
        console.log('User signed in, redirecting to /');
        navigate("/");
        toast.success("Successfully signed in!");
      }
      if (event === 'SIGNED_UP') {
        toast.success("Account created successfully! Please check your email for verification.");
      }
      if (event === 'PASSWORD_RECOVERY') {
        toast.info("Check your email for password reset instructions.");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const clearCache = async () => {
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

        <div className="bg-card p-6 rounded-lg shadow-sm border">
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
            className="text-sm"
          >
            Clear Cache & Reload
          </Button>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Need help? Contact support for assistance</p>
        </div>
      </div>
    </div>
  );
}