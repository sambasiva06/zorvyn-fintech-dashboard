import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const mockContacts = [
  { id: 1, name: 'Alice Walker', avatar: 'https://i.pravatar.cc/150?u=alice' },
  { id: 2, name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?u=bob' },
  { id: 3, name: 'Charlie Davis', avatar: 'https://i.pravatar.cc/150?u=char' },
];

export function SendMoney() {
  const { setCurrentView } = useFinance();
  const [amount, setAmount] = useState('0');
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-md mx-auto w-full pt-4"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setCurrentView('Dashboard')} className="p-2 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-primary)]">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-widest uppercase">Send Money</h1>
      </div>

      <div className="flex justify-center mb-10">
        <div className="text-center">
          <p className="text-sm font-bold text-[var(--text-muted)] tracking-widest uppercase mb-2">Enter Amount</p>
          <div className="flex items-center justify-center text-5xl font-black text-[var(--accent)] tracking-tighter">
            <span className="text-3xl mr-1 opacity-70">₹</span>
            <input 
              type="text" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
              className="bg-transparent border-none outline-none text-center w-40 placeholder-[var(--text-faint)]"
              placeholder="0"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs font-bold text-[var(--text-muted)] tracking-widest uppercase mb-4">Select Contact</p>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {mockContacts.map(c => (
            <div 
              key={c.id} 
              onClick={() => setSelectedContact(c.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer transition-all ${selectedContact === c.id ? 'scale-110 opacity-100' : 'opacity-50 hover:opacity-80'}`}
            >
              <img src={c.avatar} alt={c.name} className="h-14 w-14 rounded-full border-2 border-[var(--border-default)]" />
              <span className="text-[10px] font-bold text-[var(--text-primary)] uppercase">{c.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all">
        <Send className="h-4 w-4" /> Send Securely
      </button>
    </motion.div>
  );
}
