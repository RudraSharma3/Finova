"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Pizza, ShoppingBag, Clock, ChevronLeft, Share2, Target, TrendingUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// Data simulation for the "Story"
const wrappedStory = {
    persona: "Impulse Warrior",
    vibe_icon: <Zap className="text-orange-500" size={80} />,
    big_leak_cat: "Food Delivery",
    big_leak_icon: <Pizza className="text-blue-400" size={60} />,
    big_leak_amount: 14500,
    leak_impact: "3 weekends in Goa",
    freedom_date: "August 2042",
    freedom_countdown: "16 Years, 4 Months",
    score: 85
};

export default function FinovaWrapped() {
    const [slide, setSlide] = useState(1);
    const totalSlides = 3;

    useEffect(() => {
        if (slide <= totalSlides) {
            const timer = setTimeout(() => setSlide(slide + 1), 6000);
            return () => clearInterval(timer);
        }
    }, [slide]);

    const slideVariants = {
        initial: { opacity: 0, x: 200 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -200 },
    };

    return (
        <div className="min-h-screen bg-[#060607] text-white p-12 font-sans selection:bg-orange-500/30 relative overflow-hidden">
            {/* AMBIENT BACKGROUND GLOWS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-orange-600/5 blur-[200px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[0%] right-[-10%] w-[800px] h-[800px] bg-blue-600/5 blur-[200px] rounded-full" />
            </div>

            {/* HEADER / NAV */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-10 py-5 flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(249,115,22,0.3)]">F</div>
                        <span className="text-xl font-bold tracking-tighter text-white uppercase italic">Finova Wrapped</span>
                    </Link>
                    <div className="flex gap-1">
                        {Array.from({ length: totalSlides }).map((_, i) => (
                            <div key={i} className={`h-1 w-12 rounded-full transition-all duration-300 ${i + 1 === slide ? 'bg-orange-500' : 'bg-white/10'}`} />
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-full font-black text-[10px] hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-white/5 uppercase tracking-widest">
                        <Share2 size={12} /> Share My Story
                    </button>
                </div>
            </nav>

            {/* MAIN CAROUSEL */}
            <main className="relative z-10 flex items-center justify-center h-[calc(100vh-100px)] mt-24">
                <AnimatePresence mode="wait">
                    {slide === 1 && (
                        <motion.div key="s1" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}
                            className="text-center space-y-12"
                        >
                            <motion.div animate={{ rotate: [0, 360, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mx-auto p-6 shadow-2xl">
                                {wrappedStory.vibe_icon}
                            </motion.div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 italic">2026 Spending DNA</h4>
                                <h2 className="text-9xl font-black tracking-tighter uppercase italic leading-[0.8] text-white">The <br/> {wrappedStory.persona}.</h2>
                                <p className="text-gray-500 text-xl font-medium max-w-sm mx-auto leading-relaxed italic">You are a master of late-night impulse UPIs. Your wallet feels the burn.</p>
                            </div>
                        </motion.div>
                    )}

                    {slide === 2 && (
                        <motion.div key="s2" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}
                            className="text-center space-y-12"
                        >
                            <div className="w-40 h-40 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30 mx-auto shadow-xl shadow-blue-500/5">
                                {wrappedStory.big_leak_icon}
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-8xl font-black tracking-tighter uppercase italic text-whiteLEADING-[0.9]">The <br/><span className="text-blue-400">Big Leak.</span></h2>
                                <p className="text-gray-400 text-xl font-medium max-w-lg mx-auto leading-relaxed italic">
                                    You spent ₹{wrappedStory.big_leak_amount.toLocaleString()} on {wrappedStory.big_leak_cat}. That’s effectively <span className="text-white font-bold decoration-2 decoration-blue-500 underline">{wrappedStory.leak_impact}</span>.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {slide === 3 && (
                        <motion.div key="s3" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}
                            className="text-center space-y-12"
                        >
                            <div className="w-40 h-40 bg-orange-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/20 rotate-12">
                                <Target className="text-black" size={60} />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 italic">Financial Freedom Date</h4>
                                <h2 className="text-9xl font-black tracking-tighter uppercase italic leading-[0.8] text-white">{wrappedStory.freedom_date}</h2>
                                <p className="text-gray-500 text-xl font-medium max-w-sm mx-auto leading-relaxed italic">You are {wrappedStory.freedom_countdown} from total freedom. Keep the streak alive.</p>
                            </div>
                        </motion.div>
                    )}

                    {slide > totalSlides && (
                        <motion.div key="s_end" variants={slideVariants} initial="initial" animate="animate" transition={{ duration: 0.5 }}
                            className="text-center space-y-10"
                        >
                            <ShieldCheck className="text-amber-500 mx-auto" size={80} />
                            <h2 className="text-6xl font-black tracking-tighter uppercase italic text-white leading-tight">Your DNA <br/> is Secured.🛡️</h2>
                            <p className="text-gray-500 text-xl font-medium max-w-lg mx-auto leading-relaxed italic">
                                Finova wrapped isn't just a review; it’s a strategy. Return to your control center to improve your freedom trajectory.
                            </p>
                            <Link href="/dashboard" className="inline-block px-12 py-5 bg-amber-500 text-black rounded-full font-black text-xs hover:scale-105 transition-all uppercase tracking-[0.2em]">
                                Return to Control
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}