import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wifi, WifiOff, Eye, EyeOff, Lock, ArrowUpRight, ArrowDownRight, Plus, Settings, Snowflake } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '../utils/formatters';

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

// Mock cards data
const cardsData = [
  {
    id: 1,
    type: 'Visa',
    name: 'Pulse Platinum',
    number: '4921 •••• •••• 7834',
    expiry: '09/28',
    balance: 85400,
    limit: 200000,
    color: 'linear-gradient(135deg, #7c3aed, #4c1d95)',
    active: true,
  },
  {
    id: 2,
    type: 'Mastercard',
    name: 'Pulse Rewards',
    number: '5412 •••• •••• 3156',
    expiry: '03/27',
    balance: 22750,
    limit: 100000,
    color: 'linear-gradient(135deg, #059669, #064e3b)',
    active: true,
  },
  {
    id: 3,
    type: 'Rupay',
    name: 'Pulse Basic',
    number: '6522 •••• •••• 9041',
    expiry: '11/26',
    balance: 5200,
    limit: 50000,
    color: 'linear-gradient(135deg, #334155, #0f172a)',
    active: false,
  },
];

const recentCardTransactions = [
  { id: 1, desc: 'Amazon India', amount: 3499, type: 'expense', card: 'Platinum', date: '2 Apr' },
  { id: 2, desc: 'Flipkart', amount: 1299, type: 'expense', card: 'Rewards', date: '1 Apr' },
  { id: 3, desc: 'Myntra', amount: 2199, type: 'expense', card: 'Platinum', date: '30 Mar' },
  { id: 4, desc: 'Card Payment', amount: 15000, type: 'income', card: 'Platinum', date: '28 Mar' },
];

function CardVisual({ card, isSelected, onSelect }) {
  const [showNumber, setShowNumber] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(card.id)}
      className="cursor-pointer relative group"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="rounded-2xl p-6 relative overflow-hidden h-48 flex flex-col justify-between"
        style={{ 
          background: card.color,
          border: isSelected ? '2px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: isSelected 
            ? '0 20px 60px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(255,255,255,0.1)' 
            : '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ backgroundColor: 'white' }} />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl opacity-10" style={{ backgroundColor: 'white' }} />
        
        {/* Top row */}
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{card.type}</p>
            <p className="text-white font-bold text-sm mt-0.5">{card.name}</p>
          </div>
          <div className="flex items-center gap-1.5">
            {card.active ? (
              <Wifi className="h-4 w-4 text-white/50" />
            ) : (
              <WifiOff className="h-4 w-4 text-white/30" />
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); setShowNumber(!showNumber); }}
              className="text-white/50 hover:text-white transition-colors"
            >
              {showNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </motion.button>
          </div>
        </div>

        {/* Card number */}
        <div className="relative z-10">
          <p className="text-white font-mono text-lg tracking-[0.15em] font-medium">
            {showNumber ? card.number.replace(/••••/g, '4829') : card.number}
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-end relative z-10">
          <div>
            <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Expires</p>
            <p className="text-white/80 text-xs font-bold">{card.expiry}</p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Balance</p>
            <p className="text-white font-bold text-sm">{formatCurrency(card.balance)}</p>
          </div>
        </div>

        {/* Inactive overlay */}
        {!card.active && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl z-20">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
              <Lock className="h-3.5 w-3.5 text-white/70" />
              <span className="text-white/70 text-xs font-bold">Frozen</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function QuickAction({ icon: Icon, label, color }) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all"
      style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
    >
      <div className="p-2.5 rounded-xl" style={{ backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)` }}>
        <Icon className="h-4.5 w-4.5" style={{ color }} />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </motion.button>
  );
}

export function CardsPage() {
  const [selectedCard, setSelectedCard] = useState(1);
  const selected = cardsData.find(c => c.id === selectedCard);

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
            <CreditCard className="h-5 w-5" style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>My Cards</h1>
            <p className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-muted)' }}>Manage your cards and spending limits</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white"
          style={{ 
            backgroundColor: 'var(--accent)',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          Add Card
        </motion.button>
      </motion.div>

      {/* Cards Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cardsData.map(card => (
            <CardVisual 
              key={card.id} 
              card={card} 
              isSelected={selectedCard === card.id}
              onSelect={setSelectedCard}
            />
          ))}
        </div>
      </motion.div>

      {/* Selected Card Details */}
      {selected && (
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Spending Limit */}
          <div className="card-surface p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{selected.name} — Spending</h3>
                <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>Monthly limit usage</p>
              </div>
              <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
                {((selected.balance / selected.limit) * 100).toFixed(0)}% used
              </span>
            </div>
            <div className="h-3 rounded-full overflow-hidden mb-3" style={{ backgroundColor: 'var(--bg-elevated)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(selected.balance / selected.limit) * 100}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full relative"
                style={{ background: selected.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse" />
              </motion.div>
            </div>
            <div className="flex justify-between text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              <span>Spent: {formatCurrency(selected.balance)}</span>
              <span>Limit: {formatCurrency(selected.limit)}</span>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-3 mt-6">
              <QuickAction icon={Snowflake} label="Freeze" color="var(--info)" />
              <QuickAction icon={Lock} label="PIN" color="var(--warning)" />
              <QuickAction icon={Settings} label="Limits" color="var(--accent)" />
              <QuickAction icon={CreditCard} label="Details" color="var(--success)" />
            </div>
          </div>

          {/* Card Transactions */}
          <div className="card-surface p-6">
            <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Card Activity</h3>
            <div className="space-y-3">
              {recentCardTransactions.map(tx => (
                <div key={tx.id} className="flex items-center gap-3">
                  <div 
                    className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: tx.type === 'income' ? 'var(--success-muted)' : 'var(--bg-elevated)',
                      color: tx.type === 'income' ? 'var(--success)' : 'var(--text-muted)',
                    }}
                  >
                    {tx.type === 'income' ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{tx.desc}</p>
                    <p className="text-[10px] font-medium" style={{ color: 'var(--text-faint)' }}>{tx.date} · {tx.card}</p>
                  </div>
                  <span 
                    className="text-xs font-bold tabular-nums"
                    style={{ color: tx.type === 'income' ? 'var(--success)' : 'var(--text-primary)' }}
                  >
                    {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
