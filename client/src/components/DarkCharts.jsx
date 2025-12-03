import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { format, parseISO } from 'date-fns';

const DarkCharts = ({ data }) => {
  // Aggregate Daily Trend
  const dailyData = data.reduce((acc, curr) => {
    const existing = acc.find(i => i.date === curr.date);
    if(existing) existing.cost += curr.cost_usd;
    else acc.push({ date: curr.date, cost: curr.cost_usd });
    return acc;
  }, []).sort((a,b) => new Date(a.date) - new Date(b.date));

  // Aggregate By Service (Top 5)
  const serviceDataMap = data.reduce((acc, curr) => {
    acc[curr.service] = (acc[curr.service] || 0) + curr.cost_usd;
    return acc;
  }, {});
  const serviceData = Object.keys(serviceDataMap)
    .map(k => ({ name: k, value: serviceDataMap[k] }))
    .sort((a,b) => b.value - a.value)
    .slice(0, 5);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
          <p className="text-slate-400 text-xs mb-1">{label}</p>
          <p className="text-indigo-400 font-bold text-sm">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Line Chart */}
      <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
          Spend Trend
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="date" tickFormatter={s => format(parseISO(s), 'MMM d')} tick={{fill: '#64748b', fontSize: 11}} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `$${v}`} tick={{fill: '#64748b', fontSize: 11}} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="cost" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-fuchsia-500 rounded-full"></span>
          Top Services
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={serviceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e293b" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={80} tick={{fill: '#94a3b8', fontSize: 11}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#1e293b'}} content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
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

export default DarkCharts;