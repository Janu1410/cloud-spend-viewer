import React from 'react';
import { X, Moon, Globe, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ Accept isCompact and toggleCompact props
const SettingsModal = ({ isOpen, onClose, isDarkMode, toggleTheme, isCompact, toggleCompact }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Settings</h3>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            
            {/* Appearance Section */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Appearance</h4>
              
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition cursor-pointer mb-3" onClick={toggleTheme}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-500/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Moon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Dark Mode</p>
                    <p className="text-xs text-slate-500">Toggle dark theme</p>
                  </div>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isDarkMode ? 'left-6' : 'left-1'}`} />
                </div>
              </div>

              {/* ✅ Compact View Toggle (Now Clickable) */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition cursor-pointer" onClick={toggleCompact}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                    <Monitor size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Compact View</p>
                    <p className="text-xs text-slate-500">Dense tables for more data</p>
                  </div>
                </div>
                {/* Visual Switch Logic */}
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isCompact ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isCompact ? 'left-6' : 'left-1'}`} />
                </div>
              </div>
            </div>

            {/* General Section */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">General</h4>
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 opacity-60 cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Currency</p>
                    <p className="text-xs text-slate-500">USD - US Dollar</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">Fixed</span>
              </div>
            </div>

          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-400">K&Co. Internal Dashboard v1.0.5</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsModal;