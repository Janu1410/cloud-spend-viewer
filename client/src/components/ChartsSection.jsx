import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { format, parseISO } from 'date-fns';

const ChartsSection = ({ data, isDarkMode }) => {
  const dailyData = data.reduce((acc, curr) => {
    const existing = acc.find(i => i.date === curr.date);
    if(existing) existing.cost += curr.cost_usd;
    else acc.push({ date: curr.date, cost: curr.cost_usd });
    return acc;
  }, []).sort((a,b) => new Date(a.date) - new Date(b.date));

  const serviceDataMap = data.reduce((acc, curr) => {
    acc[curr.service] = (acc[curr.service] || 0) + curr.cost_usd;
    return acc;
  }, {});
  
  const serviceData = Object.keys(serviceDataMap)
    .map(k => ({ name: k, value: serviceDataMap[k] }))
    .sort((a,b) => b.value - a.value)
    .slice(0, 5);

  const COLORS = ['#4f46e5', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];
  const gridColor = isDarkMode ? "#334155" : "#e2e8f0";
  const axisColor = isDarkMode ? "#94a3b8" : "#64748b";
  const tooltipBg = isDarkMode ? "#1e293b" : "#ffffff";
  const tooltipBorder = isDarkMode ? "#334155" : "#e2e8f0";

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: tooltipBg, borderColor: tooltipBorder }} className="border p-3 rounded-lg shadow-lg">
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">{label}</p>
          <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm transition-colors duration-300">
        <h3 className="text-slate-800 dark:text-white font-bold mb-6 flex items-center gap-2">Monthly Spend Trend</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="date" tickFormatter={s => format(parseISO(s), 'MMM d')} tick={{fill: axisColor, fontSize: 11}} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `$${v}`} tick={{fill: axisColor, fontSize: 11}} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="cost" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm transition-colors duration-300">
        <h3 className="text-slate-800 dark:text-white font-bold mb-6 flex items-center gap-2">Top 5 Services</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={serviceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={gridColor} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={80} tick={{fill: axisColor, fontSize: 11, fontWeight: 500}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: isDarkMode ? '#334155' : '#f1f5f9'}} content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;