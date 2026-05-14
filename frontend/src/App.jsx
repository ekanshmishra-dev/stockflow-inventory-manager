import React, { useState, useEffect } from 'react';
import { api } from './api';
import Navbar from './components/Navbar';
import StatCard from './components/StatCard';
import InventoryTable from './components/InventoryTable';
import AddItemForm from './components/AddItemForm';
import { AlertCircle, Package, AlertTriangle, XOctagon } from 'lucide-react';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/items');
      setItems(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load inventory items. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      setIsAdding(true);
      const response = await api.post('/items', newItem);
      setItems(prevItems => [response.data, ...prevItems]);
      setError(null);
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Failed to add item. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const totalItems = items.length;
  const lowStockCount = items.filter(item => item.quantity > 0 && item.quantity <= 10).length;
  const outOfStockCount = items.filter(item => item.quantity === 0).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-20 w-full animate-in fade-in duration-500">
        {error && (
          <div className="mb-10 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <StatCard 
              title="Total Items" 
              value={totalItems} 
              icon={Package} 
              colorClass="text-blue-600"
              bgColorClass="bg-blue-50"
            />
            <StatCard 
              title="Low Stock (≤10)" 
              value={lowStockCount} 
              icon={AlertTriangle} 
              colorClass="text-amber-600"
              bgColorClass="bg-amber-50"
            />
            <StatCard 
              title="Out of Stock" 
              value={outOfStockCount} 
              icon={XOctagon} 
              colorClass="text-red-600"
              bgColorClass="bg-red-50"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 xl:col-span-8 space-y-6">
            <InventoryTable items={items} loading={loading} />
          </div>
          
          <div className="lg:col-span-4 xl:col-span-4">
            <div className="sticky top-32">
              <AddItemForm onAdd={handleAddItem} isAdding={isAdding} />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 mt-16 text-center border-t border-slate-200/50 bg-slate-50/50">
        <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">
          Built with React + ASP.NET Core
        </p>
      </footer>
    </div>
  );
}

export default App;
