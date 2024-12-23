import { Calendar } from "@/components/Calendar";
import { GymSelector } from "@/components/GymSelector";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ListView } from "@/components/views/ListView";
import { WeeklyView } from "@/components/views/WeeklyView";
import { GalleryView } from "@/components/views/GalleryView";
import { Facebook, Instagram, FileText, List, Calendar as CalendarIcon, Grid, LayoutList, Menu } from "lucide-react";
import { useState } from "react";

type ViewType = "list" | "calendar" | "weekly" | "gallery";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("calendar");

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="w-full bg-card border-b border-secondary/20 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={currentView === "list" ? "default" : "ghost"}
              onClick={() => setCurrentView("list")}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              List View
            </Button>
            <Button
              variant={currentView === "calendar" ? "default" : "ghost"}
              onClick={() => setCurrentView("calendar")}
              className="flex items-center gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              Monthly View
            </Button>
            <Button
              variant={currentView === "weekly" ? "default" : "ghost"}
              onClick={() => setCurrentView("weekly")}
              className="flex items-center gap-2"
            >
              <LayoutList className="h-4 w-4" />
              Weekly View
            </Button>
            <Button
              variant={currentView === "gallery" ? "default" : "ghost"}
              onClick={() => setCurrentView("gallery")}
              className="flex items-center gap-2"
            >
              <Grid className="h-4 w-4" />
              Gallery View
            </Button>
          </div>
          
          {/* Toolbox Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="space-y-4 py-4">
                <h2 className="text-lg font-bold mb-4 text-foreground">Gym Toolbox</h2>
                <GymSelector />
                <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
                  Go to Gym Dashboard
                </Button>
                <div className="pt-4 border-t border-secondary/20">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Links</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 hover:bg-primary/10"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-4 w-4 text-[#1877F2]" />
                        Facebook Page
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 hover:bg-primary/10"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4 text-[#E4405F]" />
                        Instagram Profile
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 hover:bg-primary/10"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 text-[#0078D4]" />
                        SharePoint
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Main Content */}
        {currentView === "calendar" && <Calendar />}
        {currentView === "list" && <ListView />}
        {currentView === "weekly" && <WeeklyView />}
        {currentView === "gallery" && <GalleryView />}
      </div>
    </div>
  );
};

export default Index;