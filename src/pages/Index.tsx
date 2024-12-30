import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { Button } from "@/components/ui/button";
import { ContentCreator } from "@/components/content/ContentCreator";
import { AuthWrapper } from "@/components/dashboard/AuthWrapper";
import { DashboardSections } from "@/components/dashboard/DashboardSections";
import { UpcomingContent } from "@/components/dashboard/UpcomingContent";

const Index = () => {
  const [showContentCreator, setShowContentCreator] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthWrapper onAuthStateChange={setIsAuthenticated}>
      {isAuthenticated && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-3 animate-scale-in">
                  Gym Marketing Dashboard
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Welcome to your all-in-one marketing toolkit. Create, manage, and schedule your content across all locations.
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => setShowContentCreator(true)}
                className="animate-fade-in"
              >
                Create Content
              </Button>
            </div>
          </div>

          <MetricsGrid />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardSections />
            <UpcomingContent />
          </div>

          <CalendarView />
          
          {showContentCreator && (
            <ContentCreator />
          )}
        </div>
      )}
    </AuthWrapper>
  );
};

export default Index;