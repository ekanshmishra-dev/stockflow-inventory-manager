import React, { useState } from 'react';
import { Plus, PackagePlus, Tag, Boxes, Loader2 } from 'lucide-react';

const AddItemForm = ({ onAdd, isAdding }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Item name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU code is required';
    
    if (formData.quantity === '') {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Must be 0 or greater';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await onAdd({
        ...formData,
        quantity: parseInt(formData.quantity, 10)
      });
      setFormData({ name: '', sku: '', quantity: '' });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <PackagePlus className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Add New Item</h2>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
            Item Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-sm bg-white border rounded-xl shadow-sm placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 ${
                errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300'
              }`}
              placeholder="e.g. Wireless Mechanical Keyboard"
            />
          </div>
          {errors.name && <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500"></span>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-slate-700 mb-1.5">
            SKU Code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Tag className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 text-sm font-mono bg-white border rounded-xl shadow-sm placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 ${
                errors.sku ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300'
              }`}
              placeholder="KBD-WL-001"
            />
          </div>
          {errors.sku && <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500"></span>{errors.sku}</p>}
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-1.5">
            Initial Quantity
          </label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Boxes className="w-4 h-4" />
            </div>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border rounded-xl shadow-sm placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 ${
                errors.quantity ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300'
              }`}
              placeholder="0"
            />
          </div>
          {errors.quantity && <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500"></span>{errors.quantity}</p>}
        </div>

        <button
          type="submit"
          disabled={isAdding}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {isAdding ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Adding Item...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Add to Inventory
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
