import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListView } from "@/components/views/ListView";
import { GalleryView } from "@/components/views/GalleryView";
import { WeeklyView } from "@/components/views/WeeklyView";

const Index = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold text-foreground mb-3 animate-scale-in">
          Gym Marketing Dashboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Welcome to your all-in-one marketing toolkit. Create, manage, and schedule your content across all locations.
        </p>
      </div>

      <MetricsGrid />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>List View</CardTitle>
          </CardHeader>
          <CardContent>
            <ListView />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Gallery View</CardTitle>
          </CardHeader>
          <CardContent>
            <GalleryView />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Weekly View</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyView />
          </CardContent>
        </Card>
      </div>

      <CalendarView />
    </div>
  );
};

export default Index;