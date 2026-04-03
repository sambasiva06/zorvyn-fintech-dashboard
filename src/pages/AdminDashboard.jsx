import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Users, Server, Activity, AlertTriangle, Fingerprint } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatters';

const mockLogs = [
  { id: 'L-01', user: 'u_19284', action: 'Failed Login (x5)', risk: 'high', location: 'RU' },
  { id: 'L-02', user: 'u_88492', action: 'KYC Override', risk: 'low', location: 'IN' },
  { id: 'L-03', user: 'u_99211', action: 'Large Transfer Flag', risk: 'medium', location: 'UK' },
];

export function AdminDashboard() {
  const { role } = useFinance();

  // If viewing admin page but not admin, show unathorized
  if (role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <ShieldAlert className="h-16 w-16 text-[var(--danger)] mb-4" />
        <h2 className="text-xl font-bold uppercase tracking-widest text-[var(--danger)]">RESTRICTED AREA</h2>
        <p className="text-[var(--text-muted)] mt-2 font-mono text-xs">Clearance Level Mismatch</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full pb-10"
    >
      <div className="border-b border-[var(--border-default)] pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
            <Fingerprint className="h-8 w-8 text-[var(--accent)]" />
            COMMAND CENTER
          </h1>
          <p className="text-xs uppercase tracking-widest font-bold text-[var(--text-muted)] mt-1 ml-11">
            Global Infrastructure Monitor
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--success)]"></span>
          </span>
          <span className="text-xs font-mono font-bold text-[var(--success)] uppercase tracking-widest">Sys_Online</span>
        </div>
      </div>

      {/* Global Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="card-surface p-6 border-t-2" style={{ borderTopColor: 'var(--accent)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Platform Volume</h3>
            <Activity className="h-4 w-4 text-[var(--accent)]" />
          </div>
          <div className="text-3xl font-black">{formatCurrency(145000000)}</div>
          <p className="text-xs mt-2 text-[var(--success)] font-bold tracking-widest uppercase">+2.4% vs 24h</p>
        </div>

        <div className="card-surface p-6 border-t-2" style={{ borderTopColor: 'var(--info)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Active nodes</h3>
            <Users className="h-4 w-4 text-[var(--info)]" />
          </div>
          <div className="text-3xl font-black">24,192</div>
          <p className="text-xs mt-2 text-[var(--success)] font-bold tracking-widest uppercase">+144 Online</p>
        </div>

        <div className="card-surface p-6 border-t-2" style={{ borderTopColor: 'var(--danger)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Server Load</h3>
            <Server className="h-4 w-4 text-[var(--danger)]" />
          </div>
          <div className="text-3xl font-black">82%</div>
          <p className="text-xs mt-2 text-[var(--danger)] font-bold tracking-widest uppercase">Spike Detected</p>
        </div>
      </div>

      {/* Threat Intel Log */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[var(--warning)]" />
            Threat Intelligence Log
          </h2>
          <button className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest">Purge Logs</button>
        </div>

        <div className="bg-[#0a0a0c] border border-zinc-800 rounded-xl overflow-hidden font-mono text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#121214] border-b border-zinc-800 text-[9px] uppercase text-zinc-500 tracking-widest">
              <tr>
                <th className="p-4">Log ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Event</th>
                <th className="p-4">Risk Level</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map((log) => (
                <tr key={log.id} className="border-b border-zinc-800/50 hover:bg-[#121214] transition-colors">
                  <td className="p-4 text-zinc-400">{log.id}</td>
                  <td className="p-4 text-[var(--accent)]">{log.user}</td>
                  <td className="p-4 tracking-widest">{log.action}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded inline-block ${log.risk === 'high' ? 'bg-red-500/20 text-red-500' : log.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                      {log.risk.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-zinc-500 hover:text-white transition-colors">Inspect</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
