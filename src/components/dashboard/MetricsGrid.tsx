import { MetricCard } from "@/components/MetricCard";
import { BarChart3, Mail, Calendar, Image } from "lucide-react";

const metrics = [
  { 
    title: 'Tasks Due Soon',
    value: '0',
    description: 'Next 7 days',
    icon: <BarChart3 className="h-4 w-4" />
  },
  { 
    title: 'Pending Emails',
    value: '45',
    description: 'Pending approval',
    icon: <Mail className="h-4 w-4" />
  },
  { 
    title: 'Scheduled Posts',
    value: '30',
    description: 'Next 7 days',
    icon: <Calendar className="h-4 w-4" />
  },
  { 
    title: 'Uploaded Media',
    value: '215',
    description: 'Total assets',
    icon: <Image className="h-4 w-4" />
  }
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
        />
      ))}
    </div>
  );
}