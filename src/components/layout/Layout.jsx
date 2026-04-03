import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useFinance } from '../../context/FinanceContext';
import { AnimatePresence, motion } from 'framer-motion';

export function Layout({ children }) {
  const { isMobileMenuOpen, setIsMobileMenuOpen, isRoleLoading, role } = useFinance();

  return (
    <div className="flex h-screen text-[var(--text-secondary)] font-sans overflow-hidden relative" style={{ backgroundColor: 'var(--bg-base)' }}>
      
      {/* Admin Mode Top Bar Indicator */}
      <AnimatePresence>
        {role === 'admin' && (
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 z-50 h-[2px]"
            style={{ 
              background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
              boxShadow: '0 0 15px var(--accent-glow)',
              transformOrigin: 'center' 
            }}
          />
        )}
      </AnimatePresence>

      {/* Role Switching Overlay */}
      <AnimatePresence>
        {isRoleLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] backdrop-blur-md flex flex-col items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(9, 9, 11, 0.8)' }}
          >
            <div className="relative flex items-center justify-center mb-6">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="h-12 w-12 rounded-full"
                style={{ border: '2px solid var(--bg-elevated)', borderTopColor: 'var(--accent)' }}
              />
              <div 
                className="absolute h-8 w-8 rounded-full"
                style={{ 
                  border: '2px solid transparent',
                  borderBottomColor: 'var(--success)',
                  animation: 'spin 1.5s linear infinite reverse' 
                }}
              />
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-medium tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Updating permissions...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(to right, var(--text-muted) 1px, transparent 1px), linear-gradient(to bottom, var(--text-muted) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}
        />
        {/* Glow orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(139, 92, 246, 0.04)' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(34, 197, 94, 0.03)' }} />
      </div>
      
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 md:hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
