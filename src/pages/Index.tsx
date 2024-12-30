import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* News and Updates Column */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>News & Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2 text-primary">Email Updates - December 13, 2024</h3>
              <p className="text-sm text-muted-foreground">
                We're currently holding off on email assignments while monitoring camp numbers.
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2 text-primary">New Feature Release</h3>
              <p className="text-sm text-muted-foreground">
                Content organization has been updated to use live dates instead of due dates.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ideas & Inspiration Column */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ideas & Inspiration for Your Gym</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2 text-primary">Content Calendar</h3>
              <p className="text-sm text-muted-foreground">
                The content calendar for January is now available for planning.
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2 text-primary">Template Updates</h3>
              <p className="text-sm text-muted-foreground">
                New winter-themed templates have been added to the library.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <CalendarView />
    </div>
  );
};

export default Index;