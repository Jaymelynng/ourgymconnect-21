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
    <Card className={cn("p-6 hover:shadow-lg transition-all duration-300 animate-scale-in", className)}>
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </Card>
  );
}