import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Redirect to dashboard if already logged in
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-indigo-600">Resume Generator</h1>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-6 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Create Your Professional Resume in Minutes
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose from 20 industry-standard templates, fill in your details, and download a beautifully formatted resume—all in one place.
            </p>

            <div className="flex gap-4">
              <Link
                href="/signup"
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors text-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-semibold transition-colors text-lg"
              >
                Sign In
              </Link>
            </div>

            <div className="mt-12 space-y-4 text-gray-600">
              <div className="flex gap-3 items-start">
                <span className="text-2xl">✓</span>
                <span>20 ATS-friendly and creative templates</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">✓</span>
                <span>Real-time preview as you type</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">✓</span>
                <span>Download as print-ready PDF</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">✓</span>
                <span>Save and edit multiple resumes</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex bg-white rounded-xl shadow-2xl p-8 flex-col gap-6">
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <p className="text-sm text-indigo-600 font-semibold">TEMPLATE PREVIEW</p>
            </div>

            <div className="space-y-3">
              <div className="h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded w-2/3"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-5/6"></div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-2 mb-4">
                <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 justify-center">
              <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">ATS-Friendly</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Print-Ready</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">20 Templates</h3>
            <p className="text-gray-600">
              Choose from ATS-friendly, modern, executive, creative, and technical templates
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Quick & Easy</h3>
            <p className="text-gray-600">
              Fill out a simple form with live preview and get your resume in minutes
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-4xl mb-4">📥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Download Anywhere</h3>
            <p className="text-gray-600">
              Export to PDF and use for job applications across any platform
            </p>
          </div>
        </div>

        {/* Template Categories */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Templates for Every Career Stage
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'ATS-Friendly', desc: 'Optimized for applicant tracking systems' },
              { name: 'Modern', desc: 'Contemporary design with visual appeal' },
              { name: 'Executive', desc: 'Professional and elegant layouts' },
              { name: 'Creative', desc: 'Stand out in creative fields' },
              { name: 'Technical', desc: 'Perfect for tech and engineering roles' },
              { name: 'Entry-Level', desc: 'Ideal for graduates and interns' },
            ].map((category, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
                <p className="text-gray-600 text-sm">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Create Your Resume?</h3>
          <p className="text-indigo-100 mb-8 text-lg">
            Join thousands of job seekers who've created professional resumes
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 font-semibold transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2025 Resume Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
