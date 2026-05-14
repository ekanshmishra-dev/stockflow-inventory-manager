import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const StockStatusBadge = ({ quantity }) => {
  if (quantity === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 shadow-sm transition-all hover:bg-red-100">
        <XCircle className="w-3.5 h-3.5" />
        Out of Stock
      </span>
    );
  } 
  
  if (quantity <= 10) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm transition-all hover:bg-amber-100">
        <AlertTriangle className="w-3.5 h-3.5" />
        Low Stock
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm transition-all hover:bg-emerald-100">
      <CheckCircle2 className="w-3.5 h-3.5" />
      In Stock
    </span>
  );
};

export default StockStatusBadge;
