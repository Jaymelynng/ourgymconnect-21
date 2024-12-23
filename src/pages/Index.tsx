import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricsSection } from "@/components/dashboard/MetricsSection";
import { ContentSeriesSection } from "@/components/dashboard/ContentSeriesSection";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gym Marketing Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your marketing efforts across all locations
          </p>
        </div>

        <MetricsSection />
        <ContentSeriesSection />
      </div>
    </DashboardLayout>
  );
};

export default Index;