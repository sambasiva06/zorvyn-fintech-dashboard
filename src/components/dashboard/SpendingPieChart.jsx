import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/formatters';
import { motion, AnimatePresence } from 'framer-motion';

const STATIC_COLORS = ['#8b5cf6', '#22c55e', '#f59e0b', '#ef4444', '#0ea5e9', '#ec4899', '#14b8a6'];

// Custom active shape that highlights on hover without overlapping center
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={1}
        style={{ filter: `drop-shadow(0 0 8px ${fill}40)`, transition: 'all 0.3s ease' }}
      />
    </g>
  );
};

const legendItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.8 + i * 0.1, duration: 0.35 }
  })
};

export function SpendingPieChart() {
  const { categoryTotals } = useFinance();
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  const data = Object.entries(categoryTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const displayData = data.length > 0 ? data : [{ name: 'No Data', value: 1 }];
  const totalSpend = data.reduce((a, b) => a + b.value, 0);

  if (loading) {
    return (
      <div className="card-surface p-8 space-y-6" style={{ minHeight: '460px' }}>
        <div className="space-y-2">
          <div className="h-5 w-40 rounded skeleton-shimmer" />
          <div className="h-3 w-52 rounded skeleton-shimmer" />
        </div>
        <div className="flex items-center justify-center flex-1">
          <div className="h-48 w-48 rounded-full skeleton-shimmer" />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="card-surface p-6 md:p-8 flex flex-col gradient-border-animated"
      style={{ minHeight: '460px' }}
    >
      <div className="mb-2">
        <h3 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Spending Breakdown</h3>
        <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>Expenses by category</p>
      </div>
      
      {/* Chart area — fixed height to prevent cutoff */}
      <div className="relative" style={{ height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={82}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={1000}
              animationEasing="ease-out"
              activeIndex={hoveredIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              {displayData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={data.length > 0 ? STATIC_COLORS[index % STATIC_COLORS.length] : 'var(--bg-elevated)'}
                  opacity={hoveredIndex === -1 || hoveredIndex === index ? 1 : 0.3}
                  style={{ transition: 'opacity 0.3s ease', cursor: 'pointer' }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center label — stays visible and never overlapped */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-center"
          >
            <p className="text-[9px] uppercase font-bold tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Total</p>
            <AnimatePresence mode="wait">
              <motion.p 
                key={hoveredIndex === -1 ? 'total' : displayData[hoveredIndex]?.name}
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-extrabold mt-0.5"
                style={{ color: 'var(--text-primary)' }}
              >
                {hoveredIndex >= 0 && displayData[hoveredIndex]
                  ? formatCurrency(displayData[hoveredIndex].value)
                  : formatCurrency(totalSpend)}
              </motion.p>
            </AnimatePresence>
            {hoveredIndex >= 0 && displayData[hoveredIndex] && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[9px] font-semibold mt-0.5"
                style={{ color: STATIC_COLORS[hoveredIndex % STATIC_COLORS.length] }}
              >
                {displayData[hoveredIndex].name}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Legend with percentages */}
      <div className="mt-4 space-y-2.5 flex-1">
        {data.slice(0, 5).map((entry, index) => {
          const percentage = totalSpend > 0 ? ((entry.value / totalSpend) * 100).toFixed(1) : 0;
          const isHovered = hoveredIndex === index;
          return (
            <motion.div 
              key={entry.name}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={legendItemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center text-xs cursor-pointer group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <motion.span 
                animate={{ scale: isHovered ? 1.4 : 1 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="w-2.5 h-2.5 rounded-sm mr-2.5 flex-shrink-0" 
                style={{ backgroundColor: STATIC_COLORS[index % STATIC_COLORS.length] }}
              />
              <span 
                className="flex-1 font-medium transition-colors duration-200"
                style={{ color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              >
                {entry.name}
              </span>
              <div className="flex items-center gap-2">
                <motion.span 
                  animate={{ opacity: isHovered ? 1 : 0, width: isHovered ? 'auto' : 0 }}
                  className="text-[10px] font-medium overflow-hidden whitespace-nowrap"
                  style={{ color: 'var(--text-faint)' }}
                >
                  {formatCurrency(entry.value)}
                </motion.span>
                <span className="font-bold tabular-nums w-12 text-right" style={{ color: isHovered ? STATIC_COLORS[index % STATIC_COLORS.length] : 'var(--text-muted)' }}>
                  {percentage}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
