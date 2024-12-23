import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, PenSquare, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function ContentSeriesSection() {
  const { data: series } = useQuery({
    queryKey: ['marketing_series'],
    queryFn: async () => {
      const { data } = await supabase
        .from('marketing_items')
        .select('*')
        .eq('is_global', true)
        .order('created_at', { ascending: false });
      return data || [];
    }
  });

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Content Series</h2>
        <Button 
          variant="secondary"
          className="bg-primary text-white hover:bg-primary/90"
        >
          Create New Series
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/10">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total Posts</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Created</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {series?.map((item) => (
              <tr key={item.id} className="border-b border-border/10 hover:bg-secondary/5">
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4">{item.item_type || 'Standard'}</td>
                <td className="py-3 px-4">12</td>
                <td className="py-3 px-4">{format(new Date(item.created_at), 'EEE, MMM dd, yyyy')}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <PenSquare className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
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