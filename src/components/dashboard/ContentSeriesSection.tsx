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
        .from('marketing_content')
        .select('*')
        .eq('series_type', 'global')
        .order('created_at', { ascending: false });
      return data || [];
    }
  });

  return (
    <Card className="p-6 animate-fade-in bg-gradient-to-br from-card to-secondary/5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Content Series</h2>
          <p className="text-sm text-muted-foreground">Manage your global content series</p>
        </div>
        <Button 
          variant="secondary"
          className="bg-primary text-white hover:bg-primary-hover shadow-sm transition-all duration-200 hover:shadow-md"
        >
          Create New Series
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border/10">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/30">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total Posts</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Created</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {series?.map((item) => (
              <tr key={item.id} className="border-t border-border/10 hover:bg-secondary/5 transition-colors">
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    {item.content_type || 'Standard'}
                  </span>
                </td>
                <td className="py-3 px-4">{item.total_posts || 0}</td>
                <td className="py-3 px-4">{format(new Date(item.created_at), 'EEE, MMM dd, yyyy')}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                      <PenSquare className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
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