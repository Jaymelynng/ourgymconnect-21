import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Image } from "lucide-react";
import Toolkit from "@/components/Toolkit";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <Toolkit />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card">
          <div className="container flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
              >
                <Home className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/gallery")}
              >
                <Image className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 container py-6">
          {children}
        </main>
      </div>
    </div>
  );
};