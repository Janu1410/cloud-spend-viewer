import React from 'react';
import { LayoutDashboard, PieChart, Hexagon, Settings } from 'lucide-react';

const Sidebar = ({ currentView, onNavigate, onOpenSettings }) => {
  return (
    <div className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white dark:bg-[#0B0E14] border-r border-slate-200 dark:border-slate-800 z-50 transition-colors duration-300">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-md shadow-indigo-200 dark:shadow-none">
          <Hexagon className="text-white" size={18} fill="currentColor" />
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">K&Co. <span className="text-slate-400 font-normal">Viewer</span></span>
      </div>

      {/* Menu */}
      <div className="flex-1 py-6 px-3 space-y-1">
        <div className="px-3 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Menu</div>
        
        {/* Dashboard */}
        <button 
          onClick={() => onNavigate('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentView === 'dashboard'
              ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent'
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        {/* Reports */}
        <button 
          onClick={() => onNavigate('reports')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            currentView === 'reports'
              ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent'
          }`}
        >
          <PieChart size={18} />
          Reports
        </button>

        {/* Settings (Triggers Modal) */}
        <button 
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent transition-all cursor-pointer"
        >
          <Settings size={18} />
          Settings
        </button>
      </div>

      {/* Footer Profile - ALSO OPENS SETTINGS */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div 
          onClick={onOpenSettings}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-xs">
            I
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-200">Janu Gohil</div>
            <div className="text-xs text-slate-400">Full-Stack Dev</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;