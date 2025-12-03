import React from 'react';
import { Calendar, Filter, Users, Box, Cloud } from 'lucide-react';

const FilterPill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer select-none whitespace-nowrap ${
      active 
        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500'
    }`}
  >
    {label}
  </button>
);

const PremiumFilters = ({ filters, setFilters, dateRange, setDateRange, uniqueTeams = [], uniqueServices = [] }) => {
  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 mb-8 flex flex-col gap-4 transition-colors duration-300">
      
      {/* Top Row: Main Category Filters */}
      <div className="flex flex-wrap items-start gap-6">
        
        {/* Provider Group */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase font-bold tracking-wider">
            <Cloud size={12} /> Provider
          </div>
          <div className="flex gap-2">
            {['All', 'AWS', 'GCP'].map(p => (
              <FilterPill key={p} label={p} active={filters.provider === p} onClick={() => setFilters({ ...filters, provider: p })} />
            ))}
          </div>
        </div>

        {/* Env Group */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase font-bold tracking-wider">
            <Box size={12} /> Env
          </div>
          <div className="flex gap-2">
            {['All', 'prod', 'staging', 'dev'].map(e => (
              <FilterPill key={e} label={e} active={filters.env === e} onClick={() => setFilters({ ...filters, env: e })} />
            ))}
          </div>
        </div>

        {/*  Team Group (As Pills) */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase font-bold tracking-wider">
            <Users size={12} /> Team
          </div>
          <div className="flex flex-wrap gap-2">
            {uniqueTeams.map(t => (
              <FilterPill key={t} label={t} active={filters.team === t} onClick={() => setFilters({ ...filters, team: t })} />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 dark:bg-slate-700 w-full" />

      {/* Bottom Row: Dropdowns */}
      <div className="flex flex-wrap items-center gap-4">
        
        {/* ✅ NEW: Service Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Service:</label>
          <div className="relative group">
            <select 
              value={filters.service}
              onChange={(e) => setFilters({ ...filters, service: e.target.value })}
              className="pl-3 pr-8 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg cursor-pointer hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none transition w-40"
            >
              {uniqueServices.map(s => (
                <option key={s} value={s}>{s === 'All' ? 'All Services' : s}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Date Range Dropdown */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={14} className="text-indigo-500" />
            </div>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-9 pr-8 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-lg cursor-pointer hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none transition shadow-sm w-44"
            >
              <option value="All">All Time</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PremiumFilters;