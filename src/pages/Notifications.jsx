import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Gift, ArrowDownLeft, ShieldCheck } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const notifications = [
  { id: 1, type: 'reward', title: 'Cashback Earned!', desc: 'You earned ₹150 from your last Amazon purchase.', time: '2m ago', icon: Gift, color: 'var(--accent)' },
  { id: 2, type: 'credit', title: 'Funds Added', desc: '₹5,000 was successfully added to your Vault.', time: '1h ago', icon: ArrowDownLeft, color: 'var(--success)' },
  { id: 3, type: 'security', title: 'New Device Login', desc: 'Login detected from iPhone 14 Pro.', time: '1d ago', icon: ShieldCheck, color: 'var(--warning)' },
  { id: 4, type: 'alert', title: 'Action Required', desc: 'Please update your KYC documents before the 30th.', time: '2d ago', icon: Bell, color: 'var(--danger)' },
];

export function Notifications() {
  const { setCurrentView } = useFinance();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-md mx-auto w-full pt-4 h-full"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('Dashboard')} className="p-2 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-primary)]">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-widest uppercase">Alerts</h1>
        </div>
        <button className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest">Mark read</button>
      </div>

      <div className="space-y-4">
        {notifications.map((n, i) => (
          <motion.div 
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-xl card-surface"
          >
            <div className="p-2 rounded-lg shrink-0 mt-1" style={{ backgroundColor: 'var(--bg-elevated)' }}>
              <n.icon className="h-4 w-4" style={{ color: n.color }} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white tracking-tight">{n.title}</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">{n.desc}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-2" style={{ color: 'var(--text-faint)' }}>{n.time}</p>
            </div>
            
            {i === 0 && <span className="h-2 w-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--accent)' }} />}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
