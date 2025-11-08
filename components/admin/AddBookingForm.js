'use client';
import { useForm } from 'react-hook-form';
import { bookingsAPI, usersAPI, toursAPI } from '@/utils/api';
import { useState, useEffect } from 'react';

export default function AddBookingForm() {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);
  const [tours, setTours] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
  async function fetchData() {
    try {
      const u = await usersAPI.getAll();
      console.log('Users response:', u); // log response
      setUsers(u.data || []);

      const t = await toursAPI.getAll();
      console.log('Tours response:', t);
      setTours(t.data || []);
    } catch (err) {
    //   console.error('FetchData error:', err.response?.status, err.response?.data);
    }
  }
  fetchData();
}, []);


  const onSubmit = async (data) => {
    try {
      data.userId = parseInt(data.userId);
      data.tourId = parseInt(data.tourId);
      data.seats = parseInt(data.seats);
      data.totalPrice = parseFloat(data.totalPrice);

      await bookingsAPI.create(data);
      setMsg('Booking added successfully!');
      reset();
    } catch (err) {
      console.error(err);
      setMsg('Error adding booking');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Booking</h2>
      {msg && <p className="text-green-600 mb-2">{msg}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <select {...register('userId')} className="w-full border px-3 py-2 rounded">
          <option value="">Select User</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
        <select {...register('tourId')} className="w-full border px-3 py-2 rounded">
          <option value="">Select Tour</option>
          {tours.map(t => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
        <input {...register('seats')} type="number" placeholder="Seats" className="w-full border px-3 py-2 rounded" />
        <input {...register('totalPrice')} type="number" placeholder="Total Price" className="w-full border px-3 py-2 rounded" />
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Add Booking</button>
      </form>
    </div>
  );
}
