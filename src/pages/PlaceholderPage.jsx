import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';

export function PlaceholderPage({ title }) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-[70vh] w-full"
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative mb-10">
        <div className="absolute inset-0 rounded-full blur-3xl scale-150" style={{ backgroundColor: 'var(--accent-glow)' }} />
        <motion.div 
          animate={{ y: [0, -6, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="card-surface rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group"
          style={{ color: 'var(--accent)' }}
        >
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: 'linear-gradient(135deg, var(--accent-glow), rgba(167,139,250,0.1))' }}
          />
          <Clock className="w-16 h-16 relative z-10" strokeWidth={1.5} />
          <motion.div 
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-3 right-3"
          >
            <Sparkles className="w-3 h-3" style={{ color: 'var(--accent)', opacity: 0.6 }} />
          </motion.div>
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 0.7, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-4 left-4"
          >
            <Sparkles className="w-2.5 h-2.5" style={{ color: 'var(--success)', opacity: 0.4 }} />
          </motion.div>
        </motion.div>
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-extrabold tracking-tight mb-4 text-gradient-premium"
      >
        {title} Module
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="max-w-sm text-center text-lg leading-relaxed mb-8"
        style={{ color: 'var(--text-secondary)' }}
      >
        This premium feature is currently in active development.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full"
        style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
      >
        <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--warning)' }} />
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Coming Soon</span>
      </motion.div>
    </motion.div>
  );
}
