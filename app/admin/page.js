// app/admin/page.js
"use client";

import ClientLayout from "@/components/LayoutClient";
import Link from 'next/link';

export default function AdminDashboard() {
  const adminCards = [
    {
      title: 'Add Tour Package',
      description: 'Create new tour packages for the tours section',
      action: 'add-tour',
      icon: '🎯',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Add Tourist Place',
      description: 'Add new tourist places to districts',
      action: 'add-tour-place',
      icon: '🏞️',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Add Division',
      description: 'Create new divisions for organizing districts',
      action: 'add-division',
      icon: '🗺️',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Add District',
      description: 'Add districts to existing divisions',
      action: 'add-district',
      icon: '🏘️',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Add User',
      description: 'Create new user accounts',
      action: 'add-user',
      icon: '👤',
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Add Booking',
      description: 'Create new tour bookings',
      action: 'add-booking',
      icon: '📅',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <ClientLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Manage your tourism platform content and data
            </p>
          </div>

          {/* Admin Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {adminCards.map((card, index) => (
              <Link key={index} href={`/admin/${card.action}`}>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${card.color} text-white rounded-lg font-medium`}>
                    Access
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}