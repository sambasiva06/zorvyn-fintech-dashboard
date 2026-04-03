import React from 'react';
import { motion } from 'framer-motion';
import { BalanceTile, IncomeTile, ExpensesTile } from '../components/dashboard/SummaryCards';
import { BalanceChart } from '../components/dashboard/BalanceChart';
import { SpendingPieChart } from '../components/dashboard/SpendingPieChart';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { InsightsCards } from '../components/dashboard/InsightsCards';
import { SavingsGoal } from '../components/dashboard/SavingsGoal';
import { TrendingUp } from 'lucide-react';

export function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.06 }
    },
    exit: { opacity: 0, scale: 0.98, filter: 'blur(6px)', transition: { duration: 0.25, ease: 'easeIn' } }
  };

  const tileVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-8 w-full pb-10"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={tileVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Dashboard Overview
          </h1>
          <p className="text-sm mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>Track your financial health at a glance</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ backgroundColor: 'var(--success-muted)', border: '1px solid color-mix(in srgb, var(--success) 15%, transparent)' }}
        >
          <TrendingUp className="h-3.5 w-3.5" style={{ color: 'var(--success)' }} />
          <span className="text-xs font-bold" style={{ color: 'var(--success)' }}>Portfolio Up 12.5%</span>
        </motion.div>
      </motion.div>

      {/* Bento Grid */}
      <div className="bento-grid">

        {/* Row 1: Balance (hero 2-col) + Income */}
        <motion.div
          variants={tileVariants}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="bento-tile bento-hero group cursor-default"
        >
          <BalanceTile />
        </motion.div>

        <motion.div
          variants={tileVariants}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="bento-tile group cursor-default"
        >
          <IncomeTile />
        </motion.div>

        {/* Row 2: Expenses + Savings + Spending (tall) */}
        <motion.div
          variants={tileVariants}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="bento-tile group cursor-default"
        >
          <ExpensesTile />
        </motion.div>

        <motion.div
          variants={tileVariants}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="bento-tile group cursor-default"
        >
          <SavingsGoal />
        </motion.div>

        <motion.div
          variants={tileVariants}
          className="bento-tile bento-tall"
          style={{ padding: 0, minHeight: '420px' }}
        >
          <SpendingPieChart />
        </motion.div>

        {/* Row 3: Balance Chart (wide) */}
        <motion.div
          variants={tileVariants}
          className="bento-tile bento-wide"
          style={{ padding: 0, minHeight: '380px' }}
        >
          <BalanceChart />
        </motion.div>

        {/* Insights (full width) */}
        <motion.div variants={tileVariants} className="bento-full">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-5 w-1 rounded-full" style={{ background: 'linear-gradient(to bottom, var(--success), #14b8a6)' }} />
            <h2 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Quick Insights</h2>
          </div>
          <InsightsCards />
        </motion.div>

        {/* Transactions (full width) */}
        <motion.div variants={tileVariants} className="bento-full">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-5 w-1 rounded-full" style={{ background: 'linear-gradient(to bottom, var(--accent), #a78bfa)' }} />
            <h2 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Recent Transactions</h2>
          </div>
          <TransactionTable limit={5} />
        </motion.div>

      </div>
    </motion.div>
  );
}
