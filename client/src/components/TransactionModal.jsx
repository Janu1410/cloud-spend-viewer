import React from 'react';
import { X, Copy, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-lg bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Transaction Details</h3>
            <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-white transition">
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
              <div className="w-12 h-12 rounded-lg bg-white dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl shadow-sm">
                $
              </div>
              <div>
                <p className="text-indigo-600/70 dark:text-indigo-400/70 text-sm font-medium">Total Cost</p>
                <p className="text-2xl font-mono text-indigo-900 dark:text-white font-bold">${data.cost_usd.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Service</p>
                <p className="text-slate-800 dark:text-slate-200 font-medium">{data.service}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Provider</p>
                <p className="text-slate-800 dark:text-slate-200 font-medium flex items-center gap-2">
                  {data.cloud_provider} 
                  <CheckCircle size={14} className="text-green-500" />
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Team</p>
                <p className="text-slate-800 dark:text-slate-200 font-medium">{data.team}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Environment</p>
                <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                  {data.env}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2">Resource ID</p>
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-black/30 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-500 break-all">
                {data.resource_id}
                <Copy size={12} className="ml-auto cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white text-sm font-semibold rounded-lg transition shadow-sm">
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionModal;