import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, Shield, User, Sun, Moon, Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { exportToCSV, exportToJSON } from '../../utils/formatters';

export function Topbar() {
  const { role, changeRole, setIsMobileMenuOpen, currentView, theme, toggleTheme, transactions } = useFinance();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportRef = useRef(null);

  // Close export menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header 
      className="h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30"
      style={{ 
        backgroundColor: 'color-mix(in srgb, var(--bg-base) 80%, transparent)',
        borderBottom: '1px solid var(--border-default)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center flex-1">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="md:hidden mr-3 p-2 rounded-lg transition-all"
          style={{ color: 'var(--text-muted)' }}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </motion.button>
        
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={currentView}
              initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-bold tracking-[0.12em] uppercase"
              style={{ color: 'var(--text-primary)' }}
            >
              {currentView}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="hidden lg:flex max-w-xs w-full ml-10 relative group/search">
          <Search 
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 transition-colors duration-300 group-focus-within/search:text-[var(--accent)]" 
            style={{ color: 'var(--text-faint)' }}
          />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs font-medium transition-all duration-300"
            style={{
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
            }}
            placeholder="Quick search..."
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Export Button */}
        <div className="relative" ref={exportRef}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="h-8 w-8 flex items-center justify-center rounded-lg transition-all duration-200"
            style={{ color: 'var(--text-muted)', backgroundColor: showExportMenu ? 'var(--bg-hover)' : 'transparent' }}
            title="Export transactions"
          >
            <Download className="h-4 w-4" />
          </motion.button>
          
          <AnimatePresence>
            {showExportMenu && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-44 rounded-xl p-1.5 z-50 shadow-xl"
                style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
              >
                <button
                  onClick={() => { exportToCSV(transactions); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" style={{ color: 'var(--success)' }} />
                  Export as CSV
                </button>
                <button
                  onClick={() => { exportToJSON(transactions); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <FileJson className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
                  Export as JSON
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="h-8 w-8 flex items-center justify-center rounded-lg transition-all duration-200"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sun className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Moon className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="h-5 w-[1px] mx-0.5" style={{ backgroundColor: 'var(--border-default)' }} />

        {/* Role Switcher */}
        <div 
          className="p-0.5 rounded-xl flex backdrop-blur-sm"
          style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => changeRole('viewer')}
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 relative"
            style={{ color: role === 'viewer' ? 'var(--text-primary)' : 'var(--text-muted)' }}
          >
            {role === 'viewer' && (
              <motion.div 
                layoutId="role-bg"
                className="absolute inset-0 rounded-lg shadow-lg"
                style={{ backgroundColor: 'var(--bg-hover)' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">Viewer</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => changeRole('admin')}
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center gap-1.5 relative"
            style={{ color: role === 'admin' ? '#fff' : 'var(--text-muted)' }}
          >
            {role === 'admin' && (
              <motion.div 
                layoutId="role-bg"
                className="absolute inset-0 rounded-lg shadow-lg"
                style={{ backgroundColor: 'var(--accent)', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <AnimatePresence>
                {role === 'admin' && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Shield className="h-3 w-3" />
                  </motion.span>
                )}
              </AnimatePresence>
              Admin
            </span>
          </motion.button>
        </div>

        <div className="h-5 w-[1px] mx-0.5 hidden sm:block" style={{ backgroundColor: 'var(--border-default)' }} />

        <div className="hidden sm:flex items-center gap-2">
          {/* Notification Bell */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-8 w-8 flex items-center justify-center rounded-lg transition-all duration-200 relative"
            style={{ color: 'var(--text-muted)' }}
          >
            <Bell className="h-4 w-4" />
            <span 
              className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full badge-ping"
              style={{ backgroundColor: 'var(--accent)', border: '2px solid var(--bg-base)' }}
            />
          </motion.button>
          
          {/* Avatar */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden"
            style={{ 
              border: role === 'admin' ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid var(--border-default)',
              backgroundColor: role === 'admin' ? 'var(--accent-muted)' : 'var(--bg-elevated)'
            }}
          >
            <User className="h-4 w-4" style={{ color: role === 'admin' ? 'var(--accent)' : 'var(--text-muted)' }} />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
