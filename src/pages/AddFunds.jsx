import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Plus } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export function AddFunds() {
  const { setCurrentView } = useFinance();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto w-full pt-4"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setCurrentView('Dashboard')} className="p-2 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-primary)]">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-widest uppercase">Add Funds</h1>
      </div>

      <div className="card-surface p-6 mb-6 flex flex-col items-center">
        <Building2 className="h-10 w-10 text-[var(--accent)] mb-4" />
        <h3 className="text-lg font-bold text-white mb-1">State Bank</h3>
        <p className="text-xs text-[var(--text-muted)] tracking-widest font-mono uppercase mb-6">xxxx xxxx xxxx 4029</p>
        
        <button className="w-full py-3 rounded-lg border-2 border-[var(--border-default)] font-bold text-xs uppercase tracking-widest hover:border-[var(--accent)] transition-colors text-white">
          Manage Bank Accounts
        </button>
      </div>

      <p className="text-xs font-bold text-[var(--text-muted)] tracking-widest uppercase mb-4 mt-8">Quick Select</p>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {['₹500', '₹1000', '₹5000'].map((amt) => (
          <button key={amt} className="p-4 rounded-xl border border-[var(--border-default)] text-[var(--text-primary)] font-bold hover:bg-[var(--bg-hover)]">
            {amt}
          </button>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all">
        <Plus className="h-4 w-4" /> Add to Vault
      </button>
    </motion.div>
  );
}
