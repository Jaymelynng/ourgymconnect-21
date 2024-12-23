import { Calendar } from "@/components/Calendar";
import { ListView } from "@/components/views/ListView";
import { WeeklyView } from "@/components/views/WeeklyView";
import { GalleryView } from "@/components/views/GalleryView";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { LayoutGrid, CalendarDays, List, Images } from "lucide-react";

type ViewType = "list" | "calendar" | "weekly" | "gallery";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("calendar");

  const viewOptions = [
    {
      type: "calendar",
      label: "Calendar View",
      icon: CalendarDays,
      description: "Plan and organize your marketing content by date",
      gradient: "linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)"
    },
    {
      type: "list",
      label: "List View",
      icon: List,
      description: "See all your marketing items in a structured list",
      gradient: "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)"
    },
    {
      type: "weekly",
      label: "Weekly View",
      icon: LayoutGrid,
      description: "Plan your content week by week",
      gradient: "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)"
    },
    {
      type: "gallery",
      label: "Gallery View",
      icon: Images,
      description: "Visual overview of your marketing content",
      gradient: "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)"
    }
  ];

  return (
    <div className="min-h-full">
      {currentView === "calendar" && <Calendar />}
      {currentView === "list" && <ListView />}
      {currentView === "weekly" && <WeeklyView />}
      {currentView === "gallery" && <GalleryView />}
      
      {/* Dashboard Welcome Section */}
      {!currentView && (
        <div className="space-y-8 p-6">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to Your Marketing Toolkit</h1>
            <p className="text-lg text-muted-foreground">Choose a view to start managing your marketing content</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {viewOptions.map((option) => (
              <Card
                key={option.type}
                className="p-6 cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ background: option.gradient }}
                onClick={() => setCurrentView(option.type as ViewType)}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-white/90">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Quick Tips</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Use the sidebar toolkit to quickly navigate between views</li>
              <li>Click on any item to edit or view details</li>
              <li>The calendar view helps you plan content ahead</li>
              <li>Switch between views using the sidebar navigation</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;