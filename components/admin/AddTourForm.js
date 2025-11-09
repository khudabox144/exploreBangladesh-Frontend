// components/admin/AddTourForm.js
'use client';
import { useForm } from 'react-hook-form';
import { toursAPI } from '@/utils/api'; 
import { useState } from 'react';

export default function AddTourForm() {
  const { register, handleSubmit, reset } = useForm();
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Convert numeric fields
      data.durationDays = parseInt(data.durationDays);
      data.basePrice = parseFloat(data.basePrice);
      data.capacity = data.capacity ? parseInt(data.capacity) : null;
      
      // Convert date fields
      data.startDate = data.startDate || null;
      data.endDate = data.endDate || null;
      
      // Set default values for optional fields
      data.operatorId = data.operatorId || null;
      data.locationId = data.locationId || null;
      
      console.log('Submitting tour data:', data);
      
      await toursAPI.create(data);
      setMsg('Tour added successfully!');
      reset();
    } catch (err) {
      console.error('Error adding tour:', err);
      setMsg('Error adding tour: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Tour</h2>
      
      {msg && (
        <div className={`p-4 rounded-lg mb-4 ${
          msg.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {msg}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tour Title</label>
            <input 
              {...register('title', { required: true })} 
              placeholder="e.g., Majestic Himalaya Adventure" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input 
              {...register('slug')} 
              placeholder="e.g., majestic-himalaya-adventure" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            {...register('description')} 
            placeholder="Describe the tour experience, highlights, and what travelers can expect..."
            rows="4"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tour Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
            <input 
              {...register('durationDays', { required: true })} 
              type="number" 
              placeholder="10" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select 
              {...register('difficulty')} 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
            <input 
              {...register('capacity')} 
              type="number" 
              placeholder="20" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select 
              {...register('currency')} 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USD">USD</option>
              <option value="BDT">BDT</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Base Price</label>
            <input 
              {...register('basePrice', { required: true })} 
              type="number" 
              step="0.01" 
              placeholder="1299.99" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operator ID (Optional)</label>
            <input 
              {...register('operatorId')} 
              type="number" 
              placeholder="1" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date (Optional)</label>
            <input 
              {...register('startDate')} 
              type="date" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date (Optional)</label>
            <input 
              {...register('endDate')} 
              type="date" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location ID (Optional)</label>
          <input 
            {...register('locationId')} 
            type="number" 
            placeholder="1" 
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding Tour...' : 'Add Tour'}
        </button>
      </form>
    </div>
  );
}