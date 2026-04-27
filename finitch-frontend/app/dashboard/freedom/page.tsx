"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, ShieldCheck, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function FreedomPath() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://127.0.0.1:8000/dashboard/summary');
            const result = await res.json();
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#060607] text-white p-12 font-sans">
            {/* Header */}
            <div className="max-w-6xl mx-auto space-y-12">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors text-xs font-black uppercase tracking-widest">
                    <ChevronLeft size={16} /> Back to Control
                </Link>

                <div className="space-y-4">
                    <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">Freedom <br/><span className="text-amber-500 text-7xl">Countdown.</span></h1>
                    <p className="text-gray-500 text-xl font-medium max-w-xl leading-relaxed italic">
                        Based on your current burn rate and capital leaks, your trajectory is locked.
                    </p>
                </div>

                {/* THE MAIN CLOCK */}
                <div className="bg-amber-500 text-black p-16 rounded-[4rem] relative overflow-hidden group shadow-2xl shadow-amber-500/10">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6 opacity-60 uppercase font-black text-xs tracking-[0.3em]">
                            <Clock size={16} /> Estimated Freedom Date
                        </div>
                        <h2 className="text-9xl font-black tracking-tighter italic uppercase leading-none">Sept 2041</h2>
                        <div className="mt-10 h-2 w-full bg-black/10 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '35%' }} className="h-full bg-black" />
                        </div>
                        <p className="mt-6 font-bold text-lg">You are 35% of the way to escaping the 9-to-5 loop.</p>
                    </div>
                    <div className="absolute -right-20 -bottom-20 text-[300px] font-black italic opacity-5 pointer-events-none">CLOCK</div>
                </div>

                {/* THE "WHAT IF" SIMULATOR */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-6">
                        <TrendingUp className="text-amber-500" size={40} />
                        <h3 className="text-2xl font-black italic uppercase tracking-tight">The "Leak" Hack</h3>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            By plugging your ₹{data?.wealth_leaks?.daily_lazy_cash_loss} daily leak and moving it to an index fund, you pull your freedom date closer by:
                        </p>
                        <div className="text-4xl font-black text-white italic tracking-tighter">
                            + 14 Months
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-6">
                        <ShieldCheck className="text-cyan-500" size={40} />
                        <h3 className="text-2xl font-black italic uppercase tracking-tight">Strategy Shield</h3>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            Maintaining your current <span className="text-white font-bold">{data?.streak_data?.current_streak} day streak</span> adds an extra safety margin of ₹1.2L to your retirement corpus.
                        </p>
                        <div className="text-4xl font-black text-white italic tracking-tighter">
                            STABLE 🛡️
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}