import React from 'react';
import { Download } from 'lucide-react';
import PremiumFilters from './PremiumFilters';
import EnterpriseTable from './EnterpriseTable';

// ✅ FIXED: Added uniqueTeams and uniqueServices to props
const ReportsView = ({ 
  data, 
  filters, 
  setFilters, 
  dateRange, 
  setDateRange, 
  onRowClick, 
  isCompact, 
  uniqueTeams, 
  uniqueServices 
}) => {
  
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export!");
      return;
    }
    const headers = ['Date', 'Cloud Provider', 'Service', 'Team', 'Environment', 'Cost (USD)', 'Resource ID'];
    const csvRows = [
      headers.join(','), 
      ...data.map(row => [
        row.date, row.cloud_provider, row.service, row.team, row.env, row.cost_usd.toFixed(2), row.resource_id
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `cloud_spend_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reports & Analysis</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Detailed breakdown of all cloud transactions.</p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition shadow-sm active:scale-95">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* ✅ FIXED: Passing unique lists to filters */}
      <PremiumFilters 
        filters={filters} 
        setFilters={setFilters} 
        dateRange={dateRange}
        setDateRange={setDateRange}
        uniqueTeams={uniqueTeams}
        uniqueServices={uniqueServices}
      />

      <EnterpriseTable data={data} onRowClick={onRowClick} isCompact={isCompact} />
    </div>
  );
};

export default ReportsView;