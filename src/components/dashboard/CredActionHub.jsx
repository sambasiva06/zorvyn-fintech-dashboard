import React from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Send, Plus, CreditCard } from 'lucide-react';

const actions = [
  { id: 'scan', label: 'Scan N Pay', icon: ScanLine, color: 'var(--text-primary)' },
  { id: 'send', label: 'Send Money', icon: Send, color: 'var(--text-primary)' },
  { id: 'add', label: 'Add Funds', icon: Plus, color: 'var(--text-primary)' },
  { id: 'cards', label: 'My Cards', icon: CreditCard, color: 'var(--text-primary)' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

export function CredActionHub() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-xl mx-auto py-8"
    >
      {actions.map((act) => (
        <motion.button
          key={act.id}
          variants={itemVariants}
          whileTap={{ scale: 0.92 }}
          className="cred-action-btn aspect-square w-full relative group"
        >
          <act.icon 
            className="h-6 w-6 sm:h-8 sm:w-8 mb-2 transition-transform duration-300 group-hover:scale-110" 
            style={{ color: act.color }} 
            strokeWidth={1.5}
          />
          <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-center" style={{ color: 'var(--text-muted)' }}>
            {act.label}
          </span>
          
          {/* Subtle hover accent line */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'var(--accent)' }} />
        </motion.button>
      ))}
    </motion.div>
  );
}
