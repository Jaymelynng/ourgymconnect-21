import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';
import Index from "@/pages/Index";
import Gallery from "@/pages/Gallery";
import EmailReview from "@/pages/EmailReview";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setAuthenticated(true);
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
      }
      setIsLoading(false);
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setIsLoading(false);
    });
  }, []);

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
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold text-center">Welcome</h1>
                        <button
                          onClick={() => supabase.auth.signInWithOAuth({
                            provider: 'google'
                          })}
                          className="w-full px-4 py-2 text-white bg-primary rounded hover:bg-primary/90 transition-colors"
                        >
                          Sign in with Google
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
            </Routes>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default App;