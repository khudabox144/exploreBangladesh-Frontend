// app/admin/add-tour-place/page.js
import AddTourPlaceForm from '@/components/AddTourPlaceForm';
import Link from 'next/link';

export default function AddTourPlacePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add Tourist Place</h1>
          <p className="text-gray-600 mt-2">Add new tourist places to districts</p>
        </div>

        {/* Form */}
        <AddTourPlaceForm />
      </div>
    </div>
  );
}