import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Maximize } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export function ScanPay() {
  const { setCurrentView } = useFinance();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-md mx-auto w-full pt-4 h-[80vh] flex flex-col"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setCurrentView('Dashboard')} className="p-2 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-primary)]">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-widest uppercase">Scan QR</h1>
      </div>

      <div className="flex-1 relative rounded-3xl overflow-hidden border border-[var(--border-default)] flex items-center justify-center bg-black">
        {/* Fake Camera Viewfinder */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        
        {/* Scanner overlay */}
        <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 border-2 border-[var(--accent)] rounded-lg shadow-[0_0_0_1000px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--accent)] opacity-20 animation-scan" />
          <Maximize className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-[var(--accent)] opacity-50" />
        </div>
      </div>

      <p className="text-center text-xs font-bold text-[var(--text-muted)] tracking-widest uppercase mt-8">
        Align QR code within the frame to pay
      </p>
    </motion.div>
  );
}
