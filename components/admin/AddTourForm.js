// // components/admin/AddTourForm.js
// 'use client';
// import { useForm } from 'react-hook-form';
// import { toursAPI } from '@/utils/api'; 
// import { useState } from 'react';

// export default function AddTourForm() {
//   const { register, handleSubmit, reset } = useForm();
//   const [msg, setMsg] = useState('');
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);
      
//       // Convert numeric fields
//       data.durationDays = parseInt(data.durationDays);
//       data.basePrice = parseFloat(data.basePrice);
//       data.capacity = data.capacity ? parseInt(data.capacity) : null;
      
//       // Convert date fields
//       data.startDate = data.startDate || null;
//       data.endDate = data.endDate || null;
      
//       // Set default values for optional fields
//       data.operatorId = data.operatorId || null;
//       data.locationId = data.locationId || null;
      
//       console.log('Submitting tour data:', data);
      
//       await toursAPI.create(data);
//       setMsg('Tour added successfully!');
//       reset();
//     } catch (err) {
//       console.error('Error adding tour:', err);
//       setMsg('Error adding tour: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Tour</h2>
      
//       {msg && (
//         <div className={`p-4 rounded-lg mb-4 ${
//           msg.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
//         }`}>
//           {msg}
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Basic Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Tour Title</label>
//             <input 
//               {...register('title', { required: true })} 
//               placeholder="e.g., Majestic Himalaya Adventure" 
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
//             <input 
//               {...register('slug')} 
//               placeholder="e.g., majestic-himalaya-adventure" 
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//           <textarea 
//             {...register('description')} 
//             placeholder="Describe the tour experience, highlights, and what travelers can expect..."
//             rows="4"
//             className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         {/* Tour Details */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
//             <input 
//               {...register('durationDays', { required: true })} 
//               type="number" 
//               placeholder="10" 
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
//             <select 
//               {...register('difficulty')} 
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">Select Difficulty</option>
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
//             <input 
//               {...register('capacity')} 
//               type="number" 
//               placeholder="20" 
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
//             <select 
//               {...register('currency')} 
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="USD">USD</option>
//               <option value="BDT">BDT</option>
//               <option value="EUR">EUR</option>
//               <option value="GBP">GBP</option>
//             </select>
//           </div>
//         </div>

//         {/* Pricing */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Base Price</label>
//             <input 
//               {...register('basePrice', { required: true })} 
//               type="number" 
//               step="0.01" 
//               placeholder="1299.99" 
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Operator ID (Optional)</label>
//             <input 
//               {...register('operatorId')} 
//               type="number" 
//               placeholder="1" 
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Dates */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Start Date (Optional)</label>
//             <input 
//               {...register('startDate')} 
//               type="date" 
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">End Date (Optional)</label>
//             <input 
//               {...register('endDate')} 
//               type="date" 
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Location ID (Optional)</label>
//           <input 
//             {...register('locationId')} 
//             type="number" 
//             placeholder="1" 
//             className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         <button 
//           type="submit" 
//           disabled={loading}
//           className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? 'Adding Tour...' : 'Add Tour'}
//         </button>
//       </form>
//     </div>
//   );
// }


'use client';
import { useForm } from 'react-hook-form';
import { toursAPI } from '@/utils/api'; 
import { useState } from 'react';

export default function AddTourForm() {
  const { register, handleSubmit, reset } = useForm();
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setMsg('');
      
      // Prepare data for API - match backend expectations
      const tourData = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        duration: parseInt(formData.duration) || 0, // Changed from durationDays to duration
        difficulty: formData.difficulty || 'Medium',
        capacity: formData.capacity ? parseInt(formData.capacity) : 0,
        currency: formData.currency || 'USD',
        price: parseFloat(formData.price) || 0, // Changed from basePrice to price
        operatorId: formData.operatorId ? parseInt(formData.operatorId) : null,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null,
        locationId: formData.locationId ? parseInt(formData.locationId) : null,
        // Add default status for new tours
        status: 'active',
        // Include other fields that might be required
        images: [],
        highlights: [],
        included: [],
        excluded: []
      };

      console.log('Submitting tour data:', tourData);
      
      const response = await toursAPI.create(tourData);
      console.log('Tour created successfully:', response.data);
      
      setMsg('Tour added successfully!');
      reset();
    } catch (err) {
      console.error('Error adding tour:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Failed to add tour. Please check the console for details.';
      setMsg('Error adding tour: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Auto-generate slug when title changes
  const handleTitleChange = (e, getValues, setValue) => {
    const title = e.target.value;
    if (title && !getValues('slug')) {
      setValue('slug', generateSlug(title));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Tour</h2>
      
      {msg && (
        <div className={`p-4 rounded-lg mb-4 ${
          msg.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {msg}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tour Title *
            </label>
            <input 
              {...register('title', { 
                required: 'Tour title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' }
              })} 
              placeholder="e.g., Majestic Himalaya Adventure" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input 
              {...register('slug')} 
              placeholder="e.g., majestic-himalaya-adventure" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from title</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea 
            {...register('description', { 
              required: 'Description is required',
              minLength: { value: 10, message: 'Description must be at least 10 characters' }
            })} 
            placeholder="Describe the tour experience, highlights, and what travelers can expect..."
            rows="4"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Tour Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (Days) *
            </label>
            <input 
              {...register('duration', { 
                required: 'Duration is required',
                min: { value: 1, message: 'Duration must be at least 1 day' }
              })} 
              type="number" 
              min="1"
              placeholder="10" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty *
            </label>
            <select 
              {...register('difficulty', { required: 'Difficulty is required' })} 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Challenging">Challenging</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity *
            </label>
            <input 
              {...register('capacity', { 
                required: 'Capacity is required',
                min: { value: 1, message: 'Capacity must be at least 1' }
              })} 
              type="number" 
              min="1"
              placeholder="20" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency *
            </label>
            <select 
              {...register('currency', { required: 'Currency is required' })} 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="USD">USD ($)</option>
              <option value="BDT">BDT (৳)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <input 
              {...register('price', { 
                required: 'Price is required',
                min: { value: 0, message: 'Price cannot be negative' }
              })} 
              type="number" 
              step="0.01" 
              min="0"
              placeholder="1299.99" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operator ID (Optional)
            </label>
            <input 
              {...register('operatorId')} 
              type="number" 
              min="1"
              placeholder="1" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date (Optional)
            </label>
            <input 
              {...register('startDate')} 
              type="date" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date (Optional)
            </label>
            <input 
              {...register('endDate')} 
              type="date" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location ID (Optional)
          </label>
          <input 
            {...register('locationId')} 
            type="number" 
            min="1"
            placeholder="1" 
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                Adding Tour...
              </div>
            ) : (
              'Add Tour'
            )}
          </button>
          
          <button 
            type="button" 
            onClick={() => reset()}
            disabled={loading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}