import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

const EnterpriseTable = ({ data, onRowClick, isCompact }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Define columns configuration for better control
  const columns = [
    { key: 'date', label: 'Date', align: 'left' },
    { key: 'cloud_provider', label: 'Provider', align: 'left' },
    { key: 'service', label: 'Service', align: 'left' },
    { key: 'team', label: 'Team', align: 'left' },
    { key: 'env', label: 'Environment', align: 'left' },
    { key: 'cost_usd', label: 'Cost (USD)', align: 'right' }, // ✅ Explicit Right Align & Label
  ];

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  // Dynamic classes based on Compact Mode
  const rowPadding = isCompact ? 'py-2' : 'py-4';
  const headerPadding = isCompact ? 'py-2' : 'py-3';
  const fontSize = isCompact ? 'text-xs' : 'text-sm';

  return (
    <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-colors duration-300">
      <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 dark:text-white">Transaction History</h3>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-2 py-1 rounded">
          {data.length} Rows
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/80">
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  onClick={() => handleSort(col.key)} 
                  className={`px-6 ${headerPadding} text-${col.align} text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors select-none`}
                >
                  <div className={`flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                    {col.label}
                    <ArrowUpDown size={12} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {sortedData.slice(0, 50).map((row, idx) => (
              <tr key={idx} onClick={() => onRowClick(row)} className="hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 cursor-pointer transition-colors group">
                <td className={`px-6 ${rowPadding} ${fontSize} text-slate-600 dark:text-slate-300 font-medium`}>{row.date}</td>
                <td className={`px-6 ${rowPadding}`}>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${row.cloud_provider === 'AWS' ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-500/20' : 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-100 dark:border-green-500/20'}`}>
                    {row.cloud_provider}
                  </span>
                </td>
                <td className={`px-6 ${rowPadding} ${fontSize} text-slate-500 dark:text-slate-400`}>{row.service}</td>
                <td className={`px-6 ${rowPadding} ${fontSize} text-slate-500 dark:text-slate-400`}>{row.team}</td>
                <td className={`px-6 ${rowPadding}`}>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${row.env === 'prod' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-500/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'}`}>
                    {row.env}
                  </span>
                </td>
                <td className={`px-6 ${rowPadding} ${fontSize} font-mono text-slate-900 dark:text-white text-right font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400`}>
                  ${row.cost_usd.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnterpriseTable;