import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        navigate("/");
        toast.success("Successfully signed in!");
      } else if (event === 'SIGNED_OUT') {
        setError("");
      } else if (event === 'USER_UPDATED') {
        const { error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          setError(sessionError.message);
          toast.error(sessionError.message);
        }
      }
    });

    // Check if we're already signed in
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (session) {
        navigate("/");
      }
      if (error) {
        setError(error.message);
        toast.error(error.message);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Sign up or sign in to continue</p>
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
          />
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Make sure to check your email after signing up</p>
        </div>
      </div>
    </div>
  );
}