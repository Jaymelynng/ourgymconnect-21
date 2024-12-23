import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricsSection } from "@/components/dashboard/MetricsSection";
import { ContentSeriesSection } from "@/components/dashboard/ContentSeriesSection";

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

      <MetricsSection />
      <ContentSeriesSection />
    </div>
  );
};

export default Index;