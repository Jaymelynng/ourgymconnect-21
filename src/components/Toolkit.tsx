import React from 'react';
import { Grid, Instagram, Facebook, Share2, Palette } from 'lucide-react';

const Toolkit = () => {
  return (
    <div className="w-64 min-h-screen p-4 bg-primary rounded-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white mb-4">
          <Grid size={20} />
          Toolkit
        </h2>
        
        <select 
          className="w-full p-2 rounded-lg bg-secondary/20 text-white placeholder-white/70 border-none focus:ring-2 focus:ring-white/20"
        >
          <option value="" className="text-foreground">Select a gym</option>
          <option value="gym1" className="text-foreground">Gym 1</option>
          <option value="gym2" className="text-foreground">Gym 2</option>
        </select>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Instagram', icon: Instagram },
          { name: 'Facebook', icon: Facebook },
          { name: 'Sharepoint', icon: Share2 },
          { name: 'Canva', icon: Palette }
        ].map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div
              key={tool.name}
              className="bg-card rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-card/90 transition-colors shadow-sm"
            >
              <IconComponent className="mb-2 text-accent" size={24} />
              <span className="text-sm text-accent">{tool.name}</span>
            </div>
          );
        })}
      </div>

      {/* Coming Soon Items */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {[
          { name: 'Tuition Estimator', label: 'Coming Soon' },
          { name: 'Submit Tool Idea', label: 'Coming Soon' }
        ].map((item) => (
          <div
            key={item.name}
            className="bg-secondary/20 rounded-lg p-4 flex flex-col items-center justify-center text-center"
          >
            <span className="text-white text-sm mb-1">{item.label}</span>
            <span className="text-white text-xs">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolkit;