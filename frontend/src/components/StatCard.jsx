import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={`p-2.5 rounded-xl ${bgColorClass} ring-1 ring-inset ring-slate-100 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-5 h-5 ${colorClass}`} />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
      </div>
    </div>
  );
};

export default StatCard;
