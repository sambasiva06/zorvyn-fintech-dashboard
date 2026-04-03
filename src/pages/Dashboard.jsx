import React from 'react';
import { motion } from 'framer-motion';
import { CredVaultCard } from '../components/dashboard/CredVaultCard';
import { CredActionHub } from '../components/dashboard/CredActionHub';
import { BalanceChart } from '../components/dashboard/BalanceChart';
import { SpendingPieChart } from '../components/dashboard/SpendingPieChart';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { InsightsCards } from '../components/dashboard/InsightsCards';
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
      <motion.div variants={tileVariants} className="flex justify-center w-full pt-2 pb-6">
        <h1 className="text-xl md:text-2xl font-extrabold tracking-[0.15em] uppercase" style={{ color: 'var(--text-faint)' }}>
          Finance Flow
        </h1>
      </motion.div>

      {/* Structural Vertical Feed */}
      <div className="flex flex-col gap-6 md:gap-10 items-center justify-center w-full max-w-4xl mx-auto">
        
        {/* Core Financial Vault */}
        <CredVaultCard />
        
        {/* Tactical Actions */}
        <CredActionHub />

        {/* Transactions Layer */}
        <motion.div variants={tileVariants} className="w-full mt-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--text-primary)' }}>Recent Activity</h2>
            <button className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--accent)' }}>View All</button>
          </div>
          <TransactionTable limit={5} />
        </motion.div>

        {/* Analytics Section */}
        <motion.div variants={tileVariants} className="w-full mt-6">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--text-primary)' }}>Analytics</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-surface" style={{ padding: 0, minHeight: '400px' }}>
              <BalanceChart />
            </div>
            <div className="card-surface" style={{ padding: 0, minHeight: '400px' }}>
              <SpendingPieChart />
            </div>
          </div>
        </motion.div>

        {/* Insights Summary */}
        <motion.div variants={tileVariants} className="w-full mt-2">
          <InsightsCards />
        </motion.div>

      </div>
    </motion.div>
  );
}
