import React, { useState } from 'react';
import { X, Check, Shield } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { spendCategories } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export function AddTransactionForm({ onClose }) {
  const { addTransaction } = useFinance();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(spendCategories[0]);
  const [type, setType] = useState('expense');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) return setError('Please enter a description');
    if (!amount || parseFloat(amount) <= 0) return setError('Amount must be greater than 0');
    if (!date) return setError('Please select a date');
    
    addTransaction({
      description,
      amount: parseFloat(amount),
      date,
      category,
      type,
    });
    
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(9, 9, 11, 0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="card-surface w-full max-w-lg overflow-hidden shadow-2xl"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6"
          style={{ borderBottom: '1px solid var(--border-default)', backgroundColor: 'var(--bg-elevated)' }}
        >
          <div className="flex items-center">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className="h-9 w-9 rounded-xl flex items-center justify-center mr-3"
              style={{ backgroundColor: 'var(--accent-muted)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}
            >
              <Shield className="h-4 w-4" style={{ color: 'var(--accent)' }} />
            </motion.div>
            <div>
              <h2 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>New Entry</h2>
              <p className="text-[10px] uppercase font-bold tracking-widest mt-0.5" style={{ color: 'var(--text-muted)' }}>Admin privilege required</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="h-8 w-8 rounded-full flex items-center justify-center transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <X className="h-4 w-4" />
          </motion.button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
                style={{ backgroundColor: 'var(--danger-muted)', color: 'var(--danger)', border: '1px solid color-mix(in srgb, var(--danger) 20%, transparent)' }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--danger)' }} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Type Toggle */}
          <div 
            className="p-1 rounded-xl flex gap-1"
            style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
          >
            <motion.button
              type="button"
              onClick={() => setType('expense')}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 relative"
              style={{ color: type === 'expense' ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              {type === 'expense' && (
                <motion.div 
                  layoutId="type-bg"
                  className="absolute inset-0 rounded-lg shadow-lg"
                  style={{ backgroundColor: 'var(--bg-hover)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">Expense</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setType('income')}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 relative"
              style={{ color: type === 'income' ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              {type === 'income' && (
                <motion.div 
                  layoutId="type-bg"
                  className="absolute inset-0 rounded-lg shadow-lg"
                  style={{ backgroundColor: 'var(--bg-hover)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">Income</span>
            </motion.button>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: 'var(--text-muted)' }}>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
                className="w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)',
                }}
                placeholder="e.g. Swiggy Order"
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: 'var(--text-muted)' }}>Amount (₹)</label>
                <input
                  type="number"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="0"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: 'var(--text-muted)' }}>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 [color-scheme:dark]"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: 'var(--text-muted)' }}>Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {spendCategories.map(c => (
                    <option key={c} value={c} style={{ backgroundColor: 'var(--bg-surface)' }}>{c}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }}>
                  <Check className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex gap-3 pt-2">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-6 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
              style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-6 rounded-xl text-xs font-bold text-white tracking-widest uppercase transition-all duration-300"
              style={{ 
                background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
                border: '1px solid rgba(167, 139, 250, 0.3)'
              }}
            >
              Confirm
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
