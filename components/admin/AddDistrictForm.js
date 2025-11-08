'use client';
import { useForm } from 'react-hook-form';
import { districtsAPI, divisionsAPI } from '@/utils/api';
import { useState, useEffect } from 'react';

export default function AddDistrictForm() {
  const { register, handleSubmit, reset } = useForm();
  const [divisions, setDivisions] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function fetchDivisions() {
      const res = await divisionsAPI.getAll();
      setDivisions(res.data);
    }
    fetchDivisions();
  }, []);

  const onSubmit = async (data) => {
    try {
      data.divisionId = parseInt(data.divisionId);
      await districtsAPI.create(data);
      setMsg('District added successfully!');
      reset();
    } catch (err) {
      console.error(err);
      setMsg('Error adding district');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add District</h2>
      {msg && <p className="text-green-600 mb-2">{msg}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register('name')}
          placeholder="District Name"
          className="w-full border px-3 py-2 rounded"
        />
        <select {...register('divisionId')} className="w-full border px-3 py-2 rounded">
          <option value="">Select Division</option>
          {divisions.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Add District
        </button>
      </form>
    </div>
  );
}
