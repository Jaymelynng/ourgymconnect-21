import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';
import Index from "@/pages/Index";
import Gallery from "@/pages/Gallery";
import EmailReview from "@/pages/EmailReview";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { toast } = useToast();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setAuthenticated(true);
        setAuthError(null);
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      } else if (event === 'SIGNED_OUT') {
        setAuthenticated(false);
        toast({
          title: "Signed out",
          description: "You've been successfully signed out.",
        });
      } else if (event === 'USER_UPDATED') {
        // Handle user updates if needed
      }
      setIsLoading(false);
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setIsLoading(false);
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        setAuthError(error.message);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message,
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      setAuthError('An unexpected error occurred during authentication.');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>;
  }

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router>
            <Toaster />
            <Sonner />
            <Routes>
              <Route 
                path="/" 
                element={
                  authenticated ? (
                    <Index />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                } 
              />
              <Route 
                path="/gallery" 
                element={
                  authenticated ? (
                    <Gallery />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                } 
              />
              <Route 
                path="/email-review/:id" 
                element={
                  authenticated ? (
                    <EmailReview />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                } 
              />
              <Route 
                path="/auth" 
                element={
                  !authenticated ? (
                    <div className="flex items-center justify-center min-h-screen bg-gray-50">
                      <Card className="w-full max-w-md p-8 space-y-6">
                        <div className="space-y-2 text-center">
                          <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
                          <p className="text-sm text-muted-foreground">
                            Sign in to access your account
                          </p>
                        </div>
                        
                        {authError && (
                          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                            {authError}
                          </div>
                        )}

                        <button
                          onClick={handleGoogleSignIn}
                          className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                          <span>Continue with Google</span>
                        </button>
                      </Card>
                    </div>
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              <Route 
                path="/auth/callback" 
                element={<Navigate to="/" replace />} 
              />
            </Routes>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default App;