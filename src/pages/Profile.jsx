import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Settings, Key, HelpCircle, LogOut } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const menuItems = [
  { icon: Shield, label: 'Security Center', color: 'var(--success)' },
  { icon: Key, label: 'API Keys', color: 'var(--info)' },
  { icon: Settings, label: 'Preferences', color: 'var(--text-primary)' },
  { icon: HelpCircle, label: 'Help & Support', color: 'var(--warning)' },
];

export function Profile() {
  const { role, changeRole } = useFinance();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto w-full pt-8 pb-10"
    >
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="h-24 w-24 rounded-full overflow-hidden mb-4 border-2 p-1" style={{ borderColor: 'var(--accent)' }}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80"
            alt="User profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-black text-white">John Doe</h2>
        <p className="text-sm font-bold text-[var(--accent)] tracking-[0.2em] uppercase mt-1">Zorvyn Black Tier</p>
        <p className="text-[10px] text-[var(--text-muted)] font-mono mt-2">ID: ZRVN-88492-X</p>
      </div>

      <div className="card-surface p-4 mb-8">
        <div className="flex items-center justify-between pb-4 mb-4" style={{ borderBottom: '1px solid var(--border-default)' }}>
          <span className="text-xs font-bold text-white uppercase tracking-widest">Active Role</span>
          <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>{role.toUpperCase()}</span>
        </div>
        
        <p className="text-[10px] text-[var(--text-muted)] mb-4 uppercase tracking-widest text-center">Switch Role for Testing</p>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => changeRole('viewer')} className="py-2 text-xs font-bold border border-[var(--border-default)] rounded-md text-white hover:bg-[var(--bg-hover)]">Viewer</button>
          <button onClick={() => changeRole('admin')} className="py-2 text-xs font-bold bg-[var(--accent)] text-white rounded-md hover:brightness-110">Admin</button>
        </div>
      </div>

      <div className="space-y-2 mb-8">
        {menuItems.map((item, idx) => (
          <button key={idx} className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--bg-hover)] rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 justify-center flex items-center rounded-lg" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                <item.icon className="h-4 w-4" style={{ color: item.color }} />
              </div>
              <span className="text-sm font-bold text-white">{item.label}</span>
            </div>
            <span className="text-[var(--text-muted)]">›</span>
          </button>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl text-red-500 font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors">
        <LogOut className="h-4 w-4" /> Sign Out
      </button>
    </motion.div>
  );
}
