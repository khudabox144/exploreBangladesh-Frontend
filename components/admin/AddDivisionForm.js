'use client';
import { useForm } from 'react-hook-form';
import { divisionsAPI } from '@/utils/api';
import { useState } from 'react';

export default function AddDivisionForm() {
  const { register, handleSubmit, reset } = useForm();
  const [msg, setMsg] = useState('');

  const onSubmit = async (data) => {
    try {
      await divisionsAPI.create(data);
      setMsg('Division added successfully!');
      reset();
    } catch (err) {
      console.error(err);
      setMsg('Error adding division');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Division</h2>
      {msg && <p className="text-green-600 mb-2">{msg}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register('name')}
          placeholder="Division Name"
          className="w-full border px-3 py-2 rounded"
        />
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Add Division
        </button>
      </form>
    </div>
  );
}
