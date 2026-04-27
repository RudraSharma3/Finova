"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Droplet, Wind, ChevronLeft, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LeaksPage() {
    const [plugged, setPlugged] = useState<string[]>([]);

    const activeLeaks = [
        { id: 'chai', name: 'Micro-Habit: Daily Chai/Coffee', amount: 1500, icon: <Droplet />, impact: '32 Days Delay', color: 'text-blue-400' },
        { id: 'delivery', name: 'Delivery Convenience Fees', amount: 850, icon: <Wind />, impact: '14 Days Delay', color: 'text-cyan-400' },
        { id: 'impulse', name: 'Late Night Impulse UPIs', amount: 3200, icon: <Flame />, impact: '2 Months Delay', color: 'text-orange-500' },
    ];

    const togglePlug = (id: string) => {
        setPlugged(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <div className="min-h-screen bg-[#060607] text-white p-12 font-sans selection:bg-orange-500/30">
            <div className="max-w-5xl mx-auto space-y-12">
                
                {/* Back Link */}
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors text-xs font-black uppercase tracking-widest">
                    <ChevronLeft size={16} /> Back to Control
                </Link>

                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">Leak <br/><span className="text-orange-500 text-7xl">Command.</span></h1>
                    <p className="text-gray-500 text-xl font-medium italic">Your capital is "evaporating" through these 3 specific holes.</p>
                </div>

                {/* ACTIONABLE LEAK CARDS */}
                <div className="grid grid-cols-1 gap-6">
                    {activeLeaks.map((leak) => (
                        <div 
                            key={leak.id}
                            className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 flex items-center justify-between overflow-hidden group ${
                                plugged.includes(leak.id) 
                                ? 'bg-green-500/10 border-green-500/40 opacity-60' 
                                : 'bg-white/5 border-white/10 hover:border-orange-500/30'
                            }`}
                        >
                            <div className="flex items-center gap-8 relative z-10">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 ${leak.color}`}>
                                    {plugged.includes(leak.id) ? <Zap size={24} fill="currentColor" /> : leak.icon}
                                </div>
                                <div>
                                    <h3 className={`text-2xl font-black italic uppercase tracking-tight ${plugged.includes(leak.id) ? 'line-through' : ''}`}>
                                        {leak.name}
                                    </h3>
                                    <p className="text-gray-500 text-xs font-bold uppercase mt-1 tracking-widest">
                                        Estimated Loss: ₹{leak.amount}/mo • <span className="text-white">{leak.impact}</span>
                                    </p>
                                </div>
                            </div>

                            <button 
                                onClick={() => togglePlug(leak.id)}
                                className={`relative z-10 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                                    plugged.includes(leak.id) 
                                    ? 'bg-green-500 text-black' 
                                    : 'bg-white/10 text-white hover:bg-orange-500 hover:text-black'
                                }`}
                            >
                                {plugged.includes(leak.id) ? 'Plugged' : 'Plug Leak'}
                            </button>

                            {plugged.includes(leak.id) && (
                                <motion.div 
                                    initial={{ width: 0 }} animate={{ width: '100%' }}
                                    className="absolute inset-0 bg-green-500/5 pointer-events-none"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* THE "MASTER PLUG" ACTION */}
                <div className="bg-orange-500 p-12 rounded-[4rem] text-black shadow-2xl shadow-orange-500/10 relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-6">Recover <br/> Lazy Cash.</h3>
                        <p className="font-bold text-lg max-w-sm mb-10 opacity-90 leading-tight">
                            You have ₹63,000 sitting in a 3% account. Moving it to a Growth Engine recovers <span className="underline decoration-2">₹465/mo</span> automatically.
                        </p>
                        <button className="flex items-center gap-4 bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">
                            Initialize Recovery <ArrowRight size={18} />
                        </button>
                    </div>
                    <div className="absolute -right-10 -bottom-10 text-[200px] font-black italic opacity-10 pointer-events-none">RECOVER</div>
                </div>
            </div>
        </div>
    );
}