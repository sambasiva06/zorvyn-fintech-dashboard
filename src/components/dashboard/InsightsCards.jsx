import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Award, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, getFullMonthName } from '../../utils/formatters';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const insightVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export function InsightsCards() {
  const { 
    transactions, income, expenses, 
    categoryTotals, 
    currentMonthData, previousMonthData,
    incomeChange, expenseChange,
    currentMonth, previousMonth
  } = useFinance();

  // Highest spending category
  let highestCategory = 'N/A';
  let highestAmount = 0;
  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  });

  // Savings ratio
  const savingsRatio = income > 0 ? ((income - expenses) / income) * 100 : 0;
  
  let healthText = 'Neutral';
  let healthColor = 'var(--text-muted)';
  if (savingsRatio > 20) { healthText = 'Excellent'; healthColor = 'var(--success)'; }
  else if (savingsRatio > 0) { healthText = 'On Track'; healthColor = 'var(--accent)'; }
  else { healthText = 'Overbudget'; healthColor = 'var(--danger)'; }

  // Month labels
  const currentMonthLabel = currentMonth ? getFullMonthName(currentMonth + '-01') : 'Current';
  const previousMonthLabel = previousMonth ? getFullMonthName(previousMonth + '-01') : 'Previous';

  const insights = [
    {
      title: 'Top Expense',
      value: highestCategory,
      subValue: `Spent ${formatCurrency(highestAmount)}`,
      icon: AlertCircle,
      iconColor: 'var(--accent)',
      iconBg: 'var(--accent-muted)',
    },
    {
      title: 'Monthly Comparison',
      value: `${expenseChange >= 0 ? '+' : ''}${expenseChange.toFixed(1)}% spending`,
      subValue: `${currentMonthLabel} vs ${previousMonthLabel}`,
      icon: BarChart3,
      iconColor: expenseChange > 0 ? 'var(--danger)' : 'var(--success)',
      iconBg: expenseChange > 0 ? 'var(--danger-muted)' : 'var(--success-muted)',
      isComparison: true,
    },
    {
      title: 'Health Score',
      value: healthText,
      subValue: `${savingsRatio.toFixed(0)}% savings rate`,
      icon: Award,
      iconColor: healthColor,
      iconBg: savingsRatio > 20 ? 'var(--success-muted)' : savingsRatio > 0 ? 'var(--accent-muted)' : 'var(--danger-muted)',
    },
    {
      title: 'Income Trend',
      value: `${incomeChange >= 0 ? '+' : ''}${incomeChange.toFixed(1)}%`,
      subValue: `${currentMonthLabel} earnings`,
      icon: incomeChange >= 0 ? TrendingUp : TrendingDown,
      iconColor: incomeChange >= 0 ? 'var(--success)' : 'var(--danger)',
      iconBg: incomeChange >= 0 ? 'var(--success-muted)' : 'var(--danger-muted)',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {insights.map((item, idx) => (
        <motion.div 
          key={idx}
          custom={idx}
          initial="hidden"
          animate="visible"
          variants={insightVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="card-surface p-5 flex items-start gap-4 group cursor-default"
        >
          <motion.div 
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
            whileHover={{ rotate: 8, scale: 1.1 }}
            className="p-2.5 rounded-xl flex-shrink-0"
            style={{ 
              backgroundColor: item.iconBg,
              border: `1px solid color-mix(in srgb, ${item.iconColor} 15%, transparent)`
            }}
          >
            <item.icon className="h-4 w-4" style={{ color: item.iconColor }} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-1" style={{ color: 'var(--text-muted)' }}>{item.title}</p>
            <motion.h4 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-bold tracking-tight truncate"
              style={{ color: item.isComparison ? item.iconColor : 'var(--text-primary)' }}
            >
              {item.value}
            </motion.h4>
            <p className="text-[10px] font-medium mt-0.5" style={{ color: 'var(--text-faint)' }}>{item.subValue}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
