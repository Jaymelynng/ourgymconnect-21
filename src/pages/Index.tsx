import { Calendar } from "@/components/Calendar";
import { ListView } from "@/components/views/ListView";
import { WeeklyView } from "@/components/views/WeeklyView";
import { GalleryView } from "@/components/views/GalleryView";
import { useState } from "react";

type ViewType = "list" | "calendar" | "weekly" | "gallery";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("calendar");

  return (
    <div className="min-h-full">
      {currentView === "calendar" && <Calendar />}
      {currentView === "list" && <ListView />}
      {currentView === "weekly" && <WeeklyView />}
      {currentView === "gallery" && <GalleryView />}
    </div>
  );
};

export default Index;