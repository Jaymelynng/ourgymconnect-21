import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GymSelector } from "@/components/GymSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedGym, setSelectedGym] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isResetMode, setIsResetMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we're in a password reset flow
    const hash = window.location.hash;
    if (hash && hash.includes('type=recovery')) {
      setIsResetMode(true);
      const accessToken = hash.split('&')[0].split('=')[1];
      handlePasswordRecovery(accessToken);
    }
  }, []);

  const handlePasswordRecovery = async (accessToken: string) => {
    if (!password) return;

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Success",
          description: "Your password has been updated successfully.",
        });
        setIsResetMode(false);
        window.location.hash = ''; // Clear the hash
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while updating your password.",
      });
    }
  };

  const handleGymSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    if (!selectedGym) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a gym before signing in.",
      });
      return;
    }

    try {
      console.log('Attempting gym staff login with email:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Gym login error:', error);
        setAuthError(error.message);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message,
        });
      } else {
        console.log('Gym login successful:', data);
      }
    } catch (error) {
      console.error('Unexpected gym login error:', error);
      setAuthError('An unexpected error occurred during authentication.');
    }
  };

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    try {
      console.log('Attempting admin login with email:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Admin login error:', error);
        setAuthError(error.message);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message,
        });
      } else {
        console.log('Admin login successful:', data);
      }
    } catch (error) {
      console.error('Unexpected admin login error:', error);
      setAuthError('An unexpected error occurred during authentication.');
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email to reset the password.",
      });
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth#recovery',
    });
    
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
  };

  if (isResetMode) {
    return (
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
          </div>

          <Button 
            type="button" 
            className="w-full"
            onClick={() => handlePasswordRecovery(window.location.hash.split('&')[0].split('=')[1])}
          >
            Update Password
          </Button>
        </form>
      </Card>
    );
  }

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

      <Tabs defaultValue="admin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gym">Gym Login</TabsTrigger>
          <TabsTrigger value="admin">Admin Login</TabsTrigger>
        </TabsList>

        <TabsContent value="gym">
          <form onSubmit={handleGymSignIn} className="space-y-4">
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
              onClick={handlePasswordReset}
            >
              Forgot Password?
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="admin">
          <form onSubmit={handleAdminSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
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
              onClick={handlePasswordReset}
            >
              Forgot Password?
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
