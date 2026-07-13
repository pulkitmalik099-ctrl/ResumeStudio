'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Resume Generator</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {session?.user?.name || session?.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Resumes</h2>
          <p className="text-xl text-gray-600">Create and manage your professional resumes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/templates">
            <div className="h-64 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-indigo-300 hover:border-indigo-500">
              <svg className="w-16 h-16 text-indigo-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900">Create New Resume</h3>
              <p className="text-gray-600 text-center mt-2">Choose from 20 professional templates</p>
            </div>
          </Link>

          {/* Placeholder for future resume list */}
          <div className="h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <p className="text-gray-500 text-center">Your saved resumes will appear here</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📋 Multiple Templates</h3>
            <p className="text-gray-600">Choose from 20 industry-standard templates across different categories</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">💾 Save & Edit</h3>
            <p className="text-gray-600">Save your resumes and edit them anytime with our intuitive form builder</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📥 Download PDF</h3>
            <p className="text-gray-600">Export your resume as a print-ready PDF in seconds</p>
          </div>
        </div>
      </main>
    </div>
  );
}
