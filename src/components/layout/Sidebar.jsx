import React from 'react';
import { Home, PieChart, ArrowLeftRight, Settings, CreditCard, X, Activity, Shield } from 'lucide-react';
import { clsx } from 'clsx';
import { useFinance } from '../../context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';

const PulseLogo = () => (
  <div className="flex items-center gap-2.5 select-none group cursor-pointer">
    <motion.div 
      whileHover={{ rotate: 8, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400 }}
      className="h-9 w-9 flex items-center justify-center relative"
      style={{ 
        backgroundColor: 'var(--text-primary)',
        color: 'var(--bg-base)'
      }}
    >
      <Activity className="h-4.5 w-4.5" strokeWidth={2.5} style={{ color: 'var(--bg-base)' }} />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 to-white/15" />
    </motion.div>
    <div className="flex flex-col">
      <span className="text-xl font-extrabold tracking-tight leading-none" style={{ color: 'var(--text-primary)' }}>pulse</span>
      <span className="text-[8px] font-bold tracking-[0.25em] leading-none mt-0.5 uppercase" style={{ color: 'var(--accent)', opacity: 0.7 }}>finance</span>
    </div>
  </div>
);

const navItemVariants = {
  rest: { x: 0 },
  hover: { x: 3 }
};

export function Sidebar() {
  const { currentView, setCurrentView, isMobileMenuOpen, setIsMobileMenuOpen, role } = useFinance();

  const navigation = role === 'admin' 
    ? [
        { name: 'AdminDashboard', icon: Shield },
        { name: 'Settings', icon: Settings },
      ]
    : [
        { name: 'Dashboard', icon: Home },
        { name: 'Transactions', icon: ArrowLeftRight },
        { name: 'Analytics', icon: PieChart },
        { name: 'Cards', icon: CreditCard },
        { name: 'Settings', icon: Settings },
      ];

  return (
    <div 
      className={clsx(
        "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:relative md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}
      style={{ 
        backgroundColor: 'var(--bg-surface)', 
        borderRight: '1px solid var(--border-default)',
        boxShadow: isMobileMenuOpen ? '4px 0 24px rgba(0,0,0,0.3)' : 'none' 
      }}
    >
      <div className="flex flex-col h-full py-8">
        {/* Logo */}
        <div className="px-6 mb-12 flex items-center justify-between">
          <PulseLogo />
          <button 
            className="md:hidden p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] px-4 mb-3" style={{ color: 'var(--text-faint)' }}>Navigation</p>
          {navigation.map((item) => {
            const isCurrent = currentView === item.name;
            return (
              <motion.button
                key={item.name}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentView(item.name);
                  setIsMobileMenuOpen(false);
                }}
                className={clsx(
                  "w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative",
                  isCurrent 
                    ? "sidebar-active-glow" 
                    : ""
                )}
                style={{
                  backgroundColor: isCurrent ? 'var(--accent-muted)' : 'transparent',
                  color: isCurrent ? 'var(--accent-hover)' : 'var(--text-muted)',
                }}
                onMouseEnter={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }
                }}
              >
                <motion.div variants={navItemVariants} className="flex items-center w-full">
                  <item.icon 
                    className="mr-3 h-[18px] w-[18px] transition-colors duration-200"
                    style={{ color: isCurrent ? 'var(--accent)' : 'var(--text-faint)' }}
                    strokeWidth={isCurrent ? 2 : 1.5} 
                  />
                  <span className="tracking-tight">{item.name}</span>
                  {isCurrent && (
                    <motion.div 
                      layoutId="active-dot"
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom — Version Badge */}
        <div className="px-6 mt-auto">
          <div 
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
          >
            <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)' }} />
            <span className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>Pulse v1.0 — All systems normal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
