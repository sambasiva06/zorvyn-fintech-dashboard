import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/formatters';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

function AnimatedValue({ value, large }) {
  return (
    <motion.h3
      key={value}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={large ? 'bento-stat-value' : 'bento-stat-value-sm'}
    >
      {value}
    </motion.h3>
  );
}

function StatCard({ card, index, large }) {
  const colorMap = {
    violet: { accent: 'var(--accent)', muted: 'var(--accent-muted)', glow: 'rgba(139,92,246,0.1)' },
    emerald: { accent: 'var(--success)', muted: 'var(--success-muted)', glow: 'rgba(34,197,94,0.1)' },
    rose: { accent: 'var(--danger)', muted: 'var(--danger-muted)', glow: 'rgba(239,68,68,0.1)' },
  };
  const colors = colorMap[card.color] || colorMap.violet;

  return (
    <>


      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="bento-stat-label">{card.title}</p>
          <AnimatedValue value={card.value} large={large} />
        </div>
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ rotate: 8, scale: 1.15 }}
          className="p-2.5 rounded-xl transition-all duration-300"
          style={{ 
            backgroundColor: colors.muted, 
            color: colors.accent,
            border: `1px solid color-mix(in srgb, ${colors.accent} 20%, transparent)`,
          }}
        >
          <card.icon className="h-5 w-5" />
        </motion.div>
      </div>

      <div className={clsx("flex items-center relative z-10", large ? "mt-6" : "mt-4")}>
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full mr-2"
          style={{
            backgroundColor: card.trendUp ? 'var(--success-muted)' : 'var(--danger-muted)',
            color: card.trendUp ? 'var(--success)' : 'var(--danger)',
          }}
        >
          {card.trendUp ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
          {card.trend}
        </motion.span>
        <span className="text-[11px] font-medium" style={{ color: 'var(--text-faint)' }}>vs last month</span>
      </div>
    </>
  );
}

export function SummaryCards() {
  const { income, expenses, balance, incomeChange, expenseChange } = useFinance();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(balance),
      icon: Wallet,
      trend: `${Math.abs(((income - expenses) / (income || 1)) * 100).toFixed(1)}%`,
      trendUp: balance > 0,
      color: 'violet',
    },
    {
      title: 'Total Income',
      value: formatCurrency(income),
      icon: TrendingUp,
      trend: `${incomeChange >= 0 ? '+' : ''}${incomeChange.toFixed(1)}%`,
      trendUp: incomeChange >= 0,
      color: 'emerald',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(expenses),
      icon: TrendingDown,
      trend: `${expenseChange >= 0 ? '+' : ''}${expenseChange.toFixed(1)}%`,
      trendUp: expenseChange < 0,
      color: 'rose',
    }
  ];

  if (loading) {
    return { loading: true, cards: [] };
  }

  return { loading: false, cards };
}

// Individual tile components for bento grid
export function BalanceTile() {
  const data = SummaryCards();
  if (data.loading) {
    return (
      <div className="space-y-3">
        <div className="h-3 w-24 rounded skeleton-shimmer" />
        <div className="h-8 w-40 rounded skeleton-shimmer" />
        <div className="h-4 w-20 rounded-full skeleton-shimmer mt-4" />
      </div>
    );
  }
  return <div className="group h-full"><StatCard card={data.cards[0]} index={0} large={true} /></div>;
}

export function IncomeTile() {
  const data = SummaryCards();
  if (data.loading) {
    return (
      <div className="space-y-3">
        <div className="h-3 w-24 rounded skeleton-shimmer" />
        <div className="h-7 w-32 rounded skeleton-shimmer" />
        <div className="h-4 w-20 rounded-full skeleton-shimmer mt-4" />
      </div>
    );
  }
  return <div className="group h-full"><StatCard card={data.cards[1]} index={1} large={false} /></div>;
}

export function ExpensesTile() {
  const data = SummaryCards();
  if (data.loading) {
    return (
      <div className="space-y-3">
        <div className="h-3 w-24 rounded skeleton-shimmer" />
        <div className="h-7 w-32 rounded skeleton-shimmer" />
        <div className="h-4 w-20 rounded-full skeleton-shimmer mt-4" />
      </div>
    );
  }
  return <div className="group h-full"><StatCard card={data.cards[2]} index={2} large={false} /></div>;
}
