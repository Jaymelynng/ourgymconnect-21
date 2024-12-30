import React from 'react';
import { Grid, Instagram, Facebook, Share2, Palette, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { GymSelector } from './GymSelector';
import { cn } from '@/lib/utils';

const Toolkit = () => {
  const tools = [
    { 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'hover:text-pink-400',
      url: '#'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'hover:text-blue-500',
      url: '#'
    },
    { 
      name: 'SharePoint', 
      icon: Share2, 
      color: 'hover:text-green-400',
      url: '#'
    },
    { 
      name: 'Canva', 
      icon: Palette, 
      color: 'hover:text-purple-400',
      url: '#'
    }
  ];

  const comingSoonTools = [
    { title: 'Tuition Estimator', subtitle: 'Coming Soon' },
    { title: 'Submit Tool Idea', subtitle: 'Coming Soon' }
  ];

  return (
    <div className="w-[280px] min-h-screen bg-gradient-to-b from-primary/95 to-primary/85 backdrop-blur-sm 
                    rounded-t-[15px] p-5 text-white shadow-lg border-r border-primary/20">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 bg-gradient-to-r from-white to-white/80 
                       bg-clip-text text-transparent">
          <Grid strokeWidth={2} size={24} className="animate-pulse text-white" />
          Toolkit
        </h2>
        
        <div className="mb-6">
          <GymSelector />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <a
              key={tool.name}
              href={tool.url}
              className={cn(
                "bg-white/95 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center gap-2.5",
                "cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white shadow-sm group",
                "animate-scale-in"
              )}
            >
              <IconComponent 
                strokeWidth={1.5} 
                className={cn(
                  "w-10 h-10 text-gray-500 transition-all duration-300",
                  tool.color,
                  "group-hover:scale-110"
                )} 
              />
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                {tool.name}
              </span>
            </a>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {comingSoonTools.map((item, index) => (
          <div
            key={index}
            className="bg-white/20 rounded-xl p-4 flex flex-col items-center justify-center 
                     text-center hover:bg-white/30 transition-all duration-300 cursor-not-allowed
                     animate-fade-in"
          >
            <Plus size={20} className="mb-2 opacity-50" />
            <span className="text-white text-sm font-medium mb-1">{item.title}</span>
            <span className="text-white/80 text-xs">{item.subtitle}</span>
          </div>
        ))}
      </div>

      <Button 
        variant="ghost" 
        className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white
                   transition-all duration-300 animate-fade-in"
        onClick={() => window.open('https://github.com/your-repo/issues/new', '_blank')}
      >
        <Plus className="w-4 h-4 mr-2" />
        Suggest New Tool
      </Button>
    </div>
  );
};

export default Toolkit;