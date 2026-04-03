import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BalanceChart } from '../components/dashboard/BalanceChart';
import { SpendingPieChart } from '../components/dashboard/SpendingPieChart';
import { InsightsCards } from '../components/dashboard/InsightsCards';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatters';
import { PieChart, TrendingUp, TrendingDown } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.08 }
  },
  exit: { opacity: 0, scale: 0.98, filter: 'blur(6px)', transition: { duration: 0.25, ease: 'easeIn' } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  }
};

function BarChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl px-4 py-3 shadow-2xl"
        style={{ 
          backgroundColor: 'var(--bg-surface)', 
          border: '1px solid var(--border-hover)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 mb-0.5">
            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: p.color }} />
            <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{p.name}:</span>
            <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function Analytics() {
  const { monthlyData, income, expenses, categoryTotals } = useFinance();

  // Prepare bar chart data
  const barData = monthlyData.map(m => ({
    name: m.monthLabel,
    Income: m.income,
    Expenses: m.expenses,
  }));

  // Top 3 categories
  const topCategories = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <motion.div 
      className="flex flex-col gap-8 w-full pb-10"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent-muted)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}
          >
            <PieChart className="h-5 w-5" style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>Deep Analytics</h1>
            <p className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-muted)' }}>Comprehensive insights into your financial data</p>
          </div>
        </div>
      </motion.div>

      {/* Summary Stats Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-surface p-5 flex items-center gap-4">
          <div className="p-2.5 rounded-xl" style={{ backgroundColor: 'var(--success-muted)' }}>
            <TrendingUp className="h-5 w-5" style={{ color: 'var(--success)' }} />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Total Earned</p>
            <p className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(income)}</p>
          </div>
        </div>
        <div className="card-surface p-5 flex items-center gap-4">
          <div className="p-2.5 rounded-xl" style={{ backgroundColor: 'var(--danger-muted)' }}>
            <TrendingDown className="h-5 w-5" style={{ color: 'var(--danger)' }} />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Total Spent</p>
            <p className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(expenses)}</p>
          </div>
        </div>
        <div className="card-surface p-5 flex items-center gap-4">
          <div className="p-2.5 rounded-xl" style={{ backgroundColor: 'var(--accent-muted)' }}>
            <PieChart className="h-5 w-5" style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Top 3 Spending</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {topCategories.map(([cat]) => cat).join(', ')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-5 w-1 rounded-full" style={{ background: 'linear-gradient(to bottom, var(--success), #14b8a6)' }} />
          <h2 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Key Metrics</h2>
        </div>
        <InsightsCards />
      </motion.div>

      {/* Income vs Expenses Bar Chart */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-5 w-1 rounded-full" style={{ background: 'linear-gradient(to bottom, var(--warning), #f59e0b)' }} />
          <h2 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Income vs Expenses</h2>
        </div>
        <div className="card-surface p-6 md:p-8">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -12, bottom: 0 }} barGap={6}>
                <CartesianGrid strokeDasharray="4 6" stroke="var(--text-faint)" vertical={false} opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--text-muted)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  fontWeight={600}
                />
                <YAxis 
                  stroke="var(--text-muted)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  fontWeight={600}
                />
                <Tooltip content={<BarChartTooltip />} cursor={{ fill: 'rgba(139,92,246,0.05)', radius: 8 }} />
                <Legend 
                  wrapperStyle={{ paddingTop: 16, fontSize: 11, fontWeight: 600 }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar dataKey="Income" fill="#22c55e" radius={[6, 6, 0, 0]} maxBarSize={40} />
                <Bar dataKey="Expenses" fill="#ef4444" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-5 w-1 rounded-full" style={{ background: 'linear-gradient(to bottom, var(--accent), #a78bfa)' }} />
          <h2 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Visual Breakdown</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BalanceChart />
          <SpendingPieChart />
        </div>
      </motion.div>
    </motion.div>
  );
}
