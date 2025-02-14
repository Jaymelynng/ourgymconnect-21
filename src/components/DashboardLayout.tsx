
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Menu } from "lucide-react";
import Toolkit from "@/components/Toolkit";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const NavigationContent = () => (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/")}
        className="transition-all duration-300 hover:bg-primary/20"
      >
        <Home className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card sticky top-0 z-50">
          {isMobile ? (
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] sm:w-[280px]">
                  <div className="py-4">
                    <Toolkit />
                  </div>
                </SheetContent>
              </Sheet>
              <NavigationContent />
            </div>
          ) : (
            <NavigationContent />
          )}
        </header>
        
        <main className="flex-1 container py-4 md:py-6 px-4 md:px-6 animate-fade-in">
          {children}
        </main>
      </div>
      
      {!isMobile && <Toolkit />}
    </div>
  );
}
