"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Loader2, Lock } from 'lucide-react';
import Image from 'next/image';

export default function VaulticAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [creds, setCreds] = useState({ username: '', password: '' });
    const [statusMsg, setStatusMsg] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSyncing(true);
        setStatusMsg(isLogin ? "VERIFYING IDENTITY..." : "ENCRYPTING DNA...");
        
        const endpoint = isLogin ? '/auth/login' : '/auth/signup';
        
        try {
            const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(creds)
            });
            
            const data = await res.json();

            if (res.ok) {
                if (isLogin) {
                    localStorage.setItem('finova_token', data.access_token);
                    setStatusMsg("VAULT SECURED. ACCESS GRANTED.");
                    setTimeout(() => router.push('/dashboard'), 800);
                } else {
                    setStatusMsg("IDENTITY CREATED. INITIALIZE LOGIN.");
                    setTimeout(() => { setIsLogin(true); setIsSyncing(false); setStatusMsg(""); }, 1500);
                }
            } else {
                setIsSyncing(false);
                setStatusMsg(data.detail || "IDENTIFICATION FAILED.");
            }
        } catch (error) {
            setIsSyncing(false);
            setStatusMsg("VAULT OFFLINE. RETRYING...");
        }
    };

    return (
        <div className="min-h-screen bg-vaultic-black flex items-center justify-center p-6 relative overflow-hidden">
            
            {/* NEURAL GLOW BACKGROUND */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-vaultic-orange/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-vaultic-mint/5 blur-[120px] rounded-full" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-vaultic-charcoal border border-white/10 p-12 rounded-[3.5rem] shadow-2xl relative z-10 backdrop-blur-3xl"
            >
                <div className="flex flex-col items-center mb-12 text-center">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-vaultic-orange blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="w-16 h-16 bg-vaultic-black border border-white/10 rounded-2xl flex items-center justify-center mb-8 relative z-10">
                            <Image src="/logo.png" alt="Logo" width={32} height={32} />
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white italic">
                        {isLogin ? 'Access Vault' : 'Create Identity'}
                    </h2>
                    
                    <div className="h-4 mt-4">
                        <AnimatePresence>
                            {statusMsg && (
                                <motion.p 
                                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                    className="text-vaultic-orange text-[9px] font-black uppercase tracking-[0.3em] italic"
                                >
                                    {statusMsg}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text" placeholder="IDENTITY_ID" required
                        className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-vaultic-orange text-white transition-all font-bold placeholder:text-gray-700 uppercase text-xs tracking-widest"
                        onChange={(e) => setCreds({...creds, username: e.target.value})}
                    />
                    <input 
                        type="password" placeholder="SECURE_KEY" required
                        className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-vaultic-orange text-white transition-all font-bold placeholder:text-gray-700 tracking-widest text-xs"
                        onChange={(e) => setCreds({...creds, password: e.target.value})}
                    />
                    
                    <button 
                        disabled={isSyncing}
                        className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-vaultic-orange hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 group mt-4 shadow-xl"
                    >
                        {isSyncing ? <Loader2 className="animate-spin" size={18} /> : (
                            <>
                                {isLogin ? 'INITIALIZE SYNC' : 'FINALIZE IDENTITY'}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                    <button 
                        onClick={() => { setIsLogin(!isLogin); setStatusMsg(""); }} 
                        className="text-gray-500 text-[10px] font-bold tracking-widest hover:text-vaultic-orange transition-colors uppercase"
                    >
                        {isLogin ? "No Identity? Register" : "Authorized Personnel? Login"}
                    </button>
                    
                    <div className="flex items-center gap-2 opacity-30">
                        <Lock size={10} />
                        <span className="text-[8px] font-black tracking-widest">AES-256 ENCRYPTED DNA</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}