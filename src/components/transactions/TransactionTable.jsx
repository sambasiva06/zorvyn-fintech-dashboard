import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight, MoreHorizontal, Inbox, Trash2, ArrowUpDown, ChevronDown } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { AddTransactionForm } from './AddTransactionForm';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export function TransactionTable({ limit }) {
  const { transactions, role, deleteTransaction, sortConfig, setSortConfig } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Get unique categories from transactions
  const categories = useMemo(() => {
    const cats = [...new Set(transactions.map(t => t.category))];
    return cats.sort();
  }, [transactions]);

  // Filter
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchTerm, filterType, filterCategory]);

  // Sort
  const sortedTransactions = useMemo(() => {
    const sorted = [...filteredTransactions];
    sorted.sort((a, b) => {
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'desc' 
          ? new Date(b.date) - new Date(a.date) 
          : new Date(a.date) - new Date(b.date);
      }
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      }
      return 0;
    });
    return sorted;
  }, [filteredTransactions, sortConfig]);

  const displayedTransactions = limit ? sortedTransactions.slice(0, limit) : sortedTransactions;

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const SortIcon = ({ columnKey }) => (
    <ArrowUpDown 
      className="h-3 w-3 ml-1 inline-block transition-opacity"
      style={{ 
        opacity: sortConfig.key === columnKey ? 1 : 0.3,
        color: sortConfig.key === columnKey ? 'var(--accent)' : 'var(--text-faint)',
      }}
    />
  );

  if (loading) {
    return (
      <div className="card-surface p-8 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-40 rounded-lg skeleton-shimmer" />
          <div className="h-9 w-28 rounded-xl skeleton-shimmer" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3">
            <div className="h-9 w-9 rounded-xl skeleton-shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 rounded skeleton-shimmer" />
              <div className="h-3 w-24 rounded skeleton-shimmer" />
            </div>
            <div className="h-5 w-20 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="card-surface overflow-hidden flex flex-col gradient-border-animated"
    >
      {/* Header Controls */}
      <div 
        className="p-5 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        style={{ borderBottom: '1px solid var(--border-default)' }}
      >
        <div>
          <h3 className="text-lg font-bold tracking-tight flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            Recent Activity
            <span className="inline-flex h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)' }} />
          </h3>
          <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>Detailed log of your financial records</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search */}
          <div className="relative group/search">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 transition-colors duration-300"
              style={{ color: 'var(--text-faint)' }}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-48 pl-9 pr-3 py-2 rounded-xl text-xs font-medium transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-3 pr-8 py-2 rounded-xl text-xs font-medium transition-all duration-300 appearance-none cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
              }}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none" style={{ color: 'var(--text-faint)' }} />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-3 pr-8 py-2 rounded-xl text-xs font-medium transition-all duration-300 appearance-none cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
              }}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none" style={{ color: 'var(--text-faint)' }} />
          </div>
          
          {role === 'admin' && (
            <motion.button 
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold shadow-lg whitespace-nowrap text-white"
              style={{ 
                backgroundColor: 'var(--accent)',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
                border: '1px solid rgba(167, 139, 250, 0.3)'
              }}
            >
              + New
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[700px]" style={{ color: 'var(--text-secondary)' }}>
          <thead 
            className="text-[10px] font-bold uppercase tracking-widest sticky top-0 z-10"
            style={{ 
              backgroundColor: 'var(--bg-elevated)',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--border-default)'
            }}
          >
            <tr>
              <th className="px-6 py-3.5">Transaction</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Category</th>
              <th 
                className="px-6 py-3.5 text-right cursor-pointer select-none hover:text-[var(--accent)] transition-colors"
                onClick={() => handleSort('date')}
              >
                Date <SortIcon columnKey="date" />
              </th>
              <th 
                className="px-6 py-3.5 text-right cursor-pointer select-none hover:text-[var(--accent)] transition-colors"
                onClick={() => handleSort('amount')}
              >
                Amount <SortIcon columnKey="amount" />
              </th>
              {role === 'admin' && <th className="px-6 py-3.5 text-center w-12"></th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {displayedTransactions.length > 0 ? (
                displayedTransactions.map((t, index) => (
                  <motion.tr
                    key={t.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={rowVariants}
                    className={clsx(
                      "transaction-row-hover group/row",
                      index % 2 === 0 ? "transaction-row-even" : "transaction-row-odd"
                    )}
                    style={{ borderBottom: '1px solid var(--border-default)' }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: t.type === 'income' ? 5 : -5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                          className="h-9 w-9 rounded-xl flex items-center justify-center mr-3.5"
                          style={{
                            backgroundColor: t.type === 'income' ? 'var(--success-muted)' : 'var(--bg-elevated)',
                            color: t.type === 'income' ? 'var(--success)' : 'var(--text-muted)',
                          }}
                        >
                          {t.type === 'income' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        </motion.div>
                        <div>
                          <p className="font-semibold transition-colors duration-200" style={{ color: 'var(--text-primary)' }}>{t.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg"
                        style={{
                          backgroundColor: t.type === 'income' ? 'var(--success-muted)' : 'var(--bg-elevated)',
                          color: t.type === 'income' ? 'var(--success)' : 'var(--text-muted)',
                        }}
                      >
                        <span 
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: t.type === 'income' ? 'var(--success)' : 'var(--text-faint)' }}
                        />
                        {t.type === 'income' ? 'Received' : 'Settled'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg"
                        style={{ 
                          backgroundColor: 'var(--bg-elevated)',
                          color: 'var(--text-secondary)', 
                          border: '1px solid var(--border-default)' 
                        }}
                      >
                        {t.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      {formatDate(t.date)}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-base tracking-tight">
                      <span className="inline-flex items-center" style={{ color: t.type === 'income' ? 'var(--success)' : 'var(--text-primary)' }}>
                        <span className="text-xs mr-0.5" style={{ color: t.type === 'income' ? 'var(--success)' : 'var(--text-muted)', opacity: 0.7 }}>
                          {t.type === 'income' ? '+' : '−'}
                        </span>
                        {formatCurrency(t.amount)}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td className="px-6 py-4 text-center">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteTransaction(t.id)}
                          className="p-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover/row:opacity-100"
                          style={{ color: 'var(--danger)' }}
                          title="Delete transaction"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </motion.button>
                      </td>
                    )}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={role === 'admin' ? 6 : 5} className="px-8 py-16 text-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center"
                    >
                      <div 
                        className="p-5 rounded-2xl mb-5 shadow-xl"
                        style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
                      >
                        <Inbox className="h-8 w-8" style={{ color: 'var(--text-faint)' }} />
                      </div>
                      <h4 className="font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>No transactions found</h4>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                        {searchTerm || filterType !== 'all' || filterCategory !== 'all' 
                          ? 'Try adjusting your filters or search terms.'
                          : 'Add your first transaction to get started.'}
                      </p>
                    </motion.div>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <AddTransactionForm onClose={() => setShowAddForm(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
