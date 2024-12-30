import React from 'react';
import { Grid, Instagram, Facebook, Share2, Palette } from 'lucide-react';

const Toolkit = () => {
  return (
    <div className="w-[280px] min-h-screen bg-primary rounded-t-3xl rounded-r-none p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-white mb-6">
          <Grid size={24} />
          Toolkit
        </h2>
        
        <select 
          className="w-full p-3 rounded-lg bg-white/20 text-white/90 placeholder-white/70 border-none focus:ring-2 focus:ring-white/20"
        >
          <option value="" className="text-foreground">Select a gym</option>
          <option value="gym1" className="text-foreground">Gym 1</option>
          <option value="gym2" className="text-foreground">Gym 2</option>
        </select>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
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
              className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/90 transition-colors"
            >
              <IconComponent className="text-gray-400" size={24} />
              <span className="text-sm text-gray-500">{tool.name}</span>
            </div>
          );
        })}
      </div>

      {/* Coming Soon Items */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: 'Coming Soon', subtitle: 'Tuition Estimator' },
          { title: 'Coming Soon', subtitle: 'Submit Tool Idea' }
        ].map((item) => (
          <div
            key={item.subtitle}
            className="bg-white/20 rounded-xl p-4 flex flex-col items-center justify-center text-center"
          >
            <span className="text-white text-sm mb-1">{item.title}</span>
            <span className="text-white/80 text-xs">{item.subtitle}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolkit;