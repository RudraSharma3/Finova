"use client";
import React, { useEffect, useState } from 'react';
import {
    Wallet, Activity, LayoutDashboard, Sparkles,
    Zap, Bell, CheckCircle2, Target, TrendingUp, 
    AlertTriangle, ArrowRight, Gift, Cpu, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DNACalibrator from '@/components/Dashboard/DNACalibrator';

export default function VaulticDashboard() {
    const [isSetup, setIsSetup] = useState(false);
    const [pulse, setPulse] = useState<any>(null);
    const [showLeakModal, setShowLeakModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const checkStatus = async () => {
        try {
            const token = localStorage.getItem('finova_token');
            if (!token) {
                router.push('/login');
                return;
            }

            const res = await fetch('http://127.0.0.1:8000/dashboard/summary', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await res.json();

            if (res.ok && !result.error && result.monthly_income > 0) {
                setPulse(result);
                setIsSetup(true);
            } else {
                setIsSetup(false);
            }
        } catch (e) {
            console.error("Vaultic Brain Connection Offline.");
            setIsSetup(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();
    }, []);

    const handleDNAComplete = async (dnaData: any) => {
        const token = localStorage.getItem('finova_token');
        try {
            const res = await fetch('http://127.0.0.1:8000/user/setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dnaData)
            });

            if (res.ok) {
                await checkStatus();
            }
        } catch (e) {
            alert("Sync Failed. Engine Unreachable.");
        }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-vaultic-black flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-vaultic-orange" size={40} />
            <p className="text-vaultic-orange font-black uppercase tracking-[0.4em] italic text-xs">Syncing DNA...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-vaultic-black text-white flex font-sans selection:bg-vaultic-orange/30">
            
            {/* DNA CALIBRATOR MODAL */}
            {!isSetup && <DNACalibrator onComplete={handleDNAComplete} />}

            {/* LEAK PLUGGER MODAL */}
            <AnimatePresence>
                {showLeakModal && (
                    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6">
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full bg-vaultic-charcoal border border-white/10 p-12 rounded-[3.5rem] shadow-3xl text-center"
                        >
                            <AlertTriangle className="text-vaultic-orange mx-auto mb-8" size={56} />
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4 text-white">Neural Intervention</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-10">
                                Autonomous Agent detected <span className="text-white font-bold">₹{pulse?.wealth_leaks?.monthly_impact || 0}</span> evaporating in idle accounts. 
                                Establish a high-velocity SIP to reclaim your freedom date.
                            </p>
                            <div className="space-y-4">
                                <button onClick={() => setShowLeakModal(false)} className="w-full bg-vaultic-orange text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-vaultic-orange/20">Authorize Agent</button>
                                <button onClick={() => setShowLeakModal(false)} className="w-full text-gray-500 py-2 font-bold uppercase text-[10px] tracking-widest hover:text-white transition-colors">Dismiss Signal</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* SIDEBAR */}
            <aside className="w-80 border-r border-white/5 p-8 flex flex-col gap-12 bg-vaultic-charcoal/50 backdrop-blur-md">
                <div className="flex items-center gap-3 px-2">
                    <Image src="/logo.png" alt="Vaultic" width={28} height={28} />
                    <span className="text-xl font-black tracking-tighter uppercase italic pt-1">Vaultic.</span>
                </div>

                <nav className="flex flex-col gap-2">
                    <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={18} />} label="Overview" active /></Link>
                    <Link href="/dashboard/freedom"><NavItem icon={<TrendingUp size={18} />} label="Freedom Path" /></Link>
                    <Link href="/dashboard/audit"><NavItem icon={<Activity size={18} />} label="Wealth Audit" /></Link>
                    <Link href="/dashboard/leaks"><NavItem icon={<Bell size={18} />} label="Neural Leaks" /></Link>
                </nav>

                <Link href="/dashboard/wrapped">
                    <div className="bg-gradient-to-br from-indigo-600 to-vaultic-orange p-6 rounded-[2.5rem] text-center group cursor-pointer hover:brightness-110 transition-all shadow-xl shadow-indigo-500/10 border border-white/10">
                        <Gift className="mx-auto text-white mb-3 group-hover:scale-110 transition-transform" size={24} />
                        <p className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-1 italic">Retrospective</p>
                        <h2 className="text-lg font-black italic text-white uppercase tracking-tighter leading-none">Wrapped Mode</h2>
                    </div>
                </Link>

                <div className="mt-auto bg-vaultic-orange/5 border border-vaultic-orange/10 p-7 rounded-[2.5rem] text-center">
                    <p className="text-[9px] font-black text-vaultic-orange uppercase tracking-widest mb-3 italic">Discipline Lock</p>
                    <h2 className="text-3xl font-black italic text-white">{pulse?.streak_data?.current_streak || 0} DAYS 🔥</h2>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-12 overflow-y-auto">
                <header className="flex justify-between items-start mb-16">
                    <div>
                        <h1 className="text-5xl font-black tracking-tight uppercase italic leading-none text-white">Control Center</h1>
                        <p className="text-gray-500 text-sm mt-4 flex items-center gap-2 font-medium italic">
                            <Zap size={14} className="text-vaultic-orange" fill="currentColor"/>
                            {pulse?.nudges?.[1] || "Initializing Neural Diagnostics..."}
                        </p>
                    </div>
                    <div className="bg-vaultic-charcoal border border-white/10 p-6 px-10 rounded-[2.5rem] text-right shadow-2xl relative group overflow-hidden">
                        <div className="absolute inset-0 bg-vaultic-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-[9px] text-vaultic-orange font-black uppercase tracking-[0.3em] mb-2 italic relative z-10">Safe Daily Limit</p>
                        <p className="text-4xl font-black text-white tracking-tighter italic leading-none relative z-10">₹{pulse?.daily_safe_budget || 0}</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
                    {/* PRIMARY ACTION CARD */}
                    <div className="lg:col-span-7 bg-vaultic-orange p-12 rounded-[4rem] text-white relative overflow-hidden group shadow-2xl shadow-vaultic-orange/20">
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <Cpu size={40} className="mb-8 text-white drop-shadow-lg" />
                                <h3 className="text-6xl font-black tracking-tighter uppercase italic leading-[0.8] mb-8">Capital <br /> Evaporation.</h3>
                                <p className="font-bold text-xl text-white leading-tight italic max-w-xs drop-shadow-md">
                                    Lazy cash detected: <span className="underline decoration-4">₹{pulse?.wealth_leaks?.daily_lazy_cash_loss || 0}</span> lost today.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowLeakModal(true)}
                                className="mt-12 bg-white text-black px-12 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl w-fit"
                            >
                                Plug Leak <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="absolute -right-16 -bottom-16 text-[280px] font-black text-black opacity-10 select-none italic pointer-events-none tracking-tighter">VAULT</div>
                    </div>

                    {/* FREEDOM VELOCITY CARD */}
                    <div className="lg:col-span-5 bg-vaultic-charcoal border border-white/10 p-12 rounded-[4rem] flex flex-col justify-between hover:border-vaultic-orange/30 transition-all group">
                        <div className="flex justify-between items-start">
                            <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:border-vaultic-orange/50 transition-colors">
                                <Target className="text-vaultic-orange" size={32} />
                            </div>
                            <div className="text-right">
                                <span className="text-[9px] font-black bg-vaultic-mint/10 text-vaultic-mint px-5 py-2 rounded-full uppercase italic border border-vaultic-mint/20">
                                    Trajectory: {pulse?.overall_health_score || 0}/100
                                </span>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Freedom <br /> Velocity</h3>
                            <p className="text-gray-500 text-lg mt-5 font-semibold italic leading-relaxed">{pulse?.nudges?.[0] || "Mapping trajectory..."}</p>
                        </div>

                        <div className="mt-12">
                            <div className="flex justify-between mb-4 text-[10px] font-black uppercase tracking-widest text-gray-500 italic">
                                <span>Goal Pulse</span>
                                <span className="text-white">{pulse?.overall_health_score || 0}%</span>
                            </div>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }} animate={{ width: `${pulse?.overall_health_score || 0}%` }}
                                    className="h-full bg-vaultic-mint shadow-[0_0_20px_rgba(0,255,194,0.3)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SYSTEM SIGNALS LOG */}
                <div className="bg-vaultic-charcoal/50 backdrop-blur-sm border border-white/10 rounded-[4rem] p-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-12">
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter">Neural Signals</h3>
                            <div className="h-3 w-3 rounded-full bg-vaultic-mint animate-pulse shadow-[0_0_10px_#00FFC2]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pulse?.nudges?.map((msg: string, i: number) => (
                                <motion.div
                                    key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-6 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-vaultic-orange/20 transition-all cursor-default group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-vaultic-orange/10 flex items-center justify-center border border-vaultic-orange/20 group-hover:bg-vaultic-orange group-hover:text-white transition-all">
                                        <ShieldCheck size={22} />
                                    </div>
                                    <p className="text-base font-bold text-gray-400 italic leading-snug group-hover:text-white transition-colors">{msg}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center gap-5 p-5 rounded-[1.5rem] cursor-pointer transition-all group ${
            active ? 'bg-white text-black shadow-2xl' : 'text-gray-500 hover:text-white hover:bg-white/5'
        }`}>
            <div className={`${active ? 'text-black' : 'group-hover:text-vaultic-orange'} transition-all`}>
                {icon}
            </div>
            <span className="font-black text-[11px] uppercase tracking-[0.2em]">{label}</span>
        </div>
    );
}

const Loader2 = ({ className, size }: { className?: string, size?: number }) => (
    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className={className}>
        <Cpu size={size} />
    </motion.div>
);