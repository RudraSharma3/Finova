"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, Zap, BarChart3, Lock, Cpu } from 'lucide-react';
import PulseModule from '@/components/Engine/PulseModule';
import NudgeFeed from '@/components/Dashboard/NudgeFeed';

const insightQuotes = [
  "Strategic allocation is the antidote to market volatility.",
  "Your wealth is a function of your decisions, not your bank balance.",
  "Financial freedom is the ability to ignore the noise.",
  "Agentic AI: Your silent partner in wealth generation.",
  "Outrun your spending velocity. Own your freedom date."
];

const anxietyCards = [
  { text: "IMPULSE TRIGGER DETECTED 🍔", cost: "+ ₹450", color: "border-vaultic-orange" },
  { text: "SUBSCRIPTION OVERLOAD 📺", cost: "+ ₹1,200", color: "border-vaultic-mint" },
  { text: "LAZY CASH DETECTED 📉", cost: "3% APY", color: "border-red-900" },
];

export default function VaulticLanding() {
  const [spend, setSpend] = useState(0);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  const delayDays = Math.floor(spend / 42);

  const riskColor = spend > 7000 ? "#FF4500" : spend > 3500 ? "#f59e0b" : "#00FFC2";
  const riskShadow = spend > 7000 ? "shadow-[0_0_30px_rgba(255,69,0,0.6)]" : spend > 3500 ? "shadow-[0_0_30px_rgba(245,158,11,0.4)]" : "shadow-[0_0_25px_rgba(0,255,194,0.4)]";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-vaultic-black" />;

  return (
    <div className="min-h-screen bg-vaultic-black text-white selection:bg-vaultic-orange/30 overflow-x-hidden scroll-smooth">
      
      {/* 2026 AMBIENT ENGINE BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-vaultic-orange/5 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-[0%] right-[-10%] w-[800px] h-[800px] bg-vaultic-mint/5 blur-[200px] rounded-full" />
      </div>

      {/* STICKY NAV */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-vaultic-black/60 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push('/')}>
            <Image src="/logo.png" alt="Vaultic Logo" width={32} height={32} className="group-hover:scale-110 transition-transform opacity-90"/>
            <span className="text-xl font-extrabold tracking-tighter uppercase italic pt-0.5">Vaultic</span>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-vaultic-orange transition-all">Login</Link>
            <Link href="/login" className="px-7 py-3 bg-white text-black rounded-full font-bold text-xs hover:bg-vaultic-orange hover:text-white transition-all shadow-xl shadow-white/5 uppercase tracking-widest">
                Build My Vault
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">

        {/* 1. HERO SECTION */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative border-b border-white/5">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-20">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 space-y-12"
            >
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-vaultic-orange/20 bg-vaultic-orange/5 text-vaultic-orange text-[10px] font-extrabold uppercase tracking-widest">
                  <Zap size={14} fill="currentColor" />
                  Autonomous Financial Intelligence
                </div>
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.85] uppercase">
                  OWN YOUR FUTURE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-vaultic-orange to-amber-500 italic">VELOCITY.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-xl font-semibold leading-relaxed">
                  Stop tracking the past. Start commanding the future. <br/>
                  Vaultic audits your financial DNA to automate wealth growth.
                </p>
                
                <div className="flex items-center gap-6 pt-6">
                    <Link href="/login" className="px-12 py-6 bg-vaultic-orange text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-vaultic-orange/30 flex items-center gap-4">
                      INITIALIZE ENGINE <ArrowRight size={20} />
                    </Link>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Neural Feedback Loop:</p>
                <div className="scale-100 origin-left">
                  <NudgeFeed />
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-5 flex justify-center items-start lg:mt-[-350px]">
               <PulseModule />
            </div>
          </div>
        </section>

        {/* WISDOM TICKER */}
        <div className="relative z-20 w-full border-y border-white/5 bg-white/[0.01] py-8 overflow-hidden flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1500] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex gap-24 items-center pr-24"
          >
            {[...insightQuotes, ...insightQuotes].map((q, i) => (
              <span key={i} className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 flex items-center gap-6">
                <span className="w-2 h-2 bg-vaultic-mint rounded-full shadow-[0_0_12px_#00FFC2]" />
                "{q}"
              </span>
            ))}
          </motion.div>
        </div>

        {/* 2. THE PROBLEM BENTO */}
        <section className="py-32 px-6 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-24 tracking-tighter uppercase">
            WHERE IS YOUR <br /> <span className="text-vaultic-orange italic">CAPITAL EVAPORATING?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {anxietyCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`p-10 bg-vaultic-charcoal border border-white/5 rounded-[2.5rem] shadow-2xl group hover:border-vaultic-orange/30 transition-all text-left`}
              >
                <div className={`h-1.5 w-16 rounded-full mb-8 ${card.color.replace('border-', 'bg-')} shadow-[0_0_20px_currentColor]`}></div>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-4 opacity-70">{card.text}</p>
                <p className="text-4xl font-black text-white italic tracking-tighter">{card.cost}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. THE SIMULATOR (REFACTORED SLIDER) */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-vaultic-charcoal border border-white/5 p-10 lg:p-20 rounded-[4rem] shadow-2xl backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-vaultic-orange/5 blur-[140px] pointer-events-none" />

            <div className="space-y-12">
              <h3 className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-tight uppercase italic">Neural <br /> Forecast.</h3>
              <p className="text-gray-400 font-semibold text-lg md:text-xl leading-relaxed">
                Vaultic simulates the future impact of every micro-decision. <br/>
                See your 2041 reality before you spend.
              </p>

              <div className="pt-8 space-y-8">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-black uppercase tracking-widest text-vaultic-orange">Simulated Spend</label>
                  <span className="text-2xl font-black text-white italic tracking-tighter">₹{spend}</span>
                </div>
                
                {/* IMPROVED SLIDER PHYSICS */}
                <div className="relative h-6 flex items-center">
                  <div className="absolute w-full h-1.5 bg-white/10 rounded-full" />
                  <input
                    type="range" min="0" max="10000" step="500" value={spend}
                    onChange={(e) => setSpend(parseInt(e.target.value))}
                    className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer z-10 
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vaultic-orange 
                               [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(255,69,0,0.5)] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-vaultic-black"
                  />
                  <div className="absolute h-1.5 bg-vaultic-orange rounded-full pointer-events-none" style={{ width: `${(spend / 10000) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-black/50 p-10 lg:p-14 rounded-[3.5rem] border border-white/5 flex flex-col justify-center relative shadow-inner">
              <div className="absolute top-10 right-12 text-[9px] font-mono text-vaultic-mint uppercase tracking-widest font-bold">Projection Active</div>
              <h4 className="text-xl font-black mb-10 text-white tracking-widest border-b border-white/5 pb-8 flex items-center gap-4">
                <Cpu size={24} className="text-vaultic-mint"/> TRAVEL VAULT
              </h4>
              <div className="space-y-10">
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    animate={{ 
                      width: `${Math.max(10, 95 - (spend / 100))}%`,
                      backgroundColor: riskColor
                    }}
                    className={`h-full transition-all duration-500 ${riskShadow}`}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  <span>Feasibility</span>
                  <span className="text-white">{95 - Math.floor(spend / 100)}%</span>
                </div>
              </div>
              {spend > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 p-8 bg-vaultic-orange/5 rounded-3xl border border-vaultic-orange/20">
                  <p className="text-vaultic-orange text-xl font-black italic">
                    ⚠️ Trajectory Drift: <span className="text-white">-{delayDays} Days</span>
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* 4. TECH BENTO */}
        <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-vaultic-charcoal border border-white/5 p-12 rounded-[3.5rem] min-h-[400px] flex flex-col justify-end group hover:border-vaultic-mint/30 transition-all shadow-2xl">
            <div className="bg-vaultic-mint/10 p-5 rounded-2xl w-fit mb-10 text-vaultic-mint">
                <BarChart3 size={36} />
            </div>
            <h3 className="text-4xl font-extrabold mb-4 tracking-tighter uppercase italic">Neural Interceptor</h3>
            <p className="text-gray-400 text-lg font-semibold leading-relaxed">
                Autonomous agents that monitor spending velocity and <br /> 
                intercept impulse triggers before they hit your vault.
            </p>
          </div>

          <div className="bg-vaultic-orange p-12 rounded-[4rem] flex flex-col justify-between group hover:scale-[1.02] transition-transform shadow-[0_0_100px_rgba(255,69,0,0.2)]">
            <Zap size={64} className="text-white" fill="currentColor" />
            <div>
              <h4 className="text-black font-extrabold text-3xl mb-4 leading-tight uppercase italic tracking-tighter">Velocity Alerts</h4>
              <p className="text-white font-black text-lg leading-snug italic drop-shadow-lg">
                "Spend ₹200 less today to hit your Goa goal 2 months early."
              </p>
            </div>
          </div>
        </section>

        {/* 5. SECURITY SECTION (FIXED SCALE) */}
        <section className="py-40 px-6 bg-white/[0.01] border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            <div className="flex-1 space-y-10">
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter italic leading-[0.9] uppercase">
                SECURED IN <br /> <span className="text-vaultic-orange">THE VAULT.</span>
              </h2>
              <div className="flex items-start gap-8 group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-vaultic-orange/10 border border-vaultic-orange/20 flex items-center justify-center text-vaultic-orange font-bold group-hover:bg-vaultic-orange group-hover:text-white transition-all">
                    <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl mb-3 uppercase tracking-tight">RBI AA COMPLIANT</h4>
                  <p className="text-gray-400 text-lg font-semibold leading-relaxed max-w-md">
                    Zero-knowledge architecture. We use the Account Aggregator framework to sync data without ever seeing your bank passwords.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="relative shrink-0 w-full max-w-[450px] aspect-square border border-white/10 rounded-full flex items-center justify-center shadow-2xl"
            >
              <div className="absolute inset-0 bg-vaultic-orange/5 blur-[100px]" />
              <div className="bg-vaultic-charcoal p-10 rounded-full border border-white/10 shadow-inner">
                <Lock size={100} className="text-vaultic-orange drop-shadow-[0_0_30px_rgba(255,69,0,0.5)]" />
              </div>
              <div className="absolute inset-10 border border-dashed border-white/10 rounded-full opacity-30" />
            </motion.div>
          </div>
        </section>

      </main>

      <footer className="py-20 border-t border-white/5 text-center text-gray-600">
        <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-40">Vaultic Decision Engine © 2026 | Institutional DNA</p>
      </footer>
    </div>
  );
}