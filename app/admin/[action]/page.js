// app/admin/[action]/page.js
"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import AddTourForm from '@/components/admin/AddTourForm';
import AddTourPlaceFormEnhanced from '@/components/admin/AddTourPlaceForm';
import AddDivisionForm from '@/components/admin/AddDivisionForm';
import AddDistrictForm from '@/components/admin/AddDistrictForm';
import AddUserForm from '@/components/admin/AddUserForm';
import AddBookingForm from '@/components/admin/AddBookingForm';

// Map actions to their components and metadata
const formComponents = {
  'add-tour': {
    component: AddTourForm,
    title: 'Add Tour Package',
    description: 'Create new tour packages for the tours section',
    icon: '🎯'
  },
  'add-tour-place': {
    component: AddTourPlaceFormEnhanced,
    title: 'Add Tourist Place',
    description: 'Add new tourist places to districts',
    icon: '🏞️'
  },
  'add-division': {
    component: AddDivisionForm,
    title: 'Add Division',
    description: 'Create new divisions for organizing districts',
    icon: '🗺️'
  },
  'add-district': {
    component: AddDistrictForm,
    title: 'Add District',
    description: 'Add districts to existing divisions',
    icon: '🏘️'
  },
  'add-user': {
    component: AddUserForm,
    title: 'Add User',
    description: 'Create new user accounts',
    icon: '👤'
  },
  'add-booking': {
    component: AddBookingForm,
    title: 'Add Booking',
    description: 'Create new tour bookings',
    icon: '📅'
  }
};

export default function AdminActionPage() {
  const params = useParams();
  const action = params.action;

  // Get the form configuration for the current action
  const formConfig = formComponents[action];

  // If action is not found, show 404
  if (!formConfig) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600 mb-8">The admin action "{action}" does not exist.</p>
          <Link 
            href="/admin"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const FormComponent = formConfig.component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/admin"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
            
            <div className="text-3xl">{formConfig.icon}</div>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{formConfig.title}</h1>
            <p className="text-gray-600 text-lg">
              {formConfig.description}
            </p>
          </div>
        </div>

        {/* Form Component */}
        <FormComponent />
      </div>
    </div>
  );
}