import React from 'react';
import { motion } from 'framer-motion';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { ArrowLeftRight } from 'lucide-react';

export function TransactionsPage() {
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
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
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
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent-muted)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}
          >
            <ArrowLeftRight className="h-5 w-5" style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>Full Ledger</h1>
            <p className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-muted)' }}>Complete history of all transactions</p>
          </div>
        </div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <TransactionTable />
      </motion.div>
    </motion.div>
  );
}
