import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/formatters';
import { motion } from 'framer-motion';

// Custom dot that's always visible
function ChartDot({ cx, cy, payload, index }) {
  return (
    <g>
      {/* Outer glow ring */}
      <circle cx={cx} cy={cy} r={6} fill="var(--accent)" opacity="0.1" stroke="none" />
      {/* Main dot */}
      <circle cx={cx} cy={cy} r={3.5} fill="var(--accent)" stroke="var(--bg-base)" strokeWidth={2} />
    </g>
  );
}

// Active dot on hover — larger and glowing
function ActiveDot({ cx, cy, payload }) {
  return (
    <g>
      {/* Pulse ring */}
      <circle cx={cx} cy={cy} r={14} fill="var(--accent)" stroke="none">
        <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.1;0.05;0.1" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Glow */}
      <circle cx={cx} cy={cy} r={8} fill="var(--accent)" opacity="0.15" stroke="none" />
      {/* Main dot */}
      <circle cx={cx} cy={cy} r={5} fill="var(--accent)" stroke="var(--bg-base)" strokeWidth={2} />
    </g>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="rounded-xl px-5 py-3.5 shadow-2xl"
        style={{ 
          backgroundColor: 'var(--bg-surface)', 
          border: '1px solid var(--border-hover)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.1)'
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
        <p className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(payload[0].value)}</p>
        <p className="text-[10px] font-medium mt-1" style={{ color: 'var(--accent)' }}>Cumulative balance</p>
      </motion.div>
    );
  }
  return null;
}

export function BalanceChart() {
  const { balanceTrend } = useFinance();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const chartData = balanceTrend.map((m) => ({
    name: m.monthLabel,
    balance: m.cumulativeBalance,
  }));

  const filteredData = period === '3m' ? chartData.slice(-3) : period === '6m' ? chartData.slice(-6) : chartData;

  // Calculate average for reference line
  const avgBalance = filteredData.length > 0 
    ? Math.round(filteredData.reduce((sum, d) => sum + d.balance, 0) / filteredData.length) 
    : 0;

  if (loading) {
    return (
      <div className="h-[400px] card-surface p-8 space-y-6">
        <div className="space-y-2">
          <div className="h-5 w-36 rounded skeleton-shimmer" />
          <div className="h-3 w-56 rounded skeleton-shimmer" />
        </div>
        <div className="h-[280px] rounded-2xl skeleton-shimmer" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="card-surface p-6 md:p-8 h-full flex flex-col group gradient-border-animated"
    >
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Balance Trend</h3>
          <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>Net balance progression from transactions</p>
        </div>
        <div className="flex items-center gap-1 p-0.5 rounded-lg" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
          {['3m', '6m', 'all'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all duration-200"
              style={{
                backgroundColor: period === p ? 'var(--accent-muted)' : 'transparent',
                color: period === p ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              {p === 'all' ? 'All' : p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.0}/>
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent)"/>
                <stop offset="100%" stopColor="var(--success)"/>
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid 
              strokeDasharray="4 6" 
              stroke="var(--text-faint)" 
              vertical={false} 
              opacity={0.25} 
            />
            {/* Average reference line */}
            <ReferenceLine 
              y={avgBalance} 
              stroke="var(--text-faint)" 
              strokeDasharray="8 4" 
              strokeWidth={1}
              opacity={0.5}
              label={{ 
                value: 'Avg', 
                position: 'right',
                fill: 'var(--text-faint)',
                fontSize: 10,
                fontWeight: 600,
              }}
            />
            <XAxis 
              dataKey="name" 
              stroke="var(--text-muted)" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
              fontWeight={600}
            />
            <YAxis 
              stroke="var(--text-muted)" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              dx={-5}
              fontWeight={600}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ 
                stroke: 'var(--accent)', 
                strokeWidth: 1, 
                strokeDasharray: '4 4',
                opacity: 0.4
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="url(#strokeGradient)"
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
              dot={<ChartDot />}
              activeDot={<ActiveDot />}
              style={{ filter: 'url(#neonGlow)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
