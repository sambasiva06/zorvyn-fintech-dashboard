import React from 'react';
import { Target, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/formatters';

export function SavingsGoal() {
  const { income, expenses } = useFinance();

  const saved = income - expenses;
  const goal = 200000; // ₹2,00,000 goal
  const progress = Math.min((saved / goal) * 100, 100);

  const status = progress >= 100 ? 'Completed!' : progress >= 50 ? 'On Track' : progress > 0 ? 'Building Up' : 'Get Started';
  const statusColor = progress >= 50 ? 'var(--success)' : progress > 0 ? 'var(--accent)' : 'var(--warning)';

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="bento-stat-label">Savings Goal</p>
          <motion.h3
            key={saved}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bento-stat-value-sm"
          >
            {formatCurrency(saved)}
          </motion.h3>
        </div>
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="p-2.5 rounded-xl"
          style={{ 
            backgroundColor: 'var(--accent-muted)', 
            color: 'var(--accent)',
            border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)'
          }}
        >
          <Target className="h-5 w-5" />
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="space-y-3">
        <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="h-full rounded-full relative"
            style={{ background: 'linear-gradient(90deg, var(--accent), #a78bfa)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse" />
          </motion.div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            {progress.toFixed(0)}% reached
          </span>
          <span className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>
            Goal: {formatCurrency(goal)}
          </span>
        </div>
      </div>

      {/* Status badge */}
      <div className="mt-4 flex items-center gap-2">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `color-mix(in srgb, ${statusColor} 12%, transparent)`, color: statusColor }}
        >
          <ArrowUpRight className="h-3 w-3 mr-0.5" />
          {status}
        </motion.span>
        <span className="text-[11px] font-medium" style={{ color: 'var(--text-faint)' }}>to hit target</span>
      </div>
    </div>
  );
}
