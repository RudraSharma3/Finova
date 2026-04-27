"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PulseModule() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchPulse = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/dashboard/summary');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Brain Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchPulse();
    const interval = setInterval(fetchPulse, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || loading) return (
    <div className="min-h-[400px] w-full bg-white/5 animate-pulse rounded-[3rem] flex items-center justify-center">
      <p className="text-white/20 font-light tracking-tighter italic">Syncing with Brain...</p>
    </div>
  );

  return (
    <div className="relative group perspective-1000 w-full max-w-xl mx-auto lg:mx-0">
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-800 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 overflow-hidden shadow-2xl">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h3 className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">Wealth Health</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white tracking-tighter">{data?.overall_health_score || '00'}</span>
              <span className="text-orange-500 font-bold text-sm">/100</span>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full text-[10px] font-bold border border-green-500/30 text-green-400 bg-green-500/5 uppercase italic">
            {data?.overall_health_score > 70 ? 'Optimal' : 'Leaking'}
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center group-hover:border-orange-500/30 transition-all">
            <h4 className="text-white/40 text-[9px] uppercase tracking-widest font-bold mb-2">Daily Safe Budget</h4>
            <span className="text-4xl font-black text-white tracking-tighter">₹{data?.daily_safe_budget || '0'}</span>
            <p className="text-orange-500/60 text-[10px] mt-2 font-medium italic">"Safe trajectory secured until midnight"</p>
          </div>

          <div className="space-y-3">
            {data?.nudges?.map((nudge: string, i: number) => (
              <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4 hover:border-white/10 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <p className="text-[11px] text-white/70 font-light leading-relaxed italic">{nudge}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-black italic">{data?.streak_data?.current_streak} Day Streak 🔥</span>
            <button onClick={fetchPulse} className="text-[10px] text-orange-500 font-black uppercase hover:text-orange-400 transition-colors">Re-Sync Engine</button>
          </div>
          
          <Link href="/dashboard" className="w-full">
            <button className="w-full py-4 bg-white text-black font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-xl">
              Enter Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}