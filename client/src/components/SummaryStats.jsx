import React from 'react';
import { DollarSign, Cloud, Server, TrendingUp } from 'lucide-react';

// FIX: Card component moved OUTSIDE of SummaryStats
const Card = ({ title, value, subtext, icon: Icon, gradient, textColor }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
    {/* Background Gradient Blob */}
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
    
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
        <Icon size={22} />
      </div>
      {/* Percentage badge mock */}
      <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
        30 Days
      </span>
    </div>
    
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className={`text-2xl font-black ${textColor}`}>
        {value}
      </h3>
      <p className="text-xs text-gray-400 mt-2 font-medium">{subtext}</p>
    </div>
  </div>
);

const SummaryStats = ({ data }) => {
  const total = data.reduce((acc, curr) => acc + curr.cost_usd, 0);
  const aws = data.filter(d => d.cloud_provider === 'AWS').reduce((acc, curr) => acc + curr.cost_usd, 0);
  const gcp = data.filter(d => d.cloud_provider === 'GCP').reduce((acc, curr) => acc + curr.cost_usd, 0);

  // Calculate Top Team
  const teamMap = data.reduce((acc, curr) => {
    acc[curr.team] = (acc[curr.team] || 0) + curr.cost_usd;
    return acc;
  }, {});
  
  // Handle empty data case safely
  const topTeam = Object.keys(teamMap).length > 0 
    ? Object.keys(teamMap).reduce((a, b) => teamMap[a] > teamMap[b] ? a : b) 
    : 'N/A';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <Card 
        title="Total Spend" 
        value={`$${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
        subtext="Total aggregated cost"
        icon={DollarSign} 
        gradient="from-blue-500 to-blue-600"
        textColor="text-gray-800"
      />
      <Card 
        title="AWS Spend" 
        value={`$${aws.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
        subtext={`${total > 0 ? ((aws/total)*100).toFixed(1) : 0}% of portfolio`}
        icon={Cloud} 
        gradient="from-orange-400 to-yellow-500"
        textColor="text-gray-800"
      />
      <Card 
        title="GCP Spend" 
        value={`$${gcp.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
        subtext={`${total > 0 ? ((gcp/total)*100).toFixed(1) : 0}% of portfolio`}
        icon={Server} 
        gradient="from-green-500 to-emerald-600"
        textColor="text-gray-800"
      />
      <Card 
        title="Top Spender" 
        value={topTeam} 
        subtext="Highest spending team"
        icon={TrendingUp} 
        gradient="from-purple-500 to-pink-600"
        textColor="text-gray-800"
      />
    </div>
  );
};

export default SummaryStats;