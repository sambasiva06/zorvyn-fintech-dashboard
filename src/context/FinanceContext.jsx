import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { mockTransactions } from '../data/mockData';

const FinanceContext = createContext(undefined);

export function FinanceProvider({ children }) {
  const [role, setRole] = useState('viewer');
  const [isRoleLoading, setIsRoleLoading] = useState(false);
  const [currentView, setCurrentView] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sort config for transactions
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Transactions with localStorage persistence
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('pulse_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse transactions from local storage', e);
      }
    }
    return mockTransactions;
  });

  // Persist transactions
  useEffect(() => {
    localStorage.setItem('pulse_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Apply dark theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('pulse_theme', 'dark');
  }, []);

  const addTransaction = useCallback((t) => {
    const newTransaction = {
      ...t,
      id: 't' + Math.random().toString(36).substring(2, 9),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const changeRole = useCallback((newRole) => {
    if (role === newRole) return;
    setIsRoleLoading(true);
    setTimeout(() => {
      setRole(newRole);
      if (newRole === 'admin') {
        setCurrentView('Transactions');
      }
      setIsRoleLoading(false);
    }, 600);
  }, [role]);

  // ── Computed Values ──
  const computedData = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = income - expenses;

    // Group by month
    const monthlyMap = {};
    transactions.forEach((t) => {
      const monthKey = t.date.substring(0, 7); // "2026-01"
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { income: 0, expenses: 0 };
      }
      if (t.type === 'income') {
        monthlyMap[monthKey].income += t.amount;
      } else {
        monthlyMap[monthKey].expenses += t.amount;
      }
    });

    // Sort months chronologically
    const monthlyData = Object.entries(monthlyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => ({
        month: key,
        monthLabel: new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(new Date(key + '-01')),
        income: val.income,
        expenses: val.expenses,
        balance: val.income - val.expenses,
      }));

    // Running balance for chart
    let runningBalance = 0;
    const balanceTrend = monthlyData.map((m) => {
      runningBalance += m.balance;
      return { ...m, cumulativeBalance: runningBalance };
    });

    // Category totals
    const categoryTotals = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      });

    // Month-over-month comparison (current vs previous)
    const sortedMonths = Object.keys(monthlyMap).sort();
    const currentMonth = sortedMonths[sortedMonths.length - 1];
    const previousMonth = sortedMonths.length >= 2 ? sortedMonths[sortedMonths.length - 2] : null;

    const currentMonthData = monthlyMap[currentMonth] || { income: 0, expenses: 0 };
    const previousMonthData = previousMonth ? monthlyMap[previousMonth] : { income: 0, expenses: 0 };

    const incomeChange = previousMonthData.income > 0
      ? ((currentMonthData.income - previousMonthData.income) / previousMonthData.income) * 100
      : 0;
    const expenseChange = previousMonthData.expenses > 0
      ? ((currentMonthData.expenses - previousMonthData.expenses) / previousMonthData.expenses) * 100
      : 0;

    return {
      income,
      expenses,
      balance,
      monthlyData,
      balanceTrend,
      categoryTotals,
      currentMonthData,
      previousMonthData,
      incomeChange,
      expenseChange,
      currentMonth,
      previousMonth,
    };
  }, [transactions]);

  return (
    <FinanceContext.Provider value={{
      transactions,
      role,
      changeRole,
      isRoleLoading,
      addTransaction,
      deleteTransaction,
      currentView,
      setCurrentView,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      sortConfig,
      setSortConfig,
      ...computedData,
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
