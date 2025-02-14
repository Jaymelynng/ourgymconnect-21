
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Menu } from "lucide-react";
import Toolkit from "@/components/Toolkit";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);

  const isMainRoute = location.pathname === "/";
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavigationContent = () => (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/")}
        className="transform hover:scale-105 active:scale-95 transition-transform"
      >
        <Home className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col min-h-screen w-full">
        <header 
          className={cn(
            "border-b bg-background/95 backdrop-blur-md sticky top-0 z-50 px-4",
            "transition-all duration-300 ease-in-out h-14 flex items-center",
            scrollY > 50 ? "shadow-md" : "shadow-none"
          )}
        >
          {isMobile ? (
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="transform hover:scale-105 active:scale-95 transition-transform"
                  >
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
        
        <main className="flex-1 p-4 overflow-hidden">
          {children}
        </main>
      </div>
      
      {!isMobile && isMainRoute && (
        <aside 
          className={cn(
            "w-[300px] shrink-0",
            "h-screen overflow-y-auto fixed top-0 right-0",
            "border-l border-border bg-background/95 backdrop-blur-sm",
            "z-40"
          )}
        >
          <Toolkit />
        </aside>
      )}
    </div>
  );
}
