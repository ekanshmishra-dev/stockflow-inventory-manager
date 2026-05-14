import React from 'react';
import StockStatusBadge from './StockStatusBadge';
import { Package, Hash, Boxes, Database } from 'lucide-react';

const InventoryTable = ({ items, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-pulse">
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="h-5 bg-slate-200 rounded w-1/4"></div>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-12 bg-slate-100 rounded w-1/3"></div>
              <div className="h-12 bg-slate-100 rounded w-1/4"></div>
              <div className="h-12 bg-slate-100 rounded w-1/4"></div>
              <div className="h-12 bg-slate-100 rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-slate-200/50">
          <Database className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No inventory items yet</h3>
        <p className="text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
          Your inventory is looking a little empty. Add your first item to start tracking your stock.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
        <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Current Inventory</h2>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
          {items.length} {items.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/80 backdrop-blur-sm">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-2/5">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-slate-400" />
                  Item Details
                </div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-slate-400" />
                  SKU
                </div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-slate-400" />
                  Stock Level
                </div>
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {items.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-slate-50/80 transition-colors duration-200 ease-in-out group"
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-blue-200 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">
                      <Package className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="inline-flex text-xs font-mono font-medium text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/60">
                    {item.sku}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-semibold text-slate-700">
                      {item.quantity}
                    </span>
                    <span className="text-[11px] font-normal text-slate-400 tracking-wide uppercase">units</span>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <StockStatusBadge quantity={item.quantity} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
