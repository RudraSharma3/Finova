"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DNACalibrator({ onComplete }: { onComplete: (dna: any) => void }) {
    const [step, setStep] = useState(1);
    const [dna, setDna] = useState({
        monthly_income: '',
        fixed_expenses: '',
        primary_goal: 'Financial Freedom',
        goal_amount: '5000000'
    });

    const goals = [
        { id: 'Financial Freedom', icon: CheckCircle2, label: 'FIRE / Freedom' },
        { id: 'Luxury Travel', icon: Target, label: 'World Tour' },
        { id: 'Elite Asset', icon: TrendingUp, label: 'Real Estate/Car' },
    ];

    const nextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            onComplete(dna);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-xl w-full bg-[#0d0d0d] border border-white/10 p-12 rounded-[3.5rem] shadow-[0_0_100px_rgba(255,69,0,0.1)]"
            >
                {/* Step Indicator */}
                <div className="flex gap-2 mb-12 justify-center">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#FF4500] shadow-[0_0_15px_#FF4500]' : 'bg-white/10'}`} />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-8 text-center">
                            <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-white">Map Your <br/><span className="text-[#FF4500]">Fuel Source.</span></h2>
                            <p className="text-gray-500 text-sm font-medium">What is your total monthly inflow (post-tax)?</p>
                            <input 
                                type="number" placeholder="₹ MONTHLY_INCOME"
                                className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl outline-none focus:border-[#FF4500] text-center text-3xl font-black italic tracking-tighter text-white"
                                value={dna.monthly_income} onChange={(e) => setDna({...dna, monthly_income: e.target.value})}
                            />
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-8 text-center">
                            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none">Calculate <br/><span className="text-[#FF4500]">System Drag.</span></h2>
                            <p className="text-gray-500 text-sm font-medium">Rent, EMIs, and Survival costs.</p>
                            <input 
                                type="number" placeholder="₹ FIXED_DRAG"
                                className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl outline-none focus:border-[#FF4500] text-center text-3xl font-black italic tracking-tighter text-white"
                                value={dna.fixed_expenses} onChange={(e) => setDna({...dna, fixed_expenses: e.target.value})}
                            />
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-8 text-center">
                            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none">Set Your <br/><span className="text-[#FF4500]">Target Hub.</span></h2>
                            <div className="grid grid-cols-1 gap-3">
                                {goals.map((g) => (
                                    <button 
                                        key={g.id}
                                        type="button"
                                        onClick={() => setDna({...dna, primary_goal: g.id})}
                                        className={`p-6 rounded-3xl border transition-all flex items-center justify-between group ${dna.primary_goal === g.id ? 'bg-[#FF4500] border-[#FF4500] text-white shadow-xl' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <g.icon size={24} />
                                            <span className="font-bold uppercase tracking-widest text-xs">{g.label}</span>
                                        </div>
                                        <ArrowRight size={18} className={dna.primary_goal === g.id ? 'opacity-100' : 'opacity-0'} />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button 
                    onClick={nextStep}
                    disabled={step < 3 ? (!dna.monthly_income && step === 1) || (!dna.fixed_expenses && step === 2) : false}
                    className="w-full mt-12 bg-white text-black py-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-[#FF4500] hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-20"
                >
                    {step === 3 ? 'Sync Financial DNA' : 'Next Signal'}
                    <ArrowRight size={18} />
                </button>
            </motion.div>
        </div>
    );
}