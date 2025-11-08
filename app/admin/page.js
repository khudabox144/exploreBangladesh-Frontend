"use client";

import ClientLayout from "@/components/LayoutClient"; 
import AddDivisionForm from "@/components/admin/AddDivisionForm"; 
import AddDistrictForm from "@/components/admin/AddDistrictForm"; 
import AddTourPlaceFormEnhanced from "@/components/admin/AddTourPlaceForm"; 
import AddUserForm from "@/components/admin/AddUserForm"; 
import AddBookingForm from "@/components/admin/AddBookingForm";
export default function AdminPage() {
  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel</h1>

        {/* Forms Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AddDivisionForm />
          <AddDistrictForm />
          <AddTourPlaceFormEnhanced />
          <AddUserForm />
          <AddBookingForm />
        </div>
      </div>
    </ClientLayout>
  );
}
