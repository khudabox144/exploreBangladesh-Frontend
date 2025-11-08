'use client';
import { useForm } from 'react-hook-form';
import { divisionsAPI, districtsAPI, tourPlacesAPI, adminTourPlacesAPI } from '@/utils/api';
import { useState, useEffect } from 'react';

export default function AddTourPlaceFormEnhanced() {
  const { register, handleSubmit, watch, reset } = useForm();
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [msg, setMsg] = useState('');

  const selectedDivision = watch('divisionId');

  useEffect(() => {
    async function fetchDivisions() {
      const res = await divisionsAPI.getAll();
      setDivisions(res.data);
    }
    fetchDivisions();
  }, []);

  useEffect(() => {
  async function fetchDistricts() {
    if (!selectedDivision) return;
    const res = await adminTourPlacesAPI.getDistricts();
    setDistricts(res.data);
  }
  fetchDistricts();
}, [selectedDivision]);


  const onSubmit = async (data) => {
  try {
    data.districtId = parseInt(data.districtId);
    await adminTourPlacesAPI.create(data); // use adminTourPlacesAPI
    setMsg('Tour place added successfully!');
    reset();
  } catch (err) {
    console.error(err);
    setMsg('Error adding tour place');
  }
};


  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Tour Place</h2>
      {msg && <p className="text-green-600 mb-2">{msg}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register('name')} placeholder="Tour Place Name" className="w-full border px-3 py-2 rounded" />
        <textarea {...register('description')} placeholder="Description" className="w-full border px-3 py-2 rounded" />
        <input {...register('imageUrl')} placeholder="Image URL" className="w-full border px-3 py-2 rounded" />
        <select {...register('divisionId')} className="w-full border px-3 py-2 rounded">
          <option value="">Select Division</option>
          {divisions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <select {...register('districtId')} className="w-full border px-3 py-2 rounded">
          <option value="">Select District</option>
          {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Add Tour Place
        </button>
      </form>
    </div>
  );
}
