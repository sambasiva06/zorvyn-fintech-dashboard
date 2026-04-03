import React from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { TransactionsPage } from './pages/Transactions';
import { Analytics } from './pages/Analytics';
import { CardsPage } from './pages/CardsPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { SendMoney } from './pages/SendMoney';
import { ScanPay } from './pages/ScanPay';
import { AddFunds } from './pages/AddFunds';
import { Profile } from './pages/Profile';
import { Notifications } from './pages/Notifications';
import { AdminDashboard } from './pages/AdminDashboard';
import { AnimatePresence } from 'framer-motion';

function MainContent() {
  const { currentView } = useFinance();
  
  return (
    <AnimatePresence mode="wait">
      {currentView === 'Dashboard' && <Dashboard key="dashboard" />}
      {currentView === 'Transactions' && <TransactionsPage key="transactions" />}
      {currentView === 'Analytics' && <Analytics key="analytics" />}
      {currentView === 'Cards' && <CardsPage key="cards" />}
      {currentView === 'Settings' && <PlaceholderPage key="settings" title="Settings" />}
      {currentView === 'SendMoney' && <SendMoney key="sendmoney" />}
      {currentView === 'ScanPay' && <ScanPay key="scanpay" />}
      {currentView === 'AddFunds' && <AddFunds key="addfunds" />}
      {currentView === 'Profile' && <Profile key="profile" />}
      {currentView === 'Notifications' && <Notifications key="notifications" />}
      {currentView === 'AdminDashboard' && <AdminDashboard key="admin" />}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <Layout>
        <MainContent />
      </Layout>
    </FinanceProvider>
  );
}
