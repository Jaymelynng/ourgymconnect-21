
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Menu } from "lucide-react";
import Toolkit from "@/components/Toolkit";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsCollapsed(window.scrollY > 100);
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
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col min-w-0">
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
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden w-full bg-gray-50 dark:bg-gray-900/50">
          {children}
        </main>
      </div>
      
      {!isMobile && (
        <aside 
          className={cn(
            "w-[300px] transition-all duration-300 ease-in-out",
            "sticky top-0 h-screen overflow-y-auto",
            "border-l border-border bg-background/95 backdrop-blur-sm",
            isCollapsed ? "translate-x-[240px]" : "translate-x-0",
            "hover:translate-x-0"
          )}
        >
          <Toolkit />
        </aside>
      )}
    </div>
  );
}
