import React from 'react';
import { Grid, Instagram, Facebook, Share2, Palette } from 'lucide-react';

const Toolkit = () => {
  return (
    <div className="w-[280px] min-h-screen bg-primary p-6 shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-white mb-6">
          <Grid strokeWidth={2} size={24} />
          Toolkit
        </h2>
        
        <select 
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border-none focus:ring-2 focus:ring-white/20 text-base"
          defaultValue=""
        >
          <option value="" className="text-foreground">Select a gym</option>
          <option value="gym1" className="text-foreground">Gym 1</option>
          <option value="gym2" className="text-foreground">Gym 2</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { name: 'Instagram', icon: Instagram },
          { name: 'Facebook', icon: Facebook },
          { name: 'SharePoint', icon: Share2 },
          { name: 'Canva', icon: Palette }
        ].map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div
              key={tool.name}
              className="bg-white rounded-xl p-5 flex flex-col items-center justify-center gap-2.5 cursor-pointer hover:scale-105 hover:bg-white/90 transition-all shadow-sm"
            >
              <IconComponent strokeWidth={1.5} className="text-gray-400 w-10 h-10" />
              <span className="text-sm font-medium text-gray-500">{tool.name}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { title: 'Coming Soon', subtitle: 'Tuition Estimator' },
          { title: 'Coming Soon', subtitle: 'Submit Tool Idea' }
        ].map((item) => (
          <div
            key={item.subtitle}
            className="bg-white/20 rounded-xl p-5 flex flex-col items-center justify-center text-center"
          >
            <span className="text-white text-sm font-medium mb-1">{item.title}</span>
            <span className="text-white/80 text-xs">{item.subtitle}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolkit;