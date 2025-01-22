import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';
import { GymSelector } from "@/components/GymSelector";
import Index from "@/pages/Index";
import Gallery from "@/pages/Gallery";
import EmailReview from "@/pages/EmailReview";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedGym, setSelectedGym] = useState<string | null>(null);

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
      }
      setIsLoading(false);
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setIsLoading(false);
    });
  }, []);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGym) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a gym before signing in.",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
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
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
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

                        <form onSubmit={handleEmailSignIn} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="gym">Gym</Label>
                            <GymSelector 
                              onChange={(gymId) => setSelectedGym(gymId)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter your password"
                              required
                            />
                          </div>

                          <Button type="submit" className="w-full">
                            Sign In
                          </Button>

                          <Button 
                            type="button" 
                            variant="link" 
                            className="w-full"
                            onClick={async () => {
                              if (!email) {
                                toast({
                                  variant: "destructive",
                                  title: "Error",
                                  description: "Please enter your email address to reset your password.",
                                });
                                return;
                              }
                              const { error } = await supabase.auth.resetPasswordForEmail(email);
                              if (error) {
                                toast({
                                  variant: "destructive",
                                  title: "Error",
                                  description: error.message,
                                });
                              } else {
                                toast({
                                  title: "Password Reset Email Sent",
                                  description: "Check your email for the password reset link.",
                                });
                              }
                            }}
                          >
                            Forgot Password?
                          </Button>
                        </form>
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