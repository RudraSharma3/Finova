"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function NudgeFeed() {
  const [liveNudges, setLiveNudges] = useState<any[]>([]);

  // Simulation of pulling the latest 3 transaction impacts from the DB
  useEffect(() => {
    const fetchNudges = async () => {
      try {
        const response = await fetch('http://localhost:8000/history'); // Connect to your history route
        const history = await response.json();
        // Just take the last 3 for the landing page feed
        setLiveNudges(history.slice(-3).reverse());
      } catch (e) {
        // Fallback to static if backend is offline
        setLiveNudges([
          { category: 'Food', amount: 450, merchant: 'Zomato', timestamp: 'Today' },
          { category: 'Shopping', amount: 2400, merchant: 'Amazon', timestamp: 'Yesterday' }
        ]);
      }
    };
    fetchNudges();
  }, []);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex justify-between items-center mb-6 px-2">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 italic">Behavioral Stream</h4>
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,1)]" />
      </div>

      {liveNudges.map((nudge, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
          className="group relative p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-orange-500/30 transition-all"
        >
          <div className="flex justify-between items-center">
            <div>
              <h5 className="text-[11px] font-black text-white uppercase tracking-tighter italic">{nudge.merchant || 'Unplanned Leak'}</h5>
              <p className="text-[10px] text-gray-500 font-light mt-1">₹{nudge.amount} spent in {nudge.category}</p>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest italic"> Drift Impact </span>
              <p className="text-xs text-white font-bold">-{Math.round(nudge.amount/150)} Days to Goal</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}