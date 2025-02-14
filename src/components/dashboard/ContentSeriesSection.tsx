
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, PenSquare, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { MarketingItem } from "@/hooks/use-marketing-content";

export function ContentSeriesSection() {
  const { data: series = [] } = useQuery<MarketingItem[]>({
    queryKey: ['marketing_series'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_content')
        .select('*')
        .eq('content_type', 'series')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as MarketingItem[];
    }
  });

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Content Series</h2>
          <p className="text-sm text-muted-foreground">Manage your global content series</p>
        </div>
        <Button 
          variant="default"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Create New Series
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Created</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {series.map((item) => (
              <tr key={item.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    {item.content_type}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  {format(new Date(item.created_at), 'MMM d, yyyy')}
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
