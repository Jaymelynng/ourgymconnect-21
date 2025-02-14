
import React, { useState } from 'react';
import { Grid, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { GymSelector } from './GymSelector';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import * as Icons from 'lucide-react';
import type { ToolkitItem } from '@/types/database';

const Toolkit = () => {
  const [selectedGymId, setSelectedGymId] = useState<number | null>(null);
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  const { data: toolkitItems, isLoading: isLoadingTools, error: toolsError } = useQuery({
    queryKey: ['toolkit_items', selectedGymId],
    queryFn: async () => {
      console.log('Fetching toolkit items for gym:', selectedGymId);
      const query = supabase
        .from('toolkit_items')
        .select('*')
        .order('sort_order', { ascending: true });

      if (selectedGymId) {
        query.or(`gym_id.eq.${selectedGymId},gym_id.is.null`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching toolkit items:', error);
        throw error;
      }
      
      return data as ToolkitItem[];
    },
  });

  const handleGymChange = (gymId: string) => {
    setSelectedGymId(Number(gymId));
  };

  if (toolsError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load toolkit items. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div 
      className={cn(
        "sticky top-0 min-h-screen",
        "bg-gradient-to-b from-primary/95 to-primary/85",
        "backdrop-blur-sm rounded-t-[15px] p-5",
        "text-white shadow-lg border-l border-primary/20",
        "transition-all duration-300 ease-in-out",
        "transform-gpu will-change-transform"
      )}
    >
      <div className="mb-8 animate-fade-in space-y-6">
        <h2 className={cn(
          "text-2xl font-bold flex items-center gap-3 mb-6",
          "bg-gradient-to-r from-white to-white/80",
          "bg-clip-text text-transparent"
        )}>
          <Grid strokeWidth={2} size={24} className="animate-pulse text-white" />
          Toolkit
        </h2>
        
        <div className="relative">
          <div className={cn(
            "absolute inset-0 bg-white/5 rounded-xl",
            "transform transition-transform duration-300",
            "hover:scale-105"
          )}>
            <GymSelector onChange={handleGymChange} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 relative">
        {isLoadingTools ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i}
              className="h-24 bg-white/10 rounded-xl animate-pulse"
            />
          ))
        ) : toolkitItems?.map((tool, index) => {
          const IconComponent = (Icons as any)[tool.icon] || Icons.Link;
          const isHovered = hoveredTool === tool.id;
          
          return (
            <a
              key={tool.id}
              href={tool.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "bg-white/95 backdrop-blur-sm rounded-xl p-4",
                "flex flex-col items-center justify-center gap-2.5",
                "transition-all duration-300 shadow-sm group",
                "hover:scale-105 hover:bg-white hover:shadow-lg",
                "transform perspective-1000",
                !tool.url && "opacity-50 cursor-not-allowed hover:scale-100",
                !tool.is_enabled && "hidden",
                isHovered && "rotate-y-180"
              )}
              onMouseEnter={() => setHoveredTool(tool.id)}
              onMouseLeave={() => setHoveredTool(null)}
              onClick={(e) => {
                if (!tool.url) {
                  e.preventDefault();
                }
              }}
              style={{
                transform: `perspective(1000px) rotateY(${isHovered ? '10deg' : '0deg'})`,
              }}
            >
              <IconComponent 
                strokeWidth={1.5} 
                className={cn(
                  "w-10 h-10 transition-all duration-300",
                  tool.color,
                  "group-hover:scale-110 group-hover:rotate-12"
                )} 
              />
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                {tool.name}
              </span>
            </a>
          );
        })}
      </div>

      <Button 
        variant="ghost" 
        className={cn(
          "w-full mt-6 bg-white/10 hover:bg-white/20 text-white",
          "transition-all duration-300 animate-fade-in",
          "transform hover:scale-105 active:scale-95"
        )}
        onClick={() => window.open('https://github.com/your-repo/issues/new', '_blank')}
      >
        <Icons.Plus className="w-4 h-4 mr-2" />
        Suggest New Tool
      </Button>
    </div>
  );
};

export default Toolkit;
