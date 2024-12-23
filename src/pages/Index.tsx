import { Calendar } from "@/components/Calendar";
import { GymSelector } from "@/components/GymSelector";
import { MetricCard } from "@/components/MetricCard";
import { Calendar as CalendarIcon, Mail, Image, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-card p-4 border-r animate-fade-in shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-foreground">Gym Toolbox</h2>
          <GymSelector />
          <div className="mt-4 space-y-2">
            <a 
              href="#" 
              className="block p-2 hover:bg-primary/10 rounded-md transition-all duration-200 text-foreground hover:scale-105 transform"
            >
              Facebook Page
            </a>
            <a 
              href="#" 
              className="block p-2 hover:bg-primary/10 rounded-md transition-all duration-200 text-foreground hover:scale-105 transform"
            >
              Instagram Profile
            </a>
            <a 
              href="#" 
              className="block p-2 hover:bg-primary/10 rounded-md transition-all duration-200 text-foreground hover:scale-105 transform"
            >
              SharePoint
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-foreground animate-fade-in">
            Marketing Hub Dashboard
          </h1>
          
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Tasks Due Today"
              value="5"
              icon={<CalendarIcon className="h-6 w-6" />}
            />
            <MetricCard
              title="Pending Emails"
              value="12"
              icon={<Mail className="h-6 w-6" />}
            />
            <MetricCard
              title="Media Uploads"
              value="24"
              icon={<Image className="h-6 w-6" />}
            />
            <MetricCard
              title="Scheduled Posts"
              value="8"
              icon={<FileText className="h-6 w-6" />}
            />
          </div>

          {/* Calendar */}
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Index;