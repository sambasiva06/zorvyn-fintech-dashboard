import React from 'react';
import { motion } from 'framer-motion';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/formatters';
import { ShieldCheck, Nfc } from 'lucide-react';

export function CredVaultCard() {
  const { balance } = useFinance();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl metallic-glass-card shadow-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1c1c1e 0%, #0e0e11 100%)',
        boxShadow: '8px 12px 24px rgba(0,0,0,0.8), -2px -2px 10px rgba(255,255,255,0.05)'
      }}
    >
      {/* Texture noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10 text-white">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400">Total Vault Balance</p>
            <motion.h2 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-1 text-3xl md:text-5xl font-black tracking-tighter"
              style={{ color: 'var(--accent)' }}
            >
              {formatCurrency(balance)}
            </motion.h2>
          </div>
          <Nfc className="h-6 w-6 text-zinc-500 opacity-60" strokeWidth={1.5} />
        </div>

        {/* Footer / Card Details */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] font-mono tracking-widest text-zinc-500">**** **** **** 8824</p>
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-300">Zorvyn Black</p>
          </div>
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" style={{ color: 'var(--success)' }} />
            <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--success)' }}>Secured</span>
          </div>
        </div>
      </div>
      
      {/* Accent Edge */}
      <div className="absolute top-0 right-0 w-2 h-full" style={{ background: 'linear-gradient(to bottom, var(--accent) 0%, transparent 100%)', opacity: 0.8 }} />
    </motion.div>
  );
}
