import { DashboardLayout } from "@/components/DashboardLayout";
import { Calendar } from "@/components/Calendar";
import { Button } from "@/components/ui/button";
import { ContentCreator } from "@/components/content/ContentCreator";
import { useState } from "react";

const Index = () => {
  const [showContentCreator, setShowContentCreator] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground">
            Content Calendar
          </h1>
          <Button
            size="lg"
            onClick={() => setShowContentCreator(true)}
            className="animate-fade-in hover:animate-hover-scale"
          >
            Create Content
          </Button>
        </div>

        <div className="w-full h-[calc(100vh-12rem)] animate-fade-in">
          <Calendar />
        </div>

        <ContentCreator 
          open={showContentCreator} 
          onOpenChange={setShowContentCreator}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;