"use client";
import { useState } from 'react';

export const RealityCheck = () => {
  const [spend, setSpend] = useState(0);
  const delayDays = Math.floor(spend / 42); // Logic: ₹6000 spend = ~14 days delay

  return (
    <section className="py-32 px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#0d0d0d] p-12 rounded-[3rem] border border-white/10">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold tracking-tighter">Meet Your Future-Seeing Coach.</h3>
          <p className="text-gray-500">Drag to see how a splurge affects your dreams.</p>
          <div className="py-10">
            <label className="block text-sm font-bold mb-4 uppercase text-orange-500">New Sneakers Cost: ₹{spend}</label>
            <input 
              type="range" min="0" max="10000" step="500" value={spend}
              onChange={(e) => setSpend(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
        </div>

        <div className="bg-black/40 p-8 rounded-3xl border border-white/5 flex flex-col justify-center">
          <h4 className="text-xl font-bold mb-4">Europe Trip Fund</h4>
          <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-500 transition-all duration-500" 
              style={{ width: `${Math.max(10, 90 - (spend/100))}%` }} 
            />
          </div>
          {spend > 0 && (
            <p className="mt-6 text-orange-400 italic text-sm animate-pulse">
              ⚠️ This purchase delays your trip by {delayDays} days and misses your 7.5% annual ROI.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};