import React, { useState, useEffect, useMemo } from 'react';
import { Search, Bell, Sun, Moon, X } from 'lucide-react';
import { subDays, parseISO, isAfter, subMonths } from 'date-fns';
import Sidebar from './components/Sidebar';
import KPIStats from './components/KPIStats';
import PremiumFilters from './components/PremiumFilters';
import ChartsSection from './components/ChartsSection';
import EnterpriseTable from './components/EnterpriseTable';
import TransactionModal from './components/TransactionModal';
import ReportsView from './components/ReportsView';
import SettingsModal from './components/SettingsModal';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  
  // UI States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [isCompact, setIsCompact] = useState(false);

  // ✅ UPDATED: Added 'service' to filter state
  const [filters, setFilters] = useState({ provider: 'All', team: 'All', env: 'All', service: 'All' });
  
  const [dateRange, setDateRange] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleCompact = () => setIsCompact(!isCompact);

  useEffect(() => {
    fetch('http://localhost:3001/api/spend')
      .then(res => res.json())
      .then(result => {
        setData(result.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ✅ Extract Unique Values for Dropdowns
  const uniqueTeams = useMemo(() => ['All', ...new Set(data.map(item => item.team))].sort(), [data]);
  const uniqueServices = useMemo(() => ['All', ...new Set(data.map(item => item.service))].sort(), [data]);

  // Master Filter Logic
  const filteredData = useMemo(() => {
    if (data.length === 0) return [];
    
    const dates = data.map(d => new Date(d.date).getTime());
    const maxDate = new Date(Math.max(...dates));

    let cutoffDate = null;
    if (dateRange === '30d') cutoffDate = subDays(maxDate, 30);
    if (dateRange === '90d') cutoffDate = subDays(maxDate, 90);
    if (dateRange === '6m') cutoffDate = subMonths(maxDate, 6);
    if (dateRange === '1y') cutoffDate = subMonths(maxDate, 12);

    const searchLower = searchTerm.toLowerCase().trim();

    return data.filter(item => {
      // ✅ UPDATED: Added Service Filter Check
      const matchProvider = filters.provider === 'All' || item.cloud_provider === filters.provider;
      const matchTeam = filters.team === 'All' || item.team === filters.team;
      const matchEnv = filters.env === 'All' || item.env === filters.env;
      const matchService = filters.service === 'All' || item.service === filters.service;
      
      let matchDate = true;
      if (cutoffDate) matchDate = isAfter(parseISO(item.date), cutoffDate);

      let matchSearch = true;
      if (searchLower) {
        const rowString = `${item.cloud_provider} ${item.service} ${item.team} ${item.env} ${item.resource_id}`.toLowerCase();
        matchSearch = rowString.includes(searchLower);
      }

      return matchProvider && matchTeam && matchEnv && matchService && matchDate && matchSearch;
    });
  }, [data, filters, dateRange, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0E14] text-slate-900 dark:text-slate-200 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-500/30 transition-colors duration-300">
      
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <div className="lg:ml-64 min-h-screen flex flex-col">
        <header className="h-16 px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search services (e.g. AWS EC2)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-full pl-10 pr-10 py-1.5 text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-950 transition-all placeholder:text-slate-400"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 relative">
            <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-full transition-colors ${showNotifications ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0B0E14]"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Notifications</h4>
                  <div className="text-sm text-slate-600 dark:text-slate-300 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    ✅ Data synced successfully
                    <span className="block text-[10px] text-slate-400 mt-1">Just now</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto" onClick={() => setShowNotifications(false)}>
          <div className="max-w-7xl mx-auto space-y-8">
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-100 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {currentView === 'dashboard' ? (
                  <>
                    <div className="flex justify-between items-end">
                      <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Cloud Cost Overview</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Track and optimize your infrastructure spending.</p>
                      </div>
                    </div>
                    
                    <KPIStats data={filteredData} />
                    
                    {/* ✅ Pass unique arrays to PremiumFilters */}
                    <PremiumFilters 
                      filters={filters} 
                      setFilters={setFilters} 
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                      uniqueTeams={uniqueTeams}
                      uniqueServices={uniqueServices}
                    />

                    <ChartsSection data={filteredData} isDarkMode={isDarkMode} />
                    
                    <EnterpriseTable 
                      data={filteredData} 
                      onRowClick={setSelectedTx} 
                      isCompact={isCompact} 
                    />
                  </>
                ) : (
                  <ReportsView 
                    data={filteredData}
                    filters={filters}
                    setFilters={setFilters}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    onRowClick={setSelectedTx}
                    isCompact={isCompact}
                    uniqueTeams={uniqueTeams}
                    uniqueServices={uniqueServices}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <TransactionModal 
        isOpen={!!selectedTx} 
        onClose={() => setSelectedTx(null)} 
        data={selectedTx} 
      />

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isCompact={isCompact}        
        toggleCompact={toggleCompact} 
      />
    </div>
  );
}

export default App;