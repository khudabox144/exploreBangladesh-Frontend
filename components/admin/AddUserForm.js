'use client';
import { useForm } from 'react-hook-form';
import { usersAPI } from '@/utils/api';
import { useState } from 'react';

export default function AddUserForm() {
  const { register, handleSubmit, reset } = useForm();
  const [msg, setMsg] = useState('');

  const onSubmit = async (data) => {
    try {
      await usersAPI.create(data);
      setMsg('User added successfully!');
      reset();
    } catch (err) {
      console.error(err);
      setMsg('Error adding user');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add User</h2>
      {msg && <p className="text-green-600 mb-2">{msg}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register('name')} placeholder="Name" className="w-full border px-3 py-2 rounded" />
        <input {...register('email')} placeholder="Email" type="email" className="w-full border px-3 py-2 rounded" />
        <input {...register('password')} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded" />
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Add User</button>
      </form>
    </div>
  );
}
