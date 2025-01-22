import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GymSelector } from "@/components/GymSelector";

export function AuthForm() {
  const [password, setPassword] = useState("");
  const [selectedGym, setSelectedGym] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGymSignIn = async (e: React.FormEvent) => {
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
      // Get the gym's email from gym_details
      const { data: gymData, error: gymError } = await supabase
        .from('gym_details')
        .select('email_contact')
        .eq('id', selectedGym)
        .single();

      if (gymError || !gymData?.email_contact) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not find gym details. Please contact support.",
        });
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: gymData.email_contact,
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

  return (
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

      <form onSubmit={handleGymSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gym">Gym</Label>
          <GymSelector 
            onChange={(gymId) => setSelectedGym(gymId)}
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
            if (!selectedGym) {
              toast({
                variant: "destructive",
                title: "Error",
                description: "Please select a gym to reset the password.",
              });
              return;
            }

            // Get gym email before resetting password
            const { data: gymData, error: gymError } = await supabase
              .from('gym_details')
              .select('email_contact')
              .eq('id', selectedGym)
              .single();

            if (gymError || !gymData?.email_contact) {
              toast({
                variant: "destructive",
                title: "Error",
                description: "Could not find gym details. Please contact support.",
              });
              return;
            }

            const { error } = await supabase.auth.resetPasswordForEmail(gymData.email_contact);
            if (error) {
              toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
              });
            } else {
              toast({
                title: "Password Reset Email Sent",
                description: "Check your gym's email for the password reset link.",
              });
            }
          }}
        >
          Forgot Password?
        </Button>
      </form>
    </Card>
  );
}