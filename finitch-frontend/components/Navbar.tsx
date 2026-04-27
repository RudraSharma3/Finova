"use client"
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-vaultic-black/50 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo.png" alt="Vaultic Logo" width={32} height={32} className="group-hover:scale-110 transition-transform"/>
          <span className="text-xl font-extrabold tracking-tighter uppercase">Vaultic</span>
        </Link>
        
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/login" className="hover:text-vaultic-orange transition-colors">Log In</Link>
          <Link href="/login" className="bg-vaultic-orange text-white px-6 py-2.5 rounded-full font-bold hover:brightness-110 transition-all shadow-lg shadow-vaultic-orange/20">
            Build My Vault
          </Link>
        </div>
      </div>
    </nav>
  );
}