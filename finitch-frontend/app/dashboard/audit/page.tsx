"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw, Trash2, ChevronLeft, Search } from 'lucide-react';
import Link from 'next/link';

export default function WealthAudit() {
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsScanning(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const subscriptions = [
        { name: 'Netflix Premium', amount: 649, status: 'Active', frequency: 'Monthly', waste_prob: 'High' },
        { name: 'Adobe Creative Cloud', amount: 4230, status: 'Active', frequency: 'Monthly', waste_prob: 'Low' },
        { name: 'Zomato Gold', amount: 299, status: 'Active', frequency: 'Quarterly', waste_prob: 'Medium' },
    ];

    return (
        <div className="min-h-screen bg-[#060607] text-white p-12 font-sans">
            <div className="max-w-5xl mx-auto space-y-12">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors text-xs font-black uppercase tracking-widest">
                    <ChevronLeft size={16} /> Back to Control
                </Link>

                <div className="flex justify-between items-end">
                    <div className="space-y-4">
                        <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">Wealth <br/><span className="text-cyan-500 text-7xl">Audit.</span></h1>
                        <p className="text-gray-500 text-xl font-medium italic">Gemini is scanning your UPI signals for hidden recurring drains.</p>
                    </div>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 px-6 py-4 rounded-3xl flex items-center gap-4">
                        <Search className={isScanning ? "animate-spin text-cyan-500" : "text-cyan-500"} size={24} />
                        <span className="text-xs font-black uppercase tracking-widest">{isScanning ? "Scanning signals..." : "Audit Complete"}</span>
                    </div>
                </div>

                {/* THE SUBSCRIPTION GHOST LIST */}
                <div className="grid grid-cols-1 gap-6">
                    {subscriptions.map((sub, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between hover:border-cyan-500/30 transition-all"
                        >
                            <div className="flex items-center gap-8">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                    <RefreshCw className="text-cyan-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tight">{sub.name}</h3>
                                    <p className="text-gray-500 text-xs font-bold uppercase mt-1 tracking-widest">₹{sub.amount} • {sub.frequency}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-12">
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Waste Probability</p>
                                    <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                                        sub.waste_prob === 'High' ? 'text-red-500 border-red-500/20 bg-red-500/5' : 'text-green-500 border-green-500/20 bg-green-500/5'
                                    }`}>
                                        {sub.waste_prob}
                                    </span>
                                </div>
                                <button className="p-4 bg-white/5 rounded-2xl text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ACTION CARD */}
                <div className="bg-cyan-500 p-12 rounded-[4rem] text-black flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-cyan-500/10">
                    <div className="space-y-4">
                        <ShieldAlert size={48} />
                        <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Unused Passive <br/> Leaks Found.</h3>
                        <p className="font-bold opacity-80 text-lg max-w-sm">We found 2 subscriptions you haven't used in 45 days. Canceling them saves you ₹948/mo.</p>
                    </div>
                    <button className="whitespace-nowrap px-12 py-6 bg-black text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all">
                        Purge All Leaks
                    </button>
                </div>
            </div>
        </div>
    );
}