import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, icon, className }: MetricCardProps) {
  return (
    <Card 
      className={cn(
        "p-6 transition-all duration-300",
        "hover:shadow-lg hover:scale-105 transform",
        "bg-card hover:bg-primary/5",
        "border border-secondary/20",
        "animate-scale-in",
        className
      )}
    >
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-full text-primary">{icon}</div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        </div>
      </div>
    </Card>
  );
}