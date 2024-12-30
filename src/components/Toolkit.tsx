import React from 'react';
import { Grid, Instagram, Facebook, Share2, Palette, Plus } from 'lucide-react';
import { Button } from './ui/button';

const Toolkit = () => {
  return (
    <div className="w-[280px] min-h-screen bg-primary/95 backdrop-blur-sm rounded-t-[15px] p-5 text-white shadow-lg border-r border-primary/20">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
          <Grid strokeWidth={2} size={24} className="animate-pulse" />
          Toolkit
        </h2>
        
        <select 
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border-none 
                     focus:ring-2 focus:ring-white/20 mb-6 transition-colors duration-200
                     hover:bg-white/30 cursor-pointer"
          defaultValue=""
        >
          <option value="" className="text-foreground">Select a gym</option>
          <option value="gym1" className="text-foreground">Gym 1</option>
          <option value="gym2" className="text-foreground">Gym 2</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { name: 'Instagram', icon: Instagram, color: 'hover:text-pink-400' },
          { name: 'Facebook', icon: Facebook, color: 'hover:text-blue-500' },
          { name: 'SharePoint', icon: Share2, color: 'hover:text-green-400' },
          { name: 'Canva', icon: Palette, color: 'hover:text-purple-400' }
        ].map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div
              key={tool.name}
              className={`bg-white/95 backdrop-blur-sm rounded-xl p-5 flex flex-col items-center 
                         justify-center gap-2.5 cursor-pointer hover:scale-105 transition-all 
                         duration-200 hover:bg-white shadow-sm group`}
            >
              <IconComponent 
                strokeWidth={1.5} 
                className={`w-10 h-10 text-gray-500 transition-colors duration-200 ${tool.color} group-hover:scale-110`} 
              />
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                {tool.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { title: 'Coming Soon', subtitle: 'Tuition Estimator', icon: Plus },
          { title: 'Coming Soon', subtitle: 'Submit Tool Idea', icon: Plus }
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/20 rounded-xl p-5 flex flex-col items-center justify-center 
                       text-center hover:bg-white/30 transition-colors duration-200 cursor-not-allowed"
          >
            <Plus size={20} className="mb-2 opacity-50" />
            <span className="text-white text-sm font-medium mb-1">{item.title}</span>
            <span className="text-white/80 text-xs">{item.subtitle}</span>
          </div>
        ))}
      </div>

      <Button 
        variant="ghost" 
        className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white"
        onClick={() => window.open('https://github.com/your-repo/issues/new', '_blank')}
      >
        <Plus className="w-4 h-4 mr-2" />
        Suggest New Tool
      </Button>
    </div>
  );
};

export default Toolkit;