'use client';
import AdminLayout from '@/components/LayoutClient';
import AddDivisionForm from '@/components/admin/AddDivisionForm';
import AddDistrictForm from '@/components/admin/AddDistrictForm';
import AddTourPlaceForm from '@/components/admin/AddTourPlaceForm';
import AddUserForm from '@/components/admin/AddUserForm';
import AddBookingForm from '@/components/admin/AddBookingForm';

export default function AdminPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="space-y-12">
        <AddDivisionForm />
        <AddDistrictForm />
        <AddTourPlaceForm />
        <AddUserForm />
        <AddBookingForm />
      </div>
    </AdminLayout>
  );
}
