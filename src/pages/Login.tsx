import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleQuickLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'password123'
      });

      if (error) {
        setError(error.message);
        toast.error("Login failed: " + error.message);
      } else {
        toast.success("Login successful!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">Create an account or sign in to continue</p>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-card p-6 rounded-lg shadow-sm border space-y-6">
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or use test account</span>
            </div>
          </div>

          <Button 
            onClick={handleQuickLogin}
            className="w-full"
            variant="outline"
            size="sm"
          >
            Quick Login (test@example.com)
          </Button>
        </div>
      </div>
    </div>
  );
}